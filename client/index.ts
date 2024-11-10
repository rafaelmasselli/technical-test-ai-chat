import qrcode from "qrcode-terminal";
import { Client } from "whatsapp-web.js";
import { IClients } from "./src/interface/clients";
import { Bot } from "./src/bot";

class BotClient {
  private userCache = new Map<string, IClients>();
  constructor() {
    const client = new Client({
      puppeteer: {
        headless: true,
        timeout: 60000,
      },
    });

    client.on("qr", (qr) => {
      qrcode.generate(qr, { small: true });
    });

    client.on("ready", () => {
      console.log("The bot is connected and ready for use!");
    });

    client.on("message", async (message) => {
      await new Bot(message, this.userCache).handle();
    });

    client.initialize();
  }
}

const bot = new BotClient();
