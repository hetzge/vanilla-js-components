// @ts-check

/**
 * The base class for all components.
 */
export default class BaseComponent {
  constructor() {
    /** 
     * @public
     * @type {HTMLElement}
     */
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
   * @param {string} key The event key
   * @param {function({component:BaseComponent}):any} callback The event callback
   */
  onEvent(key, callback) {
    this.$element.addEventListener(key, (/** @type {CustomEvent} */ event) => callback(event.detail));
  }
  /**
   * Dispatch a default event for the given event key starting from this components element.
   * @param {string} key The event key
   */
  dispatchEvent(key) {
    this.$element.dispatchEvent(new CustomEvent(key, { bubbles: true, detail: { component: this } }));
  }
}


