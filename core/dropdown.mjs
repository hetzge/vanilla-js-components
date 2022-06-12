// @ts-check

import BaseContainer from "./base-container.mjs";


export class Option extends BaseContainer {
  constructor() {
    super("option");
    /** 
     * @public
     * @type {HTMLOptionElement}
     */
	 this.$element = this.$element;
  }
  /** @type {string} */
  set value(value) {
    this.$element.value = value;
  }
  get value() {
	return this.$element.value;
  }
}

export class Dropdown extends BaseContainer {
  static SELECT_EVENT_KEY = "Dropdown#select";
  constructor() {
    super("select");
    this.$element = document.createElement("select");
    this.$element.addEventListener("change", () => this.dispatchEvent(Dropdown.SELECT_EVENT_KEY));
  }
  /**
   * @param {Array<Option>} options
   */
  set options(options) {
    this.content = options
  }
  /** @type {string} */
  set value(value) {
    this.$element.value = value;
  }
  get value() {
    return this.$element.value;
  }
}