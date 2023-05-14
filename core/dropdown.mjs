// @ts-check

import { BaseComponent } from "./base-component.mjs";
import { Event } from "./event.mjs";

/**
 * @typedef {object} DropdownOptionGroup
 * @property {string} label
 * @property {Array<DropdownOption>} options
 */
{ }

/**
 * @typedef {object} DropdownOption
 * @property {string} value
 * @property {string} text
 */
{ }

function isOptionGroup(option) {
  return typeof option === "object" && option["label"] !== undefined && option["options"] !== undefined;
}

export class Dropdown extends BaseComponent {
  /** @type {Event<Dropdown, void>} */
  static SELECT_EVENT = new Event();
  constructor() {
    super();
    this.$element = document.createElement("select");
    this.onChange = () => this.dispatchEvent(Dropdown.SELECT_EVENT);
    this._optionsByValue = {};
  }
  /**
   * @param {Array<DropdownOption|DropdownOptionGroup>} options
   */
  set options(options) {
    this._optionsByValue = {};
    this.$element.innerHTML = "";
    for (let option of options) {
      if (isOptionGroup(option)) {
        const $optionGroupElement = document.createElement("optgroup");
        $optionGroupElement.label = option["label"];
        for (let groupOption of option["options"]) {
          const value = groupOption["value"];
          const text = groupOption["text"];
          const $optionElement = document.createElement("option");
          $optionElement.setAttribute("value", value);
          $optionElement.innerText = text;
          $optionGroupElement.append($optionElement);
          this._optionsByValue[value] = groupOption;
        }
        this.$element.append($optionGroupElement);
      } else {
        const value = option["value"];
        const text = option["text"];
        const $optionElement = document.createElement("option");
        $optionElement.setAttribute("value", value);
        $optionElement.innerText = text;
        this.$element.append($optionElement);
        this._optionsByValue[value] = option;
      }
    }
  }
  /** @type {string} */
  set value(value) {
    this.$element.value = value;
  }
  get value() {
    return this.$element.value;
  }
  get option() {
    return this._optionsByValue[this.value];
  }
}