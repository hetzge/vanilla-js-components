// ts-check

import { BaseComponent } from "./base-component.mjs";
import { createCss } from "./style.mjs";

export class Svg extends BaseComponent {
  static CSS = createCss((className) => {
    return `
        .${className} {
            width: 100%;
            height: 100%;
            fill: currentColor;
        }
        .${className} use {
            pointer-events: none;
        }
    `;
  });
  constructor() {
    super();
    this.$element = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg",
    );
    this._$use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    this.$element.append(this._$use);
    this.$element.classList.add(Svg.CSS());
  }
  set href(href) {
    this._$use.setAttribute("href", href);
  }
  static create(href, {width, height} = {width: "100%", height: "100%"}) {
    const svg = new Svg();
    svg.href = href;
    svg.applyStyle({
      "width": width,
      "height": height,
    });
    return svg;
  }
}
