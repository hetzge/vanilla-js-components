// @ts-check

import { BaseComponent } from "./base-component.mjs";
import { BaseContainer } from "./base-container.mjs";
import * as layout from "./layout.mjs";

export class Modal extends BaseComponent {
  constructor() {
    super();
    /** @type {HTMLDialogElement} */
    this.$element = document.createElement("dialog");
    this._stackLayout = new layout.PancakeStackLayout();
    this.$element.append(this._stackLayout.$element);
  }
  open() {
    // @ts-ignore
    this.$element.showModal();
  }
  close() {
    // @ts-ignore
    this.$element.close(undefined);
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