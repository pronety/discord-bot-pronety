import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { createTransport, type TransportOptions } from "nodemailer";
import { PUBLIC_DISCORD_OAUTH_URL } from "$env/static/public";
import {
  EMAIL,
  EMAIL_PASSWORD,
  GOOGLE_OAUTH_CLIENT_SECRET,
  GOOGLE_OAUTH_CLIENTID,
  GOOGLE_OAUTH_REFRESH_TOKEN,
} from "$env/static/private";
import { createNewVerification } from "$lib/server/db";

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) {
    console.log(PUBLIC_DISCORD_OAUTH_URL);

    throw redirect(302, PUBLIC_DISCORD_OAUTH_URL);
  }
  return {
    user: locals.user,
  };
};

export const actions: Actions = {
  kirimEmail: async ({ request, locals, url }) => {
    const formData = Object.fromEntries(
      await request.formData(),
    ) as { email: string };

    console.log(formData);

    const key = await createNewVerification(formData.email, locals.user!.id);

    const transport = createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: EMAIL,
        pass: EMAIL_PASSWORD,
        clientId: GOOGLE_OAUTH_CLIENTID,
        clientSecret: GOOGLE_OAUTH_CLIENT_SECRET,
        refreshToken: GOOGLE_OAUTH_REFRESH_TOKEN,
      },
    } as TransportOptions);

    const verifyUrl = `${url.origin}/verify?key=${key}`;

    console.log({ verifyUrl });

    transport.sendMail({
      from: EMAIL,
      to: formData.email,
      subject:
        `Apakah benar ini Anda? ${locals.user?.username} #${locals.user?.discriminator}`,
      text:
        `Seseorang mendaftarkan email ini sebagai email verifikasi untuk mendapat role di server Pronety. Jika benar, silakan klik link di bawah ini
        ${verifyUrl}`,
    }, (err) => {
      if (err) {
        console.log(err);
      }
    });

    return {
      status: 200,
      body: {
        message: "Email berhasil dikirim",
      },
    };
  },
};
