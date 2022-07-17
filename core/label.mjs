// @ts-check

import { BaseComponent } from "./base-component.mjs";
import { BaseContainer } from "./base-container.mjs";

export class Label extends BaseContainer {
  constructor() {
    super("label");
  }
  /**
   * @param {string|BaseComponent} idOrComponent
   */
  set for(idOrComponent) {
    if (typeof idOrComponent === "string") {
      this.$element.setAttribute("for", idOrComponent);
    } else if (idOrComponent.$element !== undefined) {
      this.$element.setAttribute("for", idOrComponent.id);
    } else {
      throw new Error("Illegal argument '" + idOrComponent + "'");
    }
  }
}
