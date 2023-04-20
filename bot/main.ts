import { AppCommandInteraction } from "./utils/mod.ts";
import { ping } from "./slash/mod.ts";
import nacl from "cdn:tweetnacl";
import { json, serve, validateRequest } from "x:shift";
import {
  InteractionResponseType,
  InteractionType,
  MessageComponent,
} from "./utils/interactions.ts";
import "std/dotenv/load.ts";
import { verifikasi } from "./slash/verifikasi.ts";

export const discordAPI = "https://discord.com/api/v9";

serve({
  "/interactions": interactions,
}, {
  port: parseInt(Deno.env.get("PORT") || "3000"),
});

async function interactions(request: Request) {
  // validateRequest() ensures that a request is of POST method and
  // has the following headers.
  const { error } = await validateRequest(request, {
    POST: {
      headers: ["X-Signature-Ed25519", "X-Signature-Timestamp"],
    },
  });

  if (error) {
    return json({ error: error.message }, { status: error.status });
  }

  // verifySignature() verifies if the request is coming from Discord.
  // When the request's signature is not valid, we return a 401 and this is
  // important as Discord sends invalid requests to test our verification.
  const { valid, body } = await verifySignature(request);
  if (!valid) {
    return json(
      { error: "Invalid request" },
      {
        status: 401,
      },
    );
  }

  const interaction = JSON.parse(body);

  // Discord performs Ping interactions to test our application.
  if (interaction.type === InteractionType.PING) {
    return json({
      type: InteractionResponseType.PONG,
    });
  }

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    const myInteraction = interaction as AppCommandInteraction;

    switch (myInteraction.data.name) {
      case "ping":
        return jsonInteractionResponse(await ping(myInteraction));
      case "verifikasi":
        return jsonInteractionResponse(await verifikasi(myInteraction));
    }
  }

  // We will return a bad request error as a valid Discord request
  // shouldn't reach here.
  return json({ error: "bad request" }, { status: 400 });
}

async function verifySignature(
  request: Request,
): Promise<{ valid: boolean; body: string }> {
  const PUBLIC_KEY = Deno.env.get("CLIENT_PUBLIC_KEY")!;
  // Discord sends these headers with every request.
  const signature = request.headers.get("X-Signature-Ed25519")!;
  const timestamp = request.headers.get("X-Signature-Timestamp")!;
  const body = await request.text();
  const valid = nacl.sign.detached.verify(
    new TextEncoder().encode(timestamp + body),
    hexToUint8Array(signature),
    hexToUint8Array(PUBLIC_KEY),
  );

  return { valid, body };
}

/** Converts a hexadecimal string to Uint8Array. */
function hexToUint8Array(hex: string) {
  return new Uint8Array(hex.match(/.{1,2}/g)!.map((val) => parseInt(val, 16)));
}

function jsonInteractionResponse(data: {
  content: string;
  components?: MessageComponent[] | undefined;
}) {
  return json({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data,
  });
}
