import {
  Button,
  ButtonStyleTypes,
  MessageComponent,
  MessageComponentTypes,
} from "./interactions.ts";

export function createButton(
  label: string,
  style: ButtonStyleTypes,
  url?: string,
) {
  return {
    type: MessageComponentTypes.BUTTON,
    label,
    style,
    url,
  } as Button;
}

export function createActionRow(components: MessageComponent[]) {
  return {
    type: MessageComponentTypes.ACTION_ROW,
    components,
  } as MessageComponent;
}
