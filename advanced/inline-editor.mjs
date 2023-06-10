// ts-check

import * as core from "../core/index.mjs";

export class InlineEditor extends core.Span {
  /** @type {core.Event<InlineEditor,void>} */
  static SUBMIT_EVENT = new core.Event();
  constructor() {
    super();
    
    this._editButton = new core.Button();
    this._editButton.content = "Edit";
    this._editContainer = new core.Span();
    this._editContainer.content = this._editButton;
    
    this._submitButton = new core.Button();
    this._submitButton.content = "Submit";
    this._submitContainer = new core.Span();
    this._submitContainer.content = this._submitButton;

    this._cancelButton = new core.Button();
    this._cancelButton.content = "Cancel";
    this._cancelContainer = new core.Span();
    this._cancelContainer.content = this._cancelButton;

    this._layout = new core.HeaderLayout();
    this._layout.right.content = this._editContainer;
    this.content = this._layout;

    this._editContainer.onClick = () => this.#edit();
    this._submitContainer.onClick = () => this.#submit();
    this._cancelContainer.onClick = () => this.#cancel();
    this._onEdit = () => "";
    this._onDisplay = () => "";
  }
  #edit() {
    this._layout.right.content = [
      this._submitContainer,
      this._cancelContainer,
    ];
    this._layout.left.content = this._onEdit();
  }
  #submit() {
    this.dispatchEvent(InlineEditor.SUBMIT_EVENT);
    this._layout.right.content = this._editContainer;
    this._layout.left.content = this._onDisplay();
  }
  #cancel() {
    this._layout.right.content = this._editContainer;
    this._layout.left.content = this._onDisplay();
  }
  set onEdit(onEdit) {
    this._onEdit = onEdit;
  }
  set onDisplay(onDisplay) {
    this._onDisplay = onDisplay;
    this.#cancel();
  }
  set editButton(editButton) {
    this._editContainer.content = editButton;
  }
  set submitButton(submitButton) {
    this._submitContainer.content = submitButton;
  }
  set cancelButton(cancelButton) {
    this._cancelContainer.content = cancelButton;
  }
}
