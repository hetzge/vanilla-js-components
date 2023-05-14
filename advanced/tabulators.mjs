// @ts-check

import * as core from "../core/index.mjs";

/**
 * @typedef {function():Promise<import("../core/base-container.mjs").Content>} TabulatorPageFactory
 */
{ }

/**
 * @typedef {object} TabulatorConfiguration
 * @param {import("../core/base-container.mjs").Content} tabulator
 * @param {TabulatorPageFactory} page
 */
{ }

/**
 * @typedef {Object<String,TabulatorConfiguration>} TabulatorConfigurations
 */
{ }

export class Tabulators extends core.BaseComponent {
  constructor() {
    super();
    this.$element = (this._division = new core.Division()).$element;
    this._division.content = [
      this._list = new core.UnorderedList(),
      this._body = new core.Division(),
    ];
    /** @type {Object<string, import("../core/base-component.mjs").BaseComponent>} */
    this._items = {};
  }
  /** @param {TabulatorConfigurations} pages */
  set pages(pages) {
    this._pages = pages;
    this._items = {};
    this._list.listContent = Object.keys(pages).map(key => {
      const item = core.createListItem(pages[key].tabulator);
      item.$element.style.cursor = "pointer";
      item.onClick = () => this.open(key);
      this._items[key] = item;
      return item;
    });
  }
  async open(key) {
    this.active = key;
    this._body.content = await this._pages[key].page();
  }
  set active(key) {
    this._active = key;
    Object.keys(this._items).forEach(key => {
      this._items[key].toggleClass("active", false);
    });
    this._items[key].toggleClass("active", true);
  }
  get active() {
    return this._active;
  }
}