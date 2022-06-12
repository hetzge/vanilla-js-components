// @ts-check

import BaseContainer from "./base-container.mjs";

export class Division extends BaseContainer {
  constructor() {
    super("div");
  }
}

export class Section extends BaseContainer {
  constructor() {
    super("section");
  }
}

export class Span extends BaseContainer {
  constructor() {
    super("span");
  }
}

export class Paragraph extends BaseContainer {
  constructor() {
    super("p");
  }
}

export class Headline1 extends BaseContainer {
  constructor() {
    super("h1");
  }
}

export class Footer extends BaseContainer {
  constructor() {
    super("footer");
  }
}

export class Header extends BaseContainer {
  constructor() {
    super("header");
  }
}