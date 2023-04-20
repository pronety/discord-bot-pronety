import {
  DISCORD_BOT_TOKEN,
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
} from "$env/static/private";
import type { User } from "$lib/types";
import type { Cookies } from "@sveltejs/kit";

export const discordAPI = "https://discord.com/api/v9";
export const undikshaRoleID = "1098497633569484890";
export const guild_id = "1097354795335037018";

export function isLoggedIn(cookie: Cookies) {
  return cookie.get("discord_refresh_session") !== undefined;
}

export async function assignRoleUndiksha(discord_id: string) {
  const response = await fetch(
    `${discordAPI}/guilds/${guild_id}/members/${discord_id}/roles/${undikshaRoleID}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
    },
  );

  console.log(response);

  return response.ok;
}

export async function refreshToken(cookie: Cookies) {
  const response = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body:
      `client_id=${DISCORD_CLIENT_ID}&client_secret=${DISCORD_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${
        cookie.get(
          "discord_refresh_token",
        )
      }`,
  });

  const data = await response.json();

  cookie.set("discord_access_token", data.access_token, {
    path: "/",
    httpOnly: true,
    secure: import.meta.env.PROD,
    expires: new Date(Date.now() + data.expires_in * 1000),
  });
}

export async function getDiscordUser(cookie: Cookies) {
  const me = await fetch(
    `https://discord.com/api/users/@me`,
    {
      headers: {
        Authorization: `Bearer ${cookie.get("discord_access_token")}`,
      },
    },
  );

  return await me.json() as User;
}

export async function getAuthUser(cookie: Cookies) {
  const discord_token = cookie.get("discord_access_token");
  const discord_refresh_token = cookie.get("discord_refresh_token");

  if (discord_refresh_token) {
    if (!discord_token) {
      await refreshToken(cookie);
    }
    return await getDiscordUser(cookie);
  }
  return null;
}
