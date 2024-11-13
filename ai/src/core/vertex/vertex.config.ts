import { VertexAI } from '@google-cloud/vertexai';
import { vertexConfig } from '../../common/config/secret/gemini';
import { initPrompt, handleFilterAI } from './prompts.config';

const createPrompt = () => {
  return initPrompt().join(',');
};

const vertexAI = new VertexAI({
  project: vertexConfig.project,
  location: vertexConfig.location,
});

export const generativeModel = vertexAI.getGenerativeModel({
  model: vertexConfig.textModel,
  safetySettings: handleFilterAI(),
  generationConfig: { maxOutputTokens: 1000 },
  systemInstruction: createPrompt(),
});

export const generativeVisionModel = vertexAI.getGenerativeModel({
  model: vertexConfig.visionModel,
});

export const generativeModelPreview = vertexAI.preview.getGenerativeModel({
  model: vertexConfig.textModel,
});
