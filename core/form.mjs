// @ts-check

import { BaseContainer } from "./base-container.mjs";
import { BaseComponent } from "./base-component.mjs";
import { Division, Span } from "./simple.mjs";
import { Label } from "./label.mjs";

export class Legend extends BaseContainer {
  constructor() {
    super("legend");
  }
}

export class FormPart extends BaseComponent {
  constructor() {
    super();
    this.$element = (this._container = new Division()).$element;
    this._label = new Label();
    this._error = new Span();
    this.input = new Span();
  }
  set label(label) {
    this._label.content = label;
  }
  set input(input) {
    this._label.for = input;
    this._input = input;
    this._container.content = [this._label, this._input, this._error];
  }
  set error(error) {
    const hasError = error != null;
    this.toggleClass("has-error", hasError);
    this._error.content = hasError ? error : "";
  }
}

export class Fieldset extends BaseComponent {
  constructor() {
    super();
    this.$element = (this._container = new BaseContainer("fieldset")).$element;
    this._legend = new Legend();
    this._error = new Span();
    this.content = new Span();
  }
  set legend(legend) {
    this._legend.content = legend;
  }
  set content(content) {
    this._content = content;
    this._container.content = [this._legend, this._error, ...(Array.isArray(this._content) ? this._content : [this._content])];
  }
  set error(error) {
    const hasError = error != null;
    this.toggleClass("has-error", hasError);
    this._error.content = hasError ? error : "";
  }
}


