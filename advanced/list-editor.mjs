// @ts-check

import * as core from "../core/index.mjs";

/**
 * @typedef {Object} ListController
 * @property {function():Promise<any|undefined>} onCreate
 * @property {function(any):Promise<boolean>} onRemove
 */
{ }

export class ListEditor extends core.Division {
  constructor() {
    super();
    this.content = [
      this._table = new core.Table(),
      this._createButton = new core.Button(),
    ];
    this._createButton.content = "+";
    this._createButton.onClick = () => this.create();
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
            if (await this._controller.onRemove(data)) {
              this.items = this._items.filter(item => item !== data);
            }
          };
          return button;
        },
        headFactory: () => ""
      }
    ];
    this._items = [];
    /** @type {ListController} */
    this._controller = {
      onCreate: async () => undefined,
      onRemove: async (data) => false
    };
  }
  async create() {
    const created = await this._controller.onCreate();
    if (created !== undefined) {
      this.items = [...this._items, created];
    }
  }
  /** @param {ListController} controller */
  set controller(controller) {
    this._controller = controller;
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
}

export class TagListEditor extends core.Division {
  constructor() {
    super();
    this.content = this._editor = new ListEditor();
    this._editor.controller = this;
    this._datalist = undefined;
  }
  _createInput(value) {
    const input = new core.TextInput();
    if (this._datalist !== undefined) {
      input.list = this._datalist;
    }
    input.value = value;
    return input;
  }
  async onCreate() {
    return this._createInput("");
  }
  async onRemove(tag) {
    return window.confirm("Sure ?");
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
