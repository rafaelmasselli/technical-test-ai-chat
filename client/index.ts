import { Client } from "whatsapp-web.js";
import * as qrcode from "qrcode-terminal";

const client = new Client({});

client.on("qr", (qr: string) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("WhatsApp Web está pronto!");
});

client.on("message", async (message) => {
  const responseAi = async () => {
    try {
      const response = await fetch("http://localhost:4444/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message.body,
        }),
      });
      const data = await response.json();

      message.reply(data.response);
    } catch (error) {
      console.error("Erro ao enviar mensagem para a AI:", error);
    }
  };

  console.log("Mensagem recebida: ", message.body);

  await responseAi();
});

client.initialize();
