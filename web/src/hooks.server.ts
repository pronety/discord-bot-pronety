import { getAuthUser } from "$lib/server/discord";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.user = await getAuthUser(event.cookies);

  const response = await resolve(event);

  return response;
};
