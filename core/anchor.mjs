// @ts-check

import { BaseContainer } from "./base-container.mjs";

export class Anchor extends BaseContainer {
  constructor() {
    super("a");
  }
  set href(href) {
    // @ts-ignore
    this.$element.href = href;
  }
  get href() {
    return this.$element.getAttribute("href");
  }
}

export function createAnchor(content, href) {
  const anchor = new Anchor();
  anchor.content = content;
  anchor.href = href;
  return anchor;
}