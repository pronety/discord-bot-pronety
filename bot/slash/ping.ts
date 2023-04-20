import { AppCommandInteraction, SlashCommandHandler } from "../utils/mod.ts";

export const ping: SlashCommandHandler = (
  _interaction: AppCommandInteraction,
) => {
  // TODO:
  return new Promise((resolve) =>
    resolve({
      content: "pong",
    })
  );
};
