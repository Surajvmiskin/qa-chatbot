export const API_CONFIG = {
  LOCAL_API_URL: 'http://localhost:8000/api',
  HF_API_URL: 'https://api-inference.huggingface.co/models/facebook/bart-large-mnli',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  HF_TOKEN: import.meta.env.VITE_HUGGING_FACE_TOKEN || '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',
};