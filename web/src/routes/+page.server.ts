import { fail, redirect } from "@sveltejs/kit";
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
    throw redirect(302, PUBLIC_DISCORD_OAUTH_URL);
  }
  return {
    user: locals.user,
  };
};

export const actions: Actions = {
  kirimEmail: async ({ request, locals, url }) => {
    if (!locals.user) {
      throw redirect(302, "/");
    }

    let { email } = Object.fromEntries(
      await request.formData(),
    ) as { email: string };

    email = email.trim();

    if (
      !email.endsWith("@student.undiksha.ac.id") &&
      !email.endsWith("@undiksha.ac.id")
    ) {
      return fail(400, {
        email,
        message: "Email harus merupakan email undiksha",
      });
    }

    const key = await createNewVerification(email, locals.user.id);

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

    await new Promise((resolve, reject) => {
      transport.verify(function (error, success) {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(success);
        }
      });
    });

    await new Promise<void>((resolve, reject) => {
      transport.sendMail({
        from: `Server Pronety <${EMAIL}>`,
        to: email,
        subject: `Apakah benar ini Anda? ${locals.user!.username} #${
          locals.user!.discriminator
        }`,
        text:
          `Seseorang mendaftarkan email ini sebagai email verifikasi untuk mendapat role di server Pronety. Jika benar, silakan klik link di bawah ini:\n${verifyUrl}`,
      }, (err) => {
        if (err) {
          console.error("Gagal mengirim email");
          reject("Gagal mengirim email");
        }
        console.info("Berhasil mengirim email");
        resolve();
      });
    });

    return {
      success: true,
    };
  },
};
