export interface PredictionRequest {
  story: string;
  question: string;
}

export interface PredictionResponse {
  answer: string;
  confidence?: number;
  model: string;
}

export interface ApiError {
  message: string;
  code: string;
  status?: number;
}