// @ts-check

import { BaseContainer } from "./base-container.mjs";
import { Event } from "./event.mjs";

/**
 * @typedef {Object} ToggleState
 * @property {String} value - The value representing this state
 * @property {import("./base-container.mjs").Content} content - The component showed when this state is active
 */
{ }

export class Toggle extends BaseContainer {
  /** @type {Event<Toggle, void>} */
  static TOGGLE_EVENT = new Event();
  constructor() {
    super("span");
    this.$element = document.createElement("span");
    this._states = [];
    this._index = 0;
    this.onClick = () => {
      this.toggle();
      this.dispatchEvent(Toggle.TOGGLE_EVENT);
    };
  }
  toggle() {
    this._index = (this._index + 1) % this._states.length;
    this.$element.innerHTML = "";
    this.content = this._states[this._index].content;
  }
  /** @param {Array<ToggleState>} states */
  set states(states) {
    this._states = states;
    this._index = 0;
    this.content = states[0].content;
  }
  /** @type {string} */
  get value() {
    return this._states[this._index].value;
  }
}