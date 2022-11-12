// @ts-check

import { BaseContainer } from "./base-container.mjs";

class Body extends BaseContainer {
  constructor() {
    super("body");
    this.$element = window.document.body;
  }
}

export const body = new Body();