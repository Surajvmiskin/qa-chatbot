import axios, { AxiosError } from 'axios';
import { API_CONFIG } from './config';
import { Cache } from './cache';
import type { PredictionRequest, PredictionResponse, ApiError } from './types';

const axiosInstance = axios.create({
  timeout: API_CONFIG.TIMEOUT,
});

const responseCache = new Cache<PredictionResponse>(API_CONFIG.CACHE_DURATION);

const createCacheKey = (model: string, data: PredictionRequest): string => {
  return `${model}-${data.story}-${data.question}`;
};

const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const apiError: ApiError = {
      message: error.response?.data?.message || 'An error occurred while processing your request',
      code: error.response?.data?.code || 'UNKNOWN_ERROR',
      status: error.response?.status,
    };
    throw apiError;
  }
  throw new Error('An unexpected error occurred');
};

const retryOperation = async <T>(
  operation: () => Promise<T>,
  retries: number = API_CONFIG.RETRY_ATTEMPTS
): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    if (retries > 0 && axios.isAxiosError(error) && error.response?.status === 429) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return retryOperation(operation, retries - 1);
    }
    throw error;
  }
};

export const getCustomModelPrediction = async (
  data: PredictionRequest
): Promise<PredictionResponse> => {
  const cacheKey = createCacheKey('custom', data);
  const cachedResponse = responseCache.get(cacheKey);
  if (cachedResponse) return cachedResponse;

  try {
    const response = await retryOperation(() =>
      axiosInstance.post(`${API_CONFIG.LOCAL_API_URL}/predict/`, data)
    );

    const predictionResponse: PredictionResponse = {
      ...response.data,
      model: 'custom',
    };

    responseCache.set(cacheKey, predictionResponse);
    return predictionResponse;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getHuggingFacePrediction = async (
  data: PredictionRequest,
  token: string
): Promise<PredictionResponse> => {
  const cacheKey = createCacheKey('huggingface', data);
  const cachedResponse = responseCache.get(cacheKey);
  if (cachedResponse) return cachedResponse;

  try {
    const response = await retryOperation(() =>
      axiosInstance.post(
        API_CONFIG.HF_API_URL,
        {
          inputs: `Story: ${data.story}\nQuestion: ${data.question}`,
          parameters: {
            candidate_labels: ['yes', 'no']
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )
    );

    const predictionResponse: PredictionResponse = {
      answer: response.data.labels[0],
      confidence: response.data.scores[0],
      model: 'huggingface',
    };

    responseCache.set(cacheKey, predictionResponse);
    return predictionResponse;
  } catch (error) {
    return handleApiError(error);
  }
};