import { KV_REST_API_URL, KV_REST_API_TOKEN } from "$env/static/private";

type Val = {
  email: string;
  discord_id: string;
};

export async function createNewVerification(email: string, discord_id: string) {
  const key = crypto.randomUUID();
  await fetch(
    `${KV_REST_API_URL}/set/${key}/${JSON.stringify({
      email,
      discord_id,
    } satisfies Val)}`,
    {
      headers: {
        Authorization: `Bearer ${KV_REST_API_TOKEN}`,
      },
    }
  );
  return key;
}

export async function getVerification(key: string) {
  const res = await fetch(`${KV_REST_API_URL}/getdel/${key}`, {
    headers: {
      Authorization: `Bearer ${KV_REST_API_TOKEN}`,
    },
  });
  const verif = JSON.parse((await res.json()).result) as Val;
  return verif;
}
