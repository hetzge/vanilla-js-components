// @ts-check

import { BaseComponent } from "./base-component.mjs";

class BaseInput extends BaseComponent {
  constructor() {
    super();
    /**
     * @type {HTMLInputElement}
     */
    this.$element = document.createElement("input");
    this.$element.addEventListener("keyup", event => {
      if (event.keyCode === 13) {
        this._onEnter();
      }
    });
    this._onEnter = () => { };
  }
  /**
   * @type {boolean}
   */
  set autofocus(autofocus) {
    this.$element.autofocus = autofocus;
  }
  get autofocus() {
    return this.$element.autofocus;
  }
  /**
   * @type {boolean}
   */
  set disabled(disabled) {
    this.$element.disabled = disabled;
  }
  get disabled() {
    return this.$element.disabled;
  }
  /**
   * @type {function():void}
   */
  set onEnter(callback) {
    this._onEnter = callback;
  }
}

class BaseTextInput extends BaseInput {
  constructor() {
    super();
  }
  /**
   * @type {string}
   */
  set placeholder(placeholder) {
    this.$element.placeholder = placeholder;
  }
  get placeholder() {
    return this.$element.placeholder;
  }
}

export class TextInput extends BaseTextInput {
  constructor() {
    super();
    this.$element.type = "text";
  }
  /**
   * @type {string}
   */
  set value(value) {
    this.$element.value = value !== undefined ? value : "";
  }
  get value() {
    return this.$element.value;
  }
}

export class IntegerInput extends BaseTextInput {
  constructor() {
    super();
    this.$element.type = "number";
  }
  /**
   * @type {number}
   */
  set value(value) {
    this.$element.value = value !== undefined ? "" + value : "0";
  }
  get value() {
    return parseInt(this.$element.value);
  }
}

export class Checkbox extends BaseInput {
  constructor() {
    super();
    this.$element.type = "checkbox";
  }
  /**
   * @type {boolean}
   */
  set value(value) {
    this.$element.checked = !!value;
  }
  get value() {
    return this.$element.checked;
  }
}