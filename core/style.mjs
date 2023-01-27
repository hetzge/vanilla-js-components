// @ts-check

import { head } from "./page.mjs";
import { generateId } from "./utils.mjs";

/**
 * @param {{$element:HTMLElement}} component
 * @param {Object.<string, string>} css 
 */
export function style(component, css) {
  Object.assign(component.$element.style, css);
}

/**
 * @param {function(string):string} factory a function that receives the generated css class name and returns the css code as string
 * @returns {function():string} a function that returns the generated css class name and that ensures that the css is added to the page header
 */
export function createCss(factory) {
  const cssClass = "generated-" + generateId();
  return () => {
    if (document.getElementById(cssClass) === null) {
      const $styleElement = document.createElement("style");
      $styleElement.id = cssClass;
      $styleElement.innerHTML = factory(cssClass);
      head.$element.append($styleElement);
    }
    return cssClass;
  };
}
