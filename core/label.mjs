// @ts-check

import { BaseComponent } from "./base-component.mjs";
import { BaseContainer } from "./base-container.mjs";
import { generateId } from "./utils.mjs";

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
      const id = idOrComponent.id === "" ? generateId() : idOrComponent.id;
      idOrComponent.id = id;
      this.$element.setAttribute("for", id);
    } else {
      throw new Error("Illegal argument '" + idOrComponent + "'");
    }
  }
}
