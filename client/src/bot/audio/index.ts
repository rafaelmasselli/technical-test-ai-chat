import { vertexConfig } from "../../../../ai/src/common/config/secret/gemini";
import axios from "axios";
import { execSync } from "child_process";
import { Message, MessageMedia } from "whatsapp-web.js";

import { SpeechClient, protos } from "@google-cloud/speech";

export class BotAudio {
  private message: Message;
  private speechClient: SpeechClient;
  constructor(message: Message) {
    this.message = message;
    this.speechClient = new SpeechClient();
  }

  public async translateAudio(audio: MessageMedia): Promise<string> {
    try {
      const audioBase64 = audio.data;

      const config: protos.google.cloud.speech.v1.IRecognitionConfig = {
        encoding:
          protos.google.cloud.speech.v1.RecognitionConfig.AudioEncoding
            .OGG_OPUS,
        sampleRateHertz: 16000,
        languageCode: "pt-BR",
      };

      const request: protos.google.cloud.speech.v1.IRecognizeRequest = {
        audio: {
          content: audioBase64,
        },
        config: config,
      };

      const [response] = await this.speechClient.recognize(request);

      if (response.results) {
        const transcription = response.results
          .map((result) => result.alternatives?.[0]?.transcript || "")
          .join("\n");

        return transcription;
      }
      return "Desculpe, não conseguimos converter o áudio. Por favor, envie sua mensagem em texto para que possamos continuar.";
    } catch (error) {
      console.error("Erro ao transcrever o áudio:", error);
      return "Desculpe, não conseguimos converter o áudio. Por favor, envie sua mensagem em texto para que possamos continuar.";
    }
  }

  private async getAudioAI(responseAi: string): Promise<false | MessageMedia> {
    try {
      const projectId = execSync(
        "gcloud config list --format='value(core.project)'"
      )
        .toString()
        .trim();
      const accessToken = execSync("gcloud auth print-access-token")
        .toString()
        .trim();

      const data = {
        input: {
          text: responseAi,
        },
        voice: {
          languageCode: "pt-BR",
          name: "pt-BR-Wavenet-E",
        },
        audioConfig: {
          audioEncoding: "MP3",
          speakingRate: 1.25,
        },
      };

      const response = await axios.post(
        "https://texttospeech.googleapis.com/v1/text:synthesize",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Goog-User-Project": vertexConfig.project,
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.error) {
        console.error(`Erro na API: ${response.data.error.message}`);
        return false;
      }

      const audioBase64 = response.data.audioContent;
      if (!audioBase64) {
        console.error("Erro ao gerar o áudio.");
        return false;
      }

      const media = new MessageMedia("audio/mp3", audioBase64, "audio.mp3");
      return media;
    } catch (error) {
      console.error(`Erro: ${error}`);
      return false;
    }
  }

  async sendAudio(catchMessageIA: string) {
    const media = await this.getAudioAI(catchMessageIA);
    if (media) {
      this.message.reply(media);
    }
  }
}
