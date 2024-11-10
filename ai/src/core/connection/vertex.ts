import {
  FunctionDeclarationSchemaType,
  HarmBlockThreshold,
  HarmCategory,
  VertexAI,
} from '@google-cloud/vertexai';
import { vertexConfig } from '../../common/config/secret/gemini';
import { vascoPrompts } from '../useCases/systemInstruction/vasco';
import { pokemonPrompts } from '../useCases/systemInstruction/pokemon';
import { compraRapidaPrompts } from '../useCases/systemInstruction/compra';

type IArgs = 'pokemon' | 'compra' | null;
const args = process.argv[2] as IArgs;

function initPrompt() {
  switch (args) {
    case 'compra':
      return compraRapidaPrompts;
    case 'pokemon':
      return pokemonPrompts;
    default:
      return vascoPrompts;
  }
}

function handleFilterAI() {
  switch (args) {
    case 'compra':
      return [
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ];
    case 'pokemon':
      return [
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
      ];
    default:
      return [];
  }
}

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

const generativeVisionModel = vertexAI.getGenerativeModel({
  model: vertexConfig.visionModel,
});

const generativeModelPreview = vertexAI.preview.getGenerativeModel({
  model: vertexConfig.textModel,
});
