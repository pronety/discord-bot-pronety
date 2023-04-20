import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getVerification } from "$lib/server/db";
import { assignRoleUndiksha } from "$lib/server/discord";

const guild_id = "1097354795335037018";

export const load: PageServerLoad = async ({ url, locals }) => {
  const key = url.searchParams.get("key");

  if (!key) {
    return {
      error: "Sepertinya anda tersesat! Key tidak ditemukan",
    };
  }

  if (!locals.user) {
    throw redirect(302, "/");
  }

  const verification = await getVerification(key);

  if (!verification) {
    throw redirect(302, "/");
  }

  const success = await assignRoleUndiksha(verification.discord_id, guild_id);

  return {
    error: !success ? "Gagal menambahkan Role! Silahkan coba lagi nanti" : "",
  };
};
