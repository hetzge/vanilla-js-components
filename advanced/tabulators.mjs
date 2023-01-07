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
  }
  /** @param {TabulatorConfigurations} pages */
  set pages(pages) {
    this._pages = pages;
    this._list.listContent = Object.keys(pages).map(key => {
      const item = core.createListItem(pages[key].tabulator);
      item.$element.style.cursor = "pointer";
      item.onClick = () => this.open(key);
      return item;
    });
  }
  async open(key) {
    this._body.content = await this._pages[key].page();
  }
}