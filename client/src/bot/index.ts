import { Message } from "whatsapp-web.js";

const userMessagesBuffer = new Map<string, Message[]>();

export async function handleBot(message: Message) {
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
}
