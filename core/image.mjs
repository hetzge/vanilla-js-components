// @ts-check

import { BaseComponent } from "./base-component.mjs";

export class Image extends BaseComponent {
  constructor() {
    super();
    this.$element = document.createElement("img");
  }
  set source(source) {
    this.$element.src = source;
  }
  get source() {
    return this.$element.src;
  }
}