import { vertexConfig } from '../../common/config/secret/gemini';
import { vascoPrompts } from '../../core/useCases/systemInstruction/vasco';
import { pokemonPrompts } from '../../core/useCases/systemInstruction/pokemon';
import { compraRapidaPrompts } from '../../core/useCases/systemInstruction/compra';
import { HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

type IArgs = 'pokemon' | 'compra' | null;

export class ConfigChatService {
  private args: IArgs;

  constructor() {
    this.args = process.argv[2] as IArgs;
  }

  private initPrompt() {
    switch (this.args) {
      case 'compra':
        return compraRapidaPrompts;
      case 'pokemon':
        return pokemonPrompts;
      default:
        return vascoPrompts; 
    }
  }

  private handleFilterAI() {
    switch (this.args) {
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

  public getConfig() {
    return {
      textModel: vertexConfig.textModel, 
      prompt: this.initPrompt(),
      filters: this.handleFilterAI(),
    };
  }
}

const configService = new ConfigChatService();
const config = configService.getConfig();
console.log(config);
