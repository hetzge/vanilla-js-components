// @ts-check

import { BaseContainer } from "./base-container.mjs";
import { Event } from "./event.mjs";

export class Button extends BaseContainer {
  /** @type {Event<Button, void>} */
  static CLICK_EVENT = new Event();
  constructor() {
    super("button");
    /** @type {HTMLButtonElement} */ (this.$element).type = "button";
    this.onClick = () => this.dispatchEvent(Button.CLICK_EVENT);
  }
  /**
   * @type {boolean}
   */
  set disabled(disabled) {
    /** @type {HTMLButtonElement} */ (this.$element).disabled = disabled;
  }
  get disabled() {
    return /** @type {HTMLButtonElement} */ (this.$element).disabled;
  }
}
