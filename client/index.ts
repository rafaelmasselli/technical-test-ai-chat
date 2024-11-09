import qrcode from "qrcode-terminal";
import { handleBot } from "./src/bot";

import { Client } from "whatsapp-web.js";

try {
  const client = new Client({ webVersionCache: { type: "none" } });

  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    console.log("The bot is connected and ready for use!");
  });

  client.on("message", async (message) => {
    await handleBot(message);
  });

  client.initialize();
} catch (error) {
  console.log(error);
}
