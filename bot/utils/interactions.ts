/// Copied from https://github.com/discord/discord-interactions-js/tree/main/src

export enum InteractionType {
  /**
   * A ping.
   */
  PING = 1,
  /**
   * A command invocation.
   */
  APPLICATION_COMMAND = 2,
  /**
   * Usage of a message's component.
   */
  MESSAGE_COMPONENT = 3,
  /**
   * An interaction sent when an application command option is filled out.
   */
  APPLICATION_COMMAND_AUTOCOMPLETE = 4,
  /**
   * An interaction sent when a modal is submitted.
   */
  MODAL_SUBMIT = 5,
}

/**
 * The type of response that is being sent.
 */
export enum InteractionResponseType {
  /**
   * Acknowledge a `PING`.
   */
  PONG = 1,
  /**
   * Respond with a message, showing the user's input.
   */
  CHANNEL_MESSAGE_WITH_SOURCE = 4,
  /**
   * Acknowledge a command without sending a message, showing the user's input. Requires follow-up.
   */
  DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE = 5,
  /**
   * Acknowledge an interaction and edit the original message that contains the component later; the user does not see a loading state.
   */
  DEFERRED_UPDATE_MESSAGE = 6,
  /**
   * Edit the message the component was attached to.
   */
  UPDATE_MESSAGE = 7,
  /*
   * Callback for an app to define the results to the user.
   */
  APPLICATION_COMMAND_AUTOCOMPLETE_RESULT = 8,
  /*
   * Respond with a modal.
   */
  MODAL = 9,
}

/**
 * The type of component
 * @see {@link https://discord.com/developers/docs/interactions/message-components#component-object-component-types}
 */
export enum MessageComponentTypes {
  ACTION_ROW = 1,
  BUTTON = 2,
  STRING_SELECT = 3,
  INPUT_TEXT = 4,
  USER_SELECT = 5,
  ROLE_SELECT = 6,
  MENTIONABLE_SELECT = 7,
  CHANNEL_SELECT = 8,
}

export type MessageComponent = Button | ActionRow | StringSelect | InputText;

/**
 * Button component
 * @see {@link https://discord.com/developers/docs/interactions/message-components#button-object-button-structure}
 */
export type Button = {
  type: MessageComponentTypes.BUTTON;
  style:
    | ButtonStyleTypes.PRIMARY
    | ButtonStyleTypes.SECONDARY
    | ButtonStyleTypes.SUCCESS
    | ButtonStyleTypes.DANGER
    | ButtonStyleTypes.LINK;
  label: string;
  emoji?: Pick<EmojiInfo, "id" | "name" | "animated">;
  custom_id?: string;
  url?: string;
  disabled?: boolean;
};

export enum ButtonStyleTypes {
  PRIMARY = 1,
  SECONDARY = 2,
  SUCCESS = 3,
  DANGER = 4,
  LINK = 5,
}

/**
 * Action row component
 * @see {@link https://discord.com/developers/docs/interactions/message-components#action-rows}
 */
export type ActionRow = {
  type: MessageComponentTypes.ACTION_ROW;
  components: Exclude<MessageComponent, ActionRow>[];
};

export type SelectComponentType =
  | MessageComponentTypes.STRING_SELECT
  | MessageComponentTypes.USER_SELECT
  | MessageComponentTypes.ROLE_SELECT
  | MessageComponentTypes.MENTIONABLE_SELECT
  | MessageComponentTypes.CHANNEL_SELECT;

// This parent type is to simplify the individual selects while keeping descriptive generated type hints
export type SelectMenu<T extends SelectComponentType> = {
  type: T;
  custom_id: string;
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
  options: StringSelectOption[];
  channel_types?: ChannelTypes[];
};

/**
 * Text select menu component
 * @see {@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-menu-structure}
 */
export type StringSelect = Omit<
  SelectMenu<MessageComponentTypes.STRING_SELECT>,
  "channel_types"
>;

export type StringSelectOption = {
  label: string;
  value: string;
  description?: string;
  emoji?: Pick<EmojiInfo, "id" | "name" | "animated">;
  default?: boolean;
};

/**
 * User select menu component
 * @see {@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-menu-structure}
 */
export type UserSelect = Omit<
  SelectMenu<MessageComponentTypes.USER_SELECT>,
  "channel_types" | "options"
>;

/**
 * Role select menu component
 * @see {@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-menu-structure}
 */
export type RoleSelect = Omit<
  SelectMenu<MessageComponentTypes.ROLE_SELECT>,
  "channel_types" | "options"
>;

/**
 * Mentionable (role & user) select menu component
 * @see {@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-menu-structure}
 */
export type MentionableSelect = Omit<
  SelectMenu<MessageComponentTypes.MENTIONABLE_SELECT>,
  "channel_types" | "options"
>;

/**
 * Channel select menu component
 * @see {@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-menu-structure}
 */
export type ChannelSelect = Omit<
  SelectMenu<MessageComponentTypes.CHANNEL_SELECT>,
  "options"
>;

export enum ChannelTypes {
  DM = 1,
  GROUP_DM = 3,
  GUILD_TEXT = 0,
  GUILD_VOICE = 2,
  GUILD_CATEGORY = 4,
  GUILD_ANNOUNCEMENT = 5,
  GUILD_STORE = 6,
}

/**
 * Text input component
 * @see {@link https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-structure}
 */
export type InputText = {
  type: MessageComponentTypes.INPUT_TEXT;
  custom_id: string;
  style: TextStyleTypes.SHORT | TextStyleTypes.PARAGRAPH;
  label: string;
  min_length?: number;
  max_length?: number;
  required?: boolean;
  value?: string;
  placeholder?: string;
};

export enum TextStyleTypes {
  SHORT = 1,
  PARAGRAPH = 2,
}

export type EmojiInfo = {
  name: string | undefined;
  id: string | undefined;
  // Should define the user object in future
  // deno-lint-ignore no-explicit-any
  user?: { [key: string]: any };
  roles?: string[];
  require_colons?: boolean;
  managed?: boolean;
  available?: boolean;
  animated?: boolean;
};
