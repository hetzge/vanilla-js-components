// @ts-check

import * as core from "../core/index.mjs";

export class ListEditor extends core.Division {
  /** @type {core.Event<ListEditor, void>} */
  static CREATE_EVENT = new core.Event();
  /** @type {core.Event<ListEditor, void>} */
  static REMOVE_EVENT = new core.Event();
  constructor() {
    super();
    this.content = [
      this._table = new core.Table(),
      this._createButton = new core.Button(),
    ];
    this._createButton.content = "+";
    this._createButton.onClick = () => {
      this.dispatchEvent(ListEditor.CREATE_EVENT);
    };
    this._table.columns = [
      {
        cellFactory: content => content,
        headFactory: () => ""
      },
      {
        cellFactory: data => {
          const button = new core.Button();
          button.content = "X";
          button.onClick = async () => {
            this._selected = data;
            this.dispatchEvent(ListEditor.REMOVE_EVENT);
          };
          return button;
        },
        headFactory: () => ""
      }
    ];
    this._items = [];
  }
  /** @param {Array<import("../core/base-container.mjs").Content>} items */
  set items(items) {
    this._items = items;
    this._table.rows = items;
  }
  /** @type {Array<import("../core/base-container.mjs").Content>} */
  get items() {
    return this._items;
  }
  addItem(item) {
    this.items = [...this._items, item];
  }
  removeItem(itemToRemove = this.selected) {
    this.items = this._items.filter(item => item !== itemToRemove);
  }
  get selected() {
    return this._selected;
  }
}

export class TagListEditor extends core.Division {
  constructor() {
    super();
    this.content = this._editor = new ListEditor();
    this._datalist = undefined;
    this._editor.onEvent(ListEditor.CREATE_EVENT, () => {
      this._editor.addItem(this._createInput(""));
    });
    this._editor.onEvent(ListEditor.REMOVE_EVENT, () => {
      if (window.confirm("Sure ?")) {
        this._editor.removeItem();
      }
    });
  }
  _createInput(value) {
    const input = new core.TextInput();
    if (this._datalist !== undefined) {
      input.list = this._datalist;
    }
    input.value = value;
    return input;
  }
  /** @param {Array<string>} tags */
  set tags(tags) {
    this._editor.items = (tags || []).map(tag => {
      return this._createInput(tag);
    });
  }
  /** @type {Array<string>} */
  get tags() {
    return this._editor.items.map(item => {
      // @ts-ignore
      return item.value;
    });
  }
  /** @param {core.Datalist} datalist */
  set list(datalist) {
    this._datalist = datalist;
    this.tags = this.tags; // refresh editor
  }
}
