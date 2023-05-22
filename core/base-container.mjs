// @ts-check

import { BaseComponent } from "./base-component.mjs";

/**
 * @typedef {string|Node|BaseComponent|{$element:Node}} SimpleContent
 * @typedef {SimpleContent|Array<BaseComponent>|Array<{$element:Node}>|Array<SimpleContent>} Content
 */
{ }

/**
 * Base class for container components.
 * @extends {BaseComponent}
 */
export class BaseContainer extends BaseComponent {
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
    if(window["debug"] === true) {
      this.$element.setAttribute("data-component", this.constructor.name);
    }
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