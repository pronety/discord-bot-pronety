import kv from "@vercel/kv";

type Val = {
  email: string;
  discord_id: string;
};

export async function createNewVerification(email: string, discord_id: string) {
  const key = crypto.randomUUID();
  await kv.set<Val>(key, { email, discord_id });
  return key;
}

export async function getVerification(key: string) {
  const verif = await kv.getdel<Val>(key);
  return verif;
}
