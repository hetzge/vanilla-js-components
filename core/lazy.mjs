// @ts-check

import { BaseContainer } from "./base-container.mjs";

export class Lazy extends BaseContainer {
  constructor() {
    super("span");
    /** @type {function():import("./base-container.mjs").Content} */
    this._onLoad = () => "...";
    this._loaded = false;
    this.$element.addEventListener("click", () => this.load());
    this.$element.style.cursor = "pointer";
  }
  load() {
    if (!this.isLoaded()) {
      this.content = this._onLoad();
      this._loaded = true;
    }
  }
  set onLoad(load) {
    this._onLoad = load;
  }
  get onLoad() {
    return this._onLoad;
  }
  isLoaded() {
    return this._loaded;
  }
}