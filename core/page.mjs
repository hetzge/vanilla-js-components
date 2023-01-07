// @ts-check

import { BaseContainer } from "./base-container.mjs";

class Body extends BaseContainer {
  constructor() {
    super("body");
    this.$element = window.document.body;
  }
}

class Head extends BaseContainer {
  constructor() {
    super("head");
    this.$element = window.document.head;
  }
}

export const body = new Body();
export const head = new Head();