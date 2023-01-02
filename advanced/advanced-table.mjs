// @ts-check


import * as core from "../core/index.mjs";
import { Pagination } from "./pagination.mjs";

class PageDropdown extends core.BaseComponent {
  static PAGE_SELECT_EVENT_KEY = "PageDropdown#page-select";
  constructor() {
    super();
    this.$element = (this._dropdown = new core.Dropdown()).$element;
    this._dropdown.options = [
      { value: "10", text: "10" },
      { value: "20", text: "20" },
      { value: "30", text: "30" },
      { value: "40", text: "40" },
      { value: "50", text: "50" },
      { value: "75", text: "75" },
      { value: "100", text: "100" },
    ];
    this.onEvent(core.Dropdown.SELECT_EVENT_KEY, () => this.dispatchEvent(PageDropdown.PAGE_SELECT_EVENT_KEY));
  }
  /** @type {number} */
  get pageSize() {
    return parseInt(this._dropdown.value);
  }
  set pageSize(pageSize) {
    this._dropdown.value = pageSize + "";
  }
}

class TableHeaderToggle extends core.BaseComponent {
  static TOGGLE_HEADER_EVENT_KEY = "TableHeaderToggle#toggle-header";
  constructor() {
    super();
    this.$element = (this._toggle = new core.Toggle()).$element;
    this._content = new core.Span();
    const noSortText = new core.Span();
    noSortText.content = "";
    const ascSortText = new core.Span();
    ascSortText.content = "(ASC)";
    const descSortText = new core.Span();
    descSortText.content = "(DESC)";
    this._toggle.states = [
      { value: null, content: [this._content, noSortText] },
      { value: "asc", content: [this._content, ascSortText] },
      { value: "desc", content: [this._content, descSortText] }
    ];
    this.onEvent(core.Toggle.TOGGLE_EVENT_KEY, () => this.dispatchEvent(TableHeaderToggle.TOGGLE_HEADER_EVENT_KEY));
    this.$element.style.cursor = "pointer";
  }
  /** @type {string} */
  get key() {
    return this._key;
  }
  set key(key) {
    this._key = key;
  }
  /** @type {string} */
  get order() {
    return this._toggle.value;
  }
  /** @param {core.Content} content */
  set content(content) {
    this._content.content = content;
  }
}

/**
 * @typedef {Object} AdvancedTableColumn
 * @property {string} key
 * @property {function():core.Content} headerFactory
 * @property {function(Object):core.Content} cellFactory
 */
{ }

/**
 * @typedef {Object} LoadTableRequest
 * @property {object} sorts
 * @property {number} offset
 * @property {number} limit
 * @property {string} query
 */
{ }

/**
 * @typedef {Object} LoadTableResponse
 * @property {number} total
 * @property {Array<Object>} rows
 */
{ }

/**
 * @typedef {Object} AdvancedTableLoadEventDetails
 * @property {LoadTableRequest} request
 * @property {{resolve:function(LoadTableResponse):void,reject:function(*):void}} callback
 */
{ }


export class AdvancedTable extends core.BaseContainer {
  static LOAD_EVENT_KEY = "AdvancedTable#load";
  constructor() {
    super("div");

    // ---------------------------------------------------
    this._headerPageDropdown = new PageDropdown();
    this._footerPageDropdown = new PageDropdown();
    // ---------------------------------------------------

    // ---------------------------------------------------
    this._headerPagination = new Pagination();
    this._footerPagination = new Pagination();
    // ---------------------------------------------------

    // ---------------------------------------------------
    const header = new core.HeaderLayout();
    header.left.content = this._headerPagination;
    header.center.content = "";
    header.right.content = this._headerPageDropdown;
    // ---------------------------------------------------

    // ---------------------------------------------------
    this._table = new core.Table();
    // ---------------------------------------------------

    // ---------------------------------------------------
    const footer = new core.HeaderLayout();
    footer.left.content = this._footerPagination;
    footer.right.content = this._footerPageDropdown;
    // ---------------------------------------------------

    // ---------------------------------------------------
    const layout = new core.PancakeStackLayout();
    layout.head.content = header;
    layout.body.content = this._table;
    layout.foot.content = footer;
    // ---------------------------------------------------

    this.content = layout;

    /** @type {LoadTableRequest} */
    this._request = {
      sorts: {},
      offset: 0,
      limit: 10,
      query: "+"
    };

    this.onEvent(PageDropdown.PAGE_SELECT_EVENT_KEY, (/** @type {{component:PageDropdown}} */ payload) => {
      this.pageSize = payload.component.pageSize;
      this.load();
    });

    this.onEvent(Pagination.SELECT_EVENT_KEY, (/** @type {{component:Pagination}} */ payload) => {
      this.page = payload.component.page;
      this.load();
    });

    this.onEvent(TableHeaderToggle.TOGGLE_HEADER_EVENT_KEY, (/** @type {{component:TableHeaderToggle}} */ payload) => {
      this._request.sorts[payload.component.key] = payload.component.order;
      this.load();
    });
  }
  load() {
    this.dispatchEvent(AdvancedTable.LOAD_EVENT_KEY);
  }
  /** @param {Number} pageSize */
  set pageSize(pageSize) {
    this._headerPageDropdown.pageSize = pageSize;
    this._footerPageDropdown.pageSize = pageSize;
    this._headerPagination.pageSize = pageSize;
    this._footerPagination.pageSize = pageSize;
    this._request.limit = pageSize;
    this._request.offset = (this._headerPagination.page - 1) * this._request.limit;
  }
  /** @param {Number} page */
  set page(page) {
    this._headerPagination.page = page;
    this._footerPagination.page = page;
    this._request.offset = (page - 1) * this._request.limit;
  }
  /** @param {Array<AdvancedTableColumn>} columns */
  set columns(columns) {
    this._table.columns = columns.map(column => {
      return {
        headFactory: () => {
          const headerToggle = new TableHeaderToggle();
          headerToggle.key = column.key;
          headerToggle.content = column.headerFactory();
          return headerToggle;
        },
        cellFactory: column.cellFactory
      };
    });
  }
  /** @param {LoadTableResponse} data */
  set data(data) {
    this._headerPagination.total = data.total;
    this._footerPagination.total = data.total;
    this._table.rows = data.rows;
  }
  /** @type {LoadTableRequest} */
  get request() {
    return this._request;
  }
}





