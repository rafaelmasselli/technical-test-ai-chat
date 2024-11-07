import {
  FunctionDeclarationSchemaType,
  HarmBlockThreshold,
  HarmCategory,
  VertexAI,
} from '@google-cloud/vertexai';
import { vertexConfig } from '../../config/secret/gemini';

const vertexAI = new VertexAI({
  project: vertexConfig.project,
  location: vertexConfig.location,
});

export const generativeModel = vertexAI.getGenerativeModel({
  model: vertexConfig.textModel,
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
  generationConfig: { maxOutputTokens: 256 },
  systemInstruction: {
    role: 'system',
    parts: [{ text: `For example, you are a helpful customer service agent.` }],
  },
});

const generativeVisionModel = vertexAI.getGenerativeModel({
  model: vertexConfig.visionModel,
});

const generativeModelPreview = vertexAI.preview.getGenerativeModel({
  model: vertexConfig.textModel,
});
