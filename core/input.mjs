// @ts-check

import { BaseComponent } from "./base-component.mjs";
import { BaseContainer } from "./base-container.mjs";
import { Datalist } from "./datalist.mjs";

class BaseInput extends BaseComponent {
  constructor(tag) {
    super();
    /**
     * @type {HTMLInputElement}
     */
    this.$element = document.createElement(tag);
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
    super("input");
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
    if (value === undefined || value === null) {
      this.$element.value = "";
    } else {
      this.$element.value = value;
    }
  }
  get value() {
    return this.$element.value;
  }
  /** @param {Datalist} datalist */
  set list(datalist) {
    this.$element.setAttribute("list", datalist.id);
  }
}

export class PasswordInput extends TextInput {
  constructor() {
	super();
	this.$element.type = "password";
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
    if (value === undefined || value === null) {
      this.$element.value = "";
    } else {
      this.$element.value = "" + value;
    }
  }
  get value() {
    if (this.$element.value.trim() === "") {
      return null;
    } else {
      return parseInt(this.$element.value);
    }
  }
}

export class NumberInput extends BaseTextInput {
  constructor() {
    super();
    this.$element.type = "number";
  }
  /**
   * @type {number}
   */
  set value(value) {
    if (value === undefined || value === null) {
      this.$element.value = "";
    } else {
      this.$element.value = "" + value;
    }
  }
  get value() {
    if (this.$element.value.trim() === "") {
      return null;
    } else {
      return parseFloat(this.$element.value);
    }
  }
}

export class Checkbox extends BaseInput {
  constructor() {
    super("input");
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

export class DateInput extends BaseInput {
  constructor() {
    super("input");
    this.$element.type = "date";
  }
  /**
   * @type {Date}
   */
  set value(value) {
    this.$element.value = value.toISOString().split('T')[0];
  }
  get value() {
    return new Date(this.$element.valueAsNumber || 0);
  }
}

export class TimeInput extends BaseInput {
  constructor() {
    super("input");
    this.$element.type = "time";
  }
  /**
   * @type {Date}
   */
  set value(value) {
    this.$element.value = value.toLocaleTimeString("en-GB");
  }
  get value() {
    return new Date(this.$element.valueAsNumber || 0);
  }
}

export class DateTimeInputGroup extends BaseContainer {
  constructor() {
    super("span");
    this.content = [
      this._date = new DateInput(),
      this._time = new TimeInput()
    ];
  }
  /**
   * @type {Date}
   */
  set value(value) {
    this._date.value = value;
    this._time.value = value;
  }
  get value() {
    const day = 1000 * 60 * 60 * 24;
    return new Date((this._date.value.getDate() - (this._date.value.getDate() % day)) + this._time.value.getDate() % day);
  }
}

export class TextArea extends BaseInput {
  constructor() {
    super("textarea");
  }
  /**
   * @type {string}
   */
  set value(value) {
    if (value === undefined || value === null) {
      this.$element.value = "";
    } else {
      this.$element.value = value;
    }
  }
  get value() {
    return this.$element.value;
  }
  /** @type {number} */
  set columns(columns) {
    this.$element.setAttribute("cols", columns !== undefined ? String(columns) : "0");
  }
  get columns() {
    return parseInt(this.$element.getAttribute("cols"));
  }
  /** @type {number} */
  set rows(rows) {
    this.$element.setAttribute("rows", rows !== undefined ? String(rows) : "0");
  }
  get rows() {
    return parseInt(this.$element.getAttribute("rows"));
  }
}

export class FileSelector extends BaseInput {
  constructor() {
    super("input");
    this.$element.type = "file";
  }
  reset() {
    this.$element.value = null;
  }
  /** @type {string} */
  set accept(accept) {
    this.$element.accept = accept;
  }
  get accept() {
    return this.$element.accept;
  }
  /** @type {boolean} */
  set multiple(multiple) {
    this.$element.multiple = multiple;
  }
  get multiple() {
    return this.$element.multiple;
  }
  get file() {
    return this.files[0];
  }
  get files() {
    return this.$element.files;
  }
}
