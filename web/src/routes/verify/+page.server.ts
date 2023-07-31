import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getVerification } from "$lib/server/db";
import { assignRoleUndiksha } from "$lib/server/discord";

export const load: PageServerLoad = async ({ url, locals }) => {
  const key = url.searchParams.get("key");

  if (!key) {
    throw error(400, "Sepertinya anda tersesat! Key tidak ditemukan");
  }

  if (!locals.user) {
    throw redirect(302, "/");
  }

  const verification = await getVerification(key);

  if (!verification) {
    throw error(500, "Gagal menambahkan Role!");
  }

  const success = await assignRoleUndiksha(verification.discord_id);

  return {
    error: !success
      ? "Terjadi kesalahan yang tidak terduga, mohon laporkan ke pengembang Bot @andndre di discord!"
      : "",
  };
};
