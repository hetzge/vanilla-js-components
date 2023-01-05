// @ts-check

import { BaseComponent } from "./base-component.mjs";
import { BaseContainer } from "./base-container.mjs";
import { generateId } from "./utils.mjs";

export class Datalist extends BaseComponent {
  constructor() {
    super();
    this.$element = (this._container = new BaseContainer("datalist")).$element;
    this._options = [];
    this._container.id = generateId();
  }
  /** @type {Array<string>} */
  get options() {
    return this._options;
  }
  set options(options) {
    this._options = options;
    this._container.content = options.map(option => {
      const $option = document.createElement("option");
      $option.value = option;
      return $option;
    });
  }
}