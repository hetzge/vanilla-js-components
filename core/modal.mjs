// @ts-check

import { BaseComponent } from "./base-component.mjs";
import { BaseContainer } from "./base-container.mjs";
import * as layout from "./layout.mjs";

/** 
 * Create a container at the bottom of the page. 
 * Opened dialogs will be moved into this container to fix order issues (dialog always in the front) and to prevent issues with nested dialog events. 
 */
function setupContainer() {
  if (document.getElementById("__modals") === null) {
    const $container = document.createElement("span");
    $container.id = "__modals";
    document.body.append($container);
  }
  return document.getElementById("__modals");
}

export class Modal extends BaseComponent {
  constructor() {
    super();
    this.$element = this._$dialog = document.createElement("dialog");
    this._stackLayout = new layout.PancakeStackLayout();
    this._stackLayout.$element.style.height = "initial";
    this._$dialog.append(this._stackLayout.$element);
  }
  open() {
    if (!this._$dialog.hasAttribute("open")) {
      const $container = setupContainer();
      $container.append(this._$dialog);
      // @ts-ignore
      this._$dialog.showModal();
    }
  }
  close() {
    if (this._$dialog.hasAttribute("open")) {
      this._$dialog.remove();
      // @ts-ignore
      this._$dialog.close(undefined);
    }
  }
  /**
   * @type {BaseContainer} 
   */
  get head() {
    return this._stackLayout.head;
  }
  /**
   * @type {BaseContainer} 
   */
  get body() {
    return this._stackLayout.body;
  }
  /**
   * @type {BaseContainer} 
   */
  get foot() {
    return this._stackLayout.foot;
  }
}