// @ts-check

import { BaseComponent } from "./base-component.mjs";
import { BaseContainer } from "./base-container.mjs";
import { createCss } from "./style.mjs";

// Inspired by: https://1linelayouts.glitch.me

export class CenterLayout extends BaseComponent {
  constructor() {
    super();
    this.$element = document.createElement("div");
    this.$element.append((this._container = new BaseContainer("span")).$element);
    this.applyStyle({
      "width": "100%",
      "height": "100%",
      "display": "grid",
      "place-items": "center"
    });
  }
  /**
   * @type {BaseContainer} 
   */
  get center() {
    return this._container;
  }
}

export class HeaderLayout extends BaseComponent {
  static CSS = createCss(className => {
    return `
      .${className} {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .${className} > span {
        flex-grow: 1;
        flex-basis: 33%;
      }
    `;
  });
  constructor() {
    super();
    this.$element = (this._container = new BaseContainer("div")).$element;
    this._container.content = [
      (this._left = new BaseContainer("span")),
      (this._center = new BaseContainer("span")),
      (this._right = new BaseContainer("span"))
    ];
    this._left.$element.style.textAlign = "left";
    this._center.$element.style.textAlign = "center";
    this._right.$element.style.textAlign = "right";
    this.className = HeaderLayout.CSS();
  }
  /**
   * @type {BaseContainer} 
   */
  get left() {
    return this._left;
  }
  /**
   * @type {BaseContainer} 
   */
  get center() {
    return this._center;
  }
  /**
   * @type {BaseContainer} 
   */
  get right() {
    return this._right;
  }
}

export class PancakeStackLayout extends BaseComponent {
  constructor() {
    super();
    this.$element = (this._container = new BaseContainer("div")).$element;
    this._container.content = [
      (this._head = new BaseContainer("header")),
      (this._body = new BaseContainer("main")),
      (this._foot = new BaseContainer("footer"))
    ];
    this.applyStyle({
      "width": "100%",
      "height": "100%",
      "display": "grid",
      "grid-template-rows": "auto 1fr auto"
    });
    this._body.applyStyle({
      "overflow-y": "scroll"
    });
  }
  /**
   * @type {BaseContainer} 
   */
  get head() {
    return this._head;
  }
  /**
   * @type {BaseContainer} 
   */
  get body() {
    return this._body;
  }
  /**
   * @type {BaseContainer} 
   */
  get foot() {
    return this._foot;
  }
}

export class SidebarLayout extends BaseComponent {
  static LEFT_ORIENTATION = "left";
  static RIGHT_ORIENTATION = "right";
  constructor() {
    super();
    this.$element = (this._container = new BaseContainer("div")).$element;
    this.applyStyle({
      "width": "100%",
      "height": "100%",
      "display": "grid"
    });
    this._side = new BaseContainer("div");
    this._side.applyStyle({
      "height": "100%"
    });
    this._main = new BaseContainer("div");
    this._main.applyStyle({
      "height": "100%"
    });
    this._orientation = SidebarLayout.LEFT_ORIENTATION;
    this._min = "150px";
    this._max = "25%";
    this._update();
  }
  _update() {
    if (this._orientation === SidebarLayout.LEFT_ORIENTATION) {
      this.$element.style.gridTemplateColumns = `minmax(${this._min}, ${this._max}) 1fr`;
      this._container.content = [this._side, this._main];
    } else if (this._orientation === SidebarLayout.RIGHT_ORIENTATION) {
      this.$element.style.gridTemplateColumns = `1fr minmax(${this._min}, ${this._max})`;
      this._container.content = [this._main, this._side];
    } else {
      throw new Error("Illegal orientation value '" + this._orientation + "'");
    }
  }
  /**
   * @type {BaseContainer} 
   */
  get side() {
    return this._side;
  }
  /**
   * @type {BaseContainer} 
   */
  get main() {
    return this._main;
  }
  /**
   * @type {"left"|"right"} 
   */
  set orientation(orientation) {
    this._orientation = orientation;
    this._update();
  }
  get orientation() {
    return this._orientation;
  }
  /**
   * Min css value. As example '10%' or '200px'.
   * @type {string}
   */
  set min(min) {
    this._min = min;
    this._update();
  }
  get min() {
    return this._min;
  }
  /**
   * Max css value. As example '10%' or '200px'.
   * @type {string}
   */
  set max(max) {
    this._max = max;
    this._update();
  }
  get max() {
    return this._max;
  }
}



