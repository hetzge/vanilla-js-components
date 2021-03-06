// @ts-check

import { BaseContainer } from "./base-container.mjs";

export class Button extends BaseContainer {
  static CLICK_EVENT_KEY = "Button#click";
  constructor() {
    super("button");
    this.onClick = () => this.dispatchEvent(Button.CLICK_EVENT_KEY);
  }
}