// @ts-check

import { generateId } from "./utils.mjs";

/**
 * @typedef {object} EventTarget
 * @property {HTMLElement} $element
 */
 {}

/**
 * @template {EventTarget} C
 * @template T
 */
export class Event {
  constructor() {
    this.key = generateId();
  }
  /**
   * @param {C} component 
   * @param {T} payload 
   */
  dispatch(component, payload) {
    component.$element.dispatchEvent(new CustomEvent(this.key, { bubbles: true, detail: { component, payload } }));
  }
  /**
   * @param {EventTarget} component
   * @param {function(C, T):void} callback
   */
  register(component, callback) {
    component.$element.addEventListener(this.key, (/** @type {CustomEvent} */ event) => {
      callback(event.detail["component"], event.detail["payload"]);
    });
  }
}
