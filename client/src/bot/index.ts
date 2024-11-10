import { Client, Message, MessageMedia } from "whatsapp-web.js";
import { vertexConfig } from "../../../ai/src/common/config/secret/gemini";
import axios from "axios";
import { execSync } from "child_process";

const client = new Client({
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
});
const userMessagesBuffer = new Map<string, Message[]>();

class Bot {
  private message: Message;

  constructor(message: Message) {
    this.message = message;
  }

  async handleBot() {
    const responseAi = async (): Promise<string | false> => {
      try {
        const response = await fetch("http://localhost:4444/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: this.message.body,
          }),
        });

        const jsonResponse = await response.json();
        return jsonResponse.response || false;
      } catch (error) {
        console.log(error);
        return false;
      }
    };

    const catchMessageIA = await responseAi();
    if (!catchMessageIA) {
      this.message.reply(
        "Houve um problema com a IA. Por favor, tente novamente mais tarde."
      );
    } else {
      this.sendAudio(catchMessageIA);
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

  private async sendAudio(catchMessageIA: string) {
    const media = await this.getAudioAI(catchMessageIA);
    if (media) {
      this.message.reply(media);
    }
  }
}

export async function handleBot(message: Message) {
  const bot = new Bot(message);
  await bot.handleBot();
}
