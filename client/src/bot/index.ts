import { Message } from "whatsapp-web.js";
import { IClients } from "../interface/clients";
import { CatchPreferenceUser } from "../utils/catchPreferenceUser";
import { handleInitValidationTypeMessage } from "./validation";

export class Bot {
  private message: Message;
  private userCache: Map<string, IClients>;
  private catchPreferenceUser: CatchPreferenceUser;

  constructor(message: Message, userCache: Map<string, IClients>) {
    this.message = message;
    this.userCache = userCache;
    this.catchPreferenceUser = new CatchPreferenceUser();
  }

  async handle() {
    const phone_id = this.message.from;
    let user = this.userCache.get(phone_id);

    const handleAlternativePreference = (user: IClients, audio: boolean) => {
      user.preferences = {
        audio: audio,
        init: true,
      };

      return this.message.reply(`Como posso te ajudar?`);
    };

    if (!user) {
      const contact = await this.message.getContact();

      const fullName = contact.pushname || contact.name || "";
      const [firstName, ...lastNameParts] = fullName.split(" ");
      const lastName = lastNameParts.join(" ") || "";

      user = {
        phone_id: phone_id,
        lastname: lastName,
        name: firstName,
        preferences: {
          audio: false,
          init: false,
        },
      };

      this.userCache.set(phone_id, user);
      return this.message.reply(
        `Oi, ${firstName}! Você prefere que eu te responda por áudio ou texto?`
      );
    }

    if (!user.preferences.init) {
      const result = this.catchPreferenceUser.handle(this.message.body, [
        "audio",
        "texto",
      ]);

      switch (result) {
        case "audio":
          return handleAlternativePreference(user, true);
        case "texto":
          return handleAlternativePreference(user, false);
        default:
          return this.message.reply(
            `Por favor, escolha entre 'texto' ou 'áudio' para preferir como forma de resposta.`
          );
      }
    } else {
      return await handleInitValidationTypeMessage(this.message, user);
    }
  }
}
