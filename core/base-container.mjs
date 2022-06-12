// @ts-check

import BaseComponent from "./base-component.mjs";

/**
 * @typedef {string|HTMLElement|BaseComponent|{$element:HTMLElement}} SimpleContent
 * @typedef {SimpleContent|Array<string>|Array<HTMLElement>|Array<BaseComponent>|Array<{$element:HTMLElement}>} Content
 */
{ }

/**
 * Base class for container components.
 * @extends {BaseComponent}
 */
export default class BaseContainer extends BaseComponent {
  /**
   * @param {string} tag The tag of the underlying html component for this component
   */
  constructor(tag) {
    super();
    /** 
     * @public
     * @type {HTMLElement}
     */
    this.$element = document.createElement(tag);
  }
  /**
   * Clear the content of this container.
   */
  clear() {
    this.content = [];
  }
  /**
   * @param {Content} content
   */
  set content(content) {
    if (Array.isArray(content)) {
      const $elements = content.map(c => {
        if (typeof c === "string") {
          return document.createTextNode(c);
        } else if (c.$element !== undefined) {
          return c.$element;
        } else {
          return c;
        }
      });
      this.$element.innerHTML = "";
      this.$element.append(...$elements);
    } else {
      // @ts-ignore
      this.content = [content];
    }
  }
}