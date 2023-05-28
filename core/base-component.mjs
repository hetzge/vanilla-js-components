// @ts-check

import { Event } from "./event.mjs";

/**
 * The base class for all components.
 * @extends import("./event.mjs").EventTarget
 */
export class BaseComponent {
  constructor() {
    this.$element = undefined;
  }
  /**
   * @type {string}
   */
  set id(id) {
    this.$element.id = id;
  }
  get id() {
    return this.$element.id;
  }
  /**
   * @type {function(MouseEvent):any}
   */
  set onClick(callback) {
    this.$element.onclick = callback;
  }
  /**
   * @type {function(MouseEvent):any}
   */
  set onDoubleClick(callback) {
    this.$element.ondblclick = callback;
  }
  /**
   * @type {function(Event):any}
   */
  set onChange(callback) {
    this.$element.onchange = callback;
  }
  /**
   * @type {number}
   */
  set tabIndex(tabIndex) {
    this.$element.tabIndex = tabIndex;
  }
  get tabIndex() {
    return this.$element.tabIndex;
  }
  /**
   * @type {string}
   */
  set title(title) {
    this.$element.title = title;
  }
  get title() {
    return this.$element.title;
  }
  /**
   * @type {string}
   */
  set className(classes) {
    this.$element.className = classes;
  }
  get className() {
    return this.$element.className;
  }
  /**
   * Focus this component. 
   */
  focus() {
    this.$element.focus();
  }
  /**
   * Toggle the given 'clazz' to given enabled state (second parameter).
   * @param {string} clazz The class to toggle
   * @param {boolean} enabled The enabled state
   */
  toggleClass(clazz, enabled = true) {
    this.$element.classList.toggle(clazz, enabled);
  }
  /**
   * @returns {boolean} if this component has requested class
   */
  hasClass(clazz) {
    return this.$element.classList.contains(clazz);
  }
  /**
   * Apply the given style object to this elements style.
   * @param {object} style The style object
   */
  applyStyle(style) {
    Object.assign(this.$element.style, style);
  }
  /**
   * Register event callback for the given key on this components element.
   * @template {import("./event.mjs").EventTarget} C
   * @template T
   * @param {string|Event<C, T>} event The event key
   * @param {function({target: C, payload: T}):any} callback The event callback
   */
  onEvent(event, callback) {
    if (typeof event === "string") {
      this.$element.addEventListener(event, (/** @type {CustomEvent} */ event) => callback({target: event.detail.component, payload: event.detail.payload}));
    } else {
      event.register(this, callback);
    }
  }
  /**
   * Dispatch a default event for the given event key starting from this components element.
   * @template {import("./event.mjs").EventTarget} C
   * @template T
   * @this C
   * @param {string|Event<C, T>} event The event key
   * @param {T|null} payload
   */
  dispatchEvent(event, payload = null) {
    if (typeof event === "string") {
      this.$element.dispatchEvent(new CustomEvent(event, { bubbles: true, detail: { component: this, payload } }));
    } else {
      event.dispatch(this, payload);
    }
  }
}


