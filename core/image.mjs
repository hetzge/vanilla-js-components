// @ts-check

import { BaseComponent } from "./base-component.mjs";
import { head } from "./page.mjs";
import { Division } from "./simple.mjs";
import { generateId } from "./utils.mjs";

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


const blurImageClass = "blur-image-" + generateId();
function createBlurImageCss() {
  if (document.getElementById(blurImageClass) === null) {
    const $styleElement = document.createElement("style");
    $styleElement.id = blurImageClass;
    $styleElement.innerHTML = `
	.${blurImageClass} {
	  width: 100%;
	  height: 100%;
	  position: relative;
	  overflow: hidden;
	}
	.${blurImageClass}::after {
	  content: "";
	  position: absolute;
	  width: 100%;
	  height: 100%;
	  background-size: contain;
	  background-repeat: no-repeat;
	  background-position: center;
	  background-image: var(--image-source);
	}
	.${blurImageClass}::before {
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
    head.$element.append($styleElement);
  }
  return blurImageClass;
}

export class BlurImage extends BaseComponent {
  constructor() {
    super();
    this.$element = (this._division = new Division()).$element;
    this._division.content = this._$inner = document.createElement("div");
    this._$inner.className = createBlurImageCss();
    this.applyStyle({
		"width": "100%",
		"height": "100%",
    });
  }
  set source(source) {
    this._source = source;
    this._$inner.setAttribute("style", "--image-source: url('" + source + "')");
  }
  get source() {
    return this._source;
  }
}