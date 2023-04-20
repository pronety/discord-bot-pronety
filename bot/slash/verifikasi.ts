import { ButtonStyleTypes } from "../utils/interactions.ts";
import {
  AppCommandInteraction,
  createActionRow,
  createButton,
  SlashCommandHandler,
} from "../utils/mod.ts";

export const verifikasi: SlashCommandHandler = (
  _interaction: AppCommandInteraction,
) => {
  return {
    content:
      `Untuk mendapatkan role undiksha, silahkan klik tombol di bawah ini untuk verifikasi email:`,
    components: [
      createActionRow([
        createButton(
          "Verifikasi Email",
          ButtonStyleTypes.LINK,
          Deno.env.get("DISCORD_OAUTH_URL") || "",
        ),
      ]),
    ],
  };
};
