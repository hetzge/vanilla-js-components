// @ts-check

import { BaseComponent } from "./base-component.mjs";
import { head } from "./page.mjs";
import { Division } from "./simple.mjs";
import { createCss, generateId } from "./utils.mjs";

export class Image extends BaseComponent {
  constructor() {
    super();
    this.$element = document.createElement("img");
    this.$element.onerror = () => this.$element.style.display = "none";
  }
  set source(source) {
    this.$element.src = source;
  }
  get source() {
    return this.$element.src;
  }
}

const blurImageCss = createCss(className => {
  return `
	.${className} {
	  width: 100%;
	  height: 100%;
	  position: relative;
	  overflow: hidden;
	}
	.${className}::after {
	  content: "";
	  position: absolute;
	  width: 100%;
	  height: 100%;
	  background-size: contain;
	  background-repeat: no-repeat;
	  background-position: center;
	  background-image: var(--image-source);
	}
	.${className}.with-background::before {
	  content: "";
	  position: absolute;
	  width: 100%;
	  height: 100%;
	  background-image: var(--image-source);
	  background-repeat: no-repeat;
	  background-position: center;
	  background-size: cover;
	  background-clip: margin-box;
	  filter: blur(6px);
	  -webkit-filter: blur(6px);
	  transform: scale(1.05);
	}
    `;
});

export class BlurImage extends BaseComponent {
  constructor() {
    super();
    this.$element = (this._division = new Division()).$element;
    this._division.content = this._$inner = document.createElement("div");
    this._$inner.className = blurImageCss();
    this.applyStyle({
      "width": "100%",
      "height": "100%",
    });
    this._enabled = true;
  }
  /** @param {boolean} enabled */
  set backgroundEnabled(enabled) {
    this._enabled = enabled;
    this._update();
  }
  set source(source) {
    this._source = source;
    this._update();
  }
  get source() {
    return this._source;
  }
  _update() {
    this._$inner.setAttribute("style", "--image-source: url('" + this._source + "');");
    this._$inner.classList.toggle("with-background", this._enabled);
  }
}