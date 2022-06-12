// @ts-check

import BaseContainer from "./base-container.mjs";

/**
 * @typedef {Array<DescriptionListTermItem|DescriptionListDescriptionItem>} DescriptionListContent
 * @typedef {Array<ListItem>} UnorderedListContent
 */
{ }

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