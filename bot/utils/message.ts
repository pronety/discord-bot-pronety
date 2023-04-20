import { discordAPI } from "../main.ts";

export async function sendDM(recipient_id: string, content: string) {
  const options = {
    method: "POST",
    headers: {
      "Authorization": `Bot ${Deno.env.get("BOT_TOKEN") || ""}`,
      "Content-Type": "application/json",
    },
  };
  const channelResponse = await fetch(
    `${discordAPI}/users/@me/channels`,
    {
      ...options,
      body: JSON.stringify({
        recipient_id,
      }),
    },
  );

  if (!channelResponse.ok) return false;

  const channel = await channelResponse.json();

  const dirrectMessage = await fetch(
    `${discordAPI}/channels/${channel.id}/messages`,
    {
      ...options,
      body: JSON.stringify({
        content,
      }),
    },
  );

  return dirrectMessage.ok;
}
