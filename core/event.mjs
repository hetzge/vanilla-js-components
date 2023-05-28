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
   * @param {T|null} payload 
   */
  dispatch(component, payload) {
    component.$element.dispatchEvent(new CustomEvent(this.key, { bubbles: true, detail: { component, payload } }));
  }
  /**
   * @param {EventTarget} component
   * @param {function({target: C, payload: T}):void} callback
   */
  register(component, callback) {
    component.$element.addEventListener(this.key, (/** @type {CustomEvent} */ event) => {
      callback({target: event.detail["component"], payload: event.detail["payload"]});
    });
  }
}
