import { HarmBlockThreshold, HarmCategory } from '@google-cloud/vertexai';
import { vascoPrompts } from '../useCases/systemInstruction/vasco'
import { pokemonPrompts } from '../useCases/systemInstruction/pokemon';
import { compraRapidaPrompts } from '../useCases/systemInstruction/compra';

type IArgs = 'pokemon' | 'compra' | null;
const args = process.argv[2] as IArgs;

export function initPrompt() {
  switch (args) {
    case 'compra':
      return compraRapidaPrompts;
    case 'pokemon':
      return pokemonPrompts;
    default:
    return vascoPrompts;
  }
}

export function handleFilterAI() {
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
