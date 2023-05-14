// @ts-check

import { BaseComponent } from "./base-component.mjs";
import { BaseContainer } from "./base-container.mjs";

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

export class Headline2 extends BaseContainer {
  constructor() {
    super("h2");
  }
}

export class Headline3 extends BaseContainer {
  constructor() {
    super("h3");
  }
}

export class Headline4 extends BaseContainer {
  constructor() {
    super("h4");
  }
}

export class Headline5 extends BaseContainer {
  constructor() {
    super("h5");
  }
}

export class Headline6 extends BaseContainer {
  constructor() {
    super("h6");
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

export class LineBreak extends BaseComponent {
  constructor() {
    super();
    this.$element = document.createElement("br");
  }
}
