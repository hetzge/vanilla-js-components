// @ts-check

import { BaseComponent } from "./base-component.mjs";

/**
 * @typedef {Object} DropdownOption
 * @property {string} value
 * @property {string} text
 */
 {}

export class Dropdown extends BaseComponent {
  static SELECT_EVENT_KEY = "Dropdown#select";
  constructor() {
	super();
    this.$element = document.createElement("select");
    this.onChange = () => this.dispatchEvent(Dropdown.SELECT_EVENT_KEY); 
  }
  /**
   * @param {Array<DropdownOption>} options
   */
  set options(options) {
    this.$element.innerHTML = "";
    for (let option of options) {
      const optionElement = document.createElement("option");
      optionElement.setAttribute("value", option.value);
      optionElement.innerText = option.text;
      this.$element.append(optionElement);
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