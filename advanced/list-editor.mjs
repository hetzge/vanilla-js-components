// @ts-check

import * as core from "../core/index.mjs";

/**
 * @typedef {Object} ListController
 * @property {function():any|undefined} onCreate
 * @property {function(any):boolean} onRemove
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
          button.onClick = () => {
            if (this._controller.onRemove(data)) {
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
      onCreate: () => undefined,
      onRemove: (data) => false
    };
  }
  create() {
    const created = this._controller.onCreate();
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