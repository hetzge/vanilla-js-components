// @ts-check

import { BaseContainer } from "./base-container.mjs";


/**
 * @template ITEM
 * @template VALUE
 */
export class ListController {
  constructor() {
    this._values = [];
  }
  /**
   * @param {function(VALUE):ITEM} factory
   */
  set factory(factory) {
    this._factory = factory;
  }
  /**
   * @param {function(Array<ITEM>):void} callback
   */
  set callback(callback) {
    this._callback = callback;
  }
  /**
   * @param {Array<VALUE>} values 
   */
  update(values = this._values) {
    this._values = values;
    this._callback(values.map((value, i) => {
      return this._factory(value);
    }));
  }
}


/**
 * @template ITEM
 * @template VALUE
 */
export class ComponentListController {
  constructor() {
    this._values = [];
    this._items = [];
  }
  /**
 * @param {function():ITEM} factory
 */
  set factory(factory) {
    this._factory = factory;
  }
  /**
   * @param {function(Array<ITEM>):void} callback
   */
  set callback(callback) {
    this._callback = callback;
  }
  /**
   * @param {function(ITEM,VALUE):void} setup
   */
  set setup(setup) {
    this._setup = setup;
  }
  /**
   * @param {Array<VALUE>} values 
   */
  update(values = this._values) {
    this._values = values;
    // @ts-ignore
    this._items = values.map((value, i) => {
      if (i >= this._items.length) {
        this._items[i] = this._factory();
      }
      this._setup(this._items[i], value);
      return this._items[i];
    });
    this._callback(this._items);
  }
}

/**
 * @typedef {Array<DescriptionListTermItem|DescriptionListDescriptionItem>} DescriptionListContent
 * @typedef {Array<ListItem>} UnorderedListContent
 */
{ }

/**
 * @param {Array<{term:import("./base-container.mjs").Content,description:import("./base-container.mjs").Content}>} pairs
 * @returns {DescriptionListContent}
 */
export function toDescriptionListContent(pairs) {
  const result = [];
  for (let pair of pairs) {
    const termItem = new DescriptionListTermItem();
    termItem.content = pair.term;
    result.push(termItem);
    const descriptionItem = new DescriptionListDescriptionItem();
    descriptionItem.content = pair.description;
    result.push(descriptionItem);
  }
  return result;
}

export class DescriptionListTermItem extends BaseContainer {
  constructor() {
    super("dt");
  }
}

export class DescriptionListDescriptionItem extends BaseContainer {
  constructor() {
    super("dd");
  }
}

export class ListItem extends BaseContainer {
  constructor() {
    super("li");
  }
}

/**
 * @param {import("./base-container.mjs").Content} content
 */
export function createListItem(content) {
  const item = new ListItem();
  item.content = content;
  return item;
}

export class DescriptionList extends BaseContainer {
  constructor() {
    super("dl");
  }
  /**
   * Replace the content of this description list with the given columns from the given model.
   * @param {Array<import('./table.mjs').Column>} columns The columns
   * @param {object} model The model
   */
  setup(columns, model) {
    // @ts-ignore
    this.listContent = columns.flatMap(column => {
      const term = new DescriptionListTermItem();
      term.content = column.headFactory(column);
      const description = new DescriptionListDescriptionItem();
      description.content = column.cellFactory(model);
      return [term, description];
    });
  }
  /**
   * @param {DescriptionListContent} content
   */
  set listContent(content) {
    this.content = content;
  }
}

export class UnorderedList extends BaseContainer {
  constructor() {
    super("ul");
  }
  /**
   * @param {UnorderedListContent} content
   */
  set listContent(content) {
    this.content = content;
  }
}