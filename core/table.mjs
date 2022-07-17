// @ts-check

import { BaseContainer } from "./base-container.mjs";

export class TableDataCell extends BaseContainer {
  constructor() {
    super("td");
  }
}

export class TableRow extends BaseContainer {
  constructor() {
    super("tr");
  }
}

export class TableHeadCell extends BaseContainer {
  constructor() {
    super("th");
  }
}

export class TableHead extends BaseContainer {
  constructor() {
    super("thead");
  }
}

export class TableFoot extends BaseContainer {
  constructor() {
    super("tfoot");
  }
}

export class TableBody extends BaseContainer {
  constructor() {
    super("tbody");
  }
}

/**
 * @typedef {Object} Column
 * @property {function(Column):import("./base-container.mjs").Content} headFactory
 * @property {function(Object):import("./base-container.mjs").Content} cellFactory
 */
{ }

/**
 * Represents a table that can be filled with columns and rows.
 */
export class Table extends BaseContainer {
  /**
   * @param {Object} defaults
   * @param {Array<Column>} [defaults.columns=[]]
   * @param {Array<Object>} [defaults.rows=[]] 
   * @returns {Table} 
   */
  static create({ columns = [], rows = [] } = {}) {
    const table = new Table();
    table.columns = columns;
    table.rows = rows;
    return table;
  }
  constructor() {
    super("table");
    this.content = [
      this._head = new TableHead(),
      this._body = new TableBody()
    ];
    /** @type {Array<Column>} */
    this._columns = [];
  }
  /** 
   * @param {Array<Column>} columns The columns definitions
   */
  set columns(columns) {
    this._columns = columns;
    const headTableRow = new TableRow();
    headTableRow.content = this._columns.map(column => {
      const cell = new TableHeadCell();
      cell.content = column.headFactory(column);
      return cell;
    });
    this._head.content = headTableRow;
  }
  /** 
   * @param {Array<Object>} rows The row models 
   */
  set rows(rows) {
    this._body.content = rows.map(row => {
      const tableRow = new TableRow();
      tableRow.content = this._columns.map(column => {
        const cell = new TableDataCell();
        cell.content = column.cellFactory(row);
        return cell;
      });
      return tableRow;
    });
  }
}