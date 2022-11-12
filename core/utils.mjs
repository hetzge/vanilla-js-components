// @ts-check

import { BaseComponent } from "./base-component.mjs";

/**
 * @param {BaseComponent} component
 * @param {Object.<string, string>} css 
 */
export function style(component, css) {
  Object.assign(component.$element.style, css);
}
