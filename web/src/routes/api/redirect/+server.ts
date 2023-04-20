import {
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  DISCORD_REDIRECT_URL,
} from "$env/static/private";

import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ cookies, url }) => {
  const code = url.searchParams.get("code");

  console.log({ code });

  if (!code) {
    return new Response(JSON.stringify({ message: "No code" }), {
      status: 400,
    });
  }

  const response = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body:
      `client_id=${DISCORD_CLIENT_ID}&client_secret=${DISCORD_CLIENT_SECRET}&grant_type=authorization_code&code=${code}&redirect_uri=${DISCORD_REDIRECT_URL}`,
  });

  const data = await response.json();

  console.log(data);

  cookies.set("discord_access_token", data.access_token, {
    path: "/",
    httpOnly: true,
    secure: import.meta.env.PROD,
    expires: new Date(Date.now() + data.expires_in * 1000),
  });

  cookies.set("discord_refresh_token", data.refresh_token, {
    path: "/",
    httpOnly: true,
    secure: import.meta.env.PROD,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  });

  throw redirect(303, "/");
};
