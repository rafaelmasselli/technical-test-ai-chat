import { Client, Message } from "whatsapp-web.js";
import { BotAudio } from "../audio";
import { IClients } from "../../interface/clients";

const client = new Client({});

class InitValidationTypeMessage {
  private message: Message;
  private audio: BotAudio;
  private user: IClients;
  constructor(message: Message, user: IClients) {
    this.message = message;
    this.audio = new BotAudio(message);
    this.user = user;
  }

  public async handleBot() {
    if (this.message.type === "audio" || this.message.type === "ptt") {
      try {
        const media = await this.message.downloadMedia();
        const resultTranslate = await this.audio.translateAudio(media);
        await this.sendMessage(resultTranslate);
      } catch (error) {
        console.error("Erro ao baixar o áudio de voz:", error);
      }
    } else {
      await this.sendMessage(this.message.body);
    }
  }

  private async responseAi(message: string): Promise<string | false> {
    try {
      const response = await fetch("http://localhost:4444/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
        }),
      });

      const jsonResponse = await response.json();
      return jsonResponse.response || false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  private async sendMessage(message: string) {
    const catchMessageIA = await this.responseAi(message);
    if (!catchMessageIA) {
      this.message.reply(
        "Houve um problema com a IA. Por favor, tente novamente mais tarde."
      );
    } else {
      this.user.preferences.audio
        ? await this.audio.sendAudio(catchMessageIA)
        : await this.message.reply(catchMessageIA);
    }
  }
}

export async function handleInitValidationTypeMessage(
  message: Message,
  user: IClients
) {
  const bot = new InitValidationTypeMessage(message, user);
  await bot.handleBot();
}
