import { InteractionResponseType, MessageComponent } from "./interactions.ts";

export interface AppCommandInteraction {
  // app_permissions: string;
  // application_id: string;
  channel_id: string;
  data: {
    /**
     * The id of the command
     */
    id: string;
    /**
     * The name of the Command
     */
    name: string;
    /**
     * Args
     */
    options?: {
      /**
       * Arg name
       */
      name: string;
      /**
       * Arg type
       */
      type: number;
      /**
       * Arg value
       */
      value: string;
    }[];
    resolved?: {
      //   member: {
      //     [userId: string]: {};
      //   };
      users: {
        [userId: string]: {
          username: string;
          bot: boolean;
        };
      };
    };
    type: number;
  };
  // entitlement_sku_ids: string[] ?
  guild_id: string;
  id: string;
  locale: string;
  member: {
    // avatar?: string;
    // communication_disabled_until?: string;
    // deaf: boolean;
    // flags: number;
    // is_pending: boolean;
    joined_at: string;
    // mute: boolean;
    // nick?: string;
    pending: boolean;
    // permissions: string;
    // premium_since?: string;
    roles: string[];
    user: {
      display_name?: string;
      global_name?: string;
      id: string;
      /**
       * The username of the command sender
       */
      username: string;
    };
  };
  // token: string;
  // version: number;
  type: number;
}

export type MyResponse = {
  send: (
    body: { type: InteractionResponseType; data: { content: string } },
  ) => void;
};

export type SlashCommandHandler = (
  interaction: AppCommandInteraction,
) =>
  | Promise<{
    content: string;
    components?: MessageComponent[];
  }>
  | {
    content: string;
    components?: MessageComponent[];
  };
