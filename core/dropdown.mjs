// @ts-check

import { BaseComponent } from "./base-component.mjs";

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

export class Dropdown extends BaseComponent {
  static SELECT_EVENT_KEY = "Dropdown#select";
  constructor() {
    super();
    this.$element = document.createElement("select");
    this.onChange = () => this.dispatchEvent(Dropdown.SELECT_EVENT_KEY);
  }
  /**
   * @param {Array<DropdownOption|DropdownOptionGroup>} options
   */
  set options(options) {
    this.$element.innerHTML = "";
    for (let option of options) {
      if (option["label"] !== undefined) {
        const $optionGroupElement = document.createElement("optgroup");
        $optionGroupElement.label = option["label"];
        for (let groupOption of option["options"]) {
          const $optionElement = document.createElement("option");
          $optionElement.setAttribute("value", groupOption["value"]);
          $optionElement.innerText = groupOption["text"];
          $optionGroupElement.append($optionElement);
        }
        this.$element.append($optionGroupElement);
      } else {
        const $optionElement = document.createElement("option");
        $optionElement.setAttribute("value", option["value"]);
        $optionElement.innerText = option["text"];
        this.$element.append($optionElement);
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
}