import {
  FunctionDeclarationSchemaType,
  HarmBlockThreshold,
  HarmCategory,
  VertexAI,
} from '@google-cloud/vertexai';
import { vertexConfig } from '../../config/secret/gemini';
import { vascoPrompts } from '../useCases/systemInstruction/vasco';

const createPrompt = () => {
  return vascoPrompts.join(' ');
};

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
  generationConfig: { maxOutputTokens: 1000 },
  systemInstruction: createPrompt(),
});

const generativeVisionModel = vertexAI.getGenerativeModel({
  model: vertexConfig.visionModel,
});

const generativeModelPreview = vertexAI.preview.getGenerativeModel({
  model: vertexConfig.textModel,
});
