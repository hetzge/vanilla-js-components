// @ts-check

import * as core from "../core/index.mjs";
import { Pagination } from "./pagination.mjs";

class PageDropdown extends core.BaseComponent {
  /** @type {core.Event<PageDropdown, void>} */
  static PAGE_SELECT_EVENT = new core.Event();
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
      { value: "200", text: "200" },
      { value: "1000", text: "1000" },
    ];
    this.onEvent(
      core.Dropdown.SELECT_EVENT,
      () => this.dispatchEvent(PageDropdown.PAGE_SELECT_EVENT),
    );
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
  /** @type {core.Event<TableHeaderToggle, void>} */
  static TOGGLE_HEADER_EVENT = new core.Event();
  constructor() {
    super();
    this.$element = (this._toggle = new core.Toggle()).$element;
    this._content = new core.Span();
    this._noSortSpan = new core.Span();
    this._noSortSpan.content = "";
    this._ascSortSpan = new core.Span();
    this._ascSortSpan.content = "(ASC)";
    this._descSortSpan = new core.Span();
    this._descSortSpan.content = "(DESC)";
    this._toggle.states = [
      { value: null, content: [this._content, this._noSortSpan] },
      { value: "asc", content: [this._content, this._ascSortSpan] },
      { value: "desc", content: [this._content, this._descSortSpan] },
    ];
    this.onEvent(
      core.Toggle.TOGGLE_EVENT,
      () => this.dispatchEvent(TableHeaderToggle.TOGGLE_HEADER_EVENT),
    );
    this.$element.style.cursor = "pointer";
    this.$element.style.display = "flex";
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
  /** @param {core.Content} content */
  set noSortContent(content) {
    this._noSortSpan.content = content;
  }
  /** @param {core.Content} content */
  set ascSortContent(content) {
    this._ascSortSpan.content = content;
  }
  /** @param {core.Content} content */
  set descSortContent(content) {
    this._descSortSpan.content = content;
  }
}

/**
 * @typedef {Object} AdvancedTableColumn
 * @property {string} key
 * @property {string} [sortKey]
 * @property {function():core.Content} headerFactory
 * @property {function():core.Content} [unitFactory]
 * @property {function(Object):core.Content} cellFactory
 */
{}

/**
 * @typedef {Object} LoadTableRequest
 * @property {object} sorts
 * @property {number} offset
 * @property {number} limit
 * @property {string|null} query
 */
{}

/**
 * @typedef {Object} LoadTableResponse
 * @property {number} total
 * @property {Array<Object>} rows
 */
{}

/**
 * @typedef {Object} AdvancedTableLoadEventDetails
 * @property {LoadTableRequest} request
 * @property {{resolve:function(LoadTableResponse):void,reject:function(*):void}} callback
 */
{}

export class PaginationLayout extends core.BaseContainer {
  /** @type {core.Event<PaginationLayout, void>} */
  static LOAD_EVENT = new core.Event();
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
    this._searchInput = new core.TextInput();
    this._searchInput.placeholder = "Search";
    this._searchInput.onEvent("keyup", () => {
      this._request.query = this._searchInput.value !== ""
        ? this._searchInput.value
        : null;
      this.load();
    });
    // ---------------------------------------------------

    // ---------------------------------------------------
    const header = new core.HeaderLayout();
    header.left.content = this._headerPagination;
    header.center.content = this._searchInput;
    header.right.content = this._headerPageDropdown;
    // ---------------------------------------------------

    // ---------------------------------------------------
    const footer = new core.HeaderLayout();
    footer.left.content = this._footerPagination;
    footer.center.content = "";
    footer.right.content = this._footerPageDropdown;
    // ---------------------------------------------------

    // ---------------------------------------------------
    const layout = new core.PancakeStackLayout();
    layout.head.content = header;
    layout.foot.content = footer;
    // ---------------------------------------------------

    this.content = this._layout = layout;
    this.enableSearch = false;

    /** @type {LoadTableRequest} */
    this._request = {
      sorts: {},
      offset: 0,
      limit: 10,
      query: null,
    };

    this.onEvent(PageDropdown.PAGE_SELECT_EVENT, ({ target }) => {
      this.pageSize = target.pageSize;
      this.load();
    });
    this.onEvent(Pagination.SELECT_EVENT, ({ target }) => {
      this.page = target.page;
      this.load();
    });
    this.onEvent(TableHeaderToggle.TOGGLE_HEADER_EVENT, ({ target }) => {
      this._request.sorts[target.key] = target.order;
      this.load();
    });
  }
  load() {
    this.dispatchEvent(PaginationLayout.LOAD_EVENT);
  }
  /** @param {Number} pageSize */
  set pageSize(pageSize) {
    this._headerPageDropdown.pageSize = pageSize;
    this._footerPageDropdown.pageSize = pageSize;
    this._headerPagination.pageSize = pageSize;
    this._footerPagination.pageSize = pageSize;
    this._request.limit = pageSize;
    this._request.offset = (this._headerPagination.page - 1) *
      this._request.limit;
  }
  /** @param {Number} page */
  set page(page) {
    this._headerPagination.page = page;
    this._footerPagination.page = page;
    this._request.offset = (page - 1) * this._request.limit;
  }
  set total(total) {
    this._headerPagination.total = total;
    this._footerPagination.total = total;
  }
  /** @type {LoadTableRequest} */
  get request() {
    return this._request;
  }
  /** @type {core.BaseContainer} */
  get body() {
    return this._layout.body;
  }
  set enableSearch(enableSearch) {
    this._searchInput.$element.style.visibility = enableSearch
      ? "visible"
      : "hidden";
  }
}

const advancedTableCss = core.createCss((className) => {
  return `
    .${className} {
      position: relative;
      width: 100%;
    }
    .${className} > thead > tr > th {
      position: sticky;
      top: 0;
      background-color: white;
      box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
    }
  `;
});

export class SortableTable extends core.BaseComponent {
  constructor() {
    super();
    this.$element = (this._table = new core.Table()).$element;
    this._table.className = advancedTableCss();
    /** @type {{no: function():import("../core/base-container.mjs").Content, asc: function():import("../core/base-container.mjs").Content, desc: function():import("../core/base-container.mjs").Content}} */
    this._sortContentFactory = {
      no: () => "",
      asc: () => "(ASC)",
      desc: () => "DESC",
    };
    this._columnListController = new core.ListController();
    this._columnListController.factory = this._columnFactory.bind(this);
    this._columnListController.callback = (columns) =>
      this._table.columns = columns;
  }
  _columnFactory(column) {
    return {
      headFactory: () => {
        const headerContainer = new core.PancakeStackLayout();
        if (column.unitFactory !== undefined) {
          headerContainer.foot.content = column.unitFactory();
        } else {
          headerContainer.foot.content = "";
        }
        if (column.sortKey !== undefined) {
          const headerToggle = new TableHeaderToggle();
          if (this._sortContentFactory !== undefined) {
            headerToggle.noSortContent = this._sortContentFactory.no();
            headerToggle.ascSortContent = this._sortContentFactory.asc();
            headerToggle.descSortContent = this._sortContentFactory.desc();
          }
          headerToggle.key = column.key;
          headerToggle.content = column.headerFactory();
          headerContainer.head.content = headerToggle;
        } else {
          headerContainer.head.content = column.headerFactory();
        }
        return headerContainer;
      },
      cellFactory: column.cellFactory,
    };
  }
  /** @param {Array<AdvancedTableColumn>} columns */
  set columns(columns) {
    this._columnListController.update(columns);
  }
  set rows(rows) {
    this._table.rows = rows;
  }
  set sortContentFactory(factory) {
    this._sortContentFactory = factory;
    this._columnListController.update();
  }
}

export class AdvancedTable extends PaginationLayout {
  /** @type {core.Event<AdvancedTable, void>} */
  static LOAD_EVENT = new core.Event();
  constructor() {
    super();
    this._table = new SortableTable();
    this.body.content = this._table;
  }
  load() {
    this.dispatchEvent(AdvancedTable.LOAD_EVENT);
  }
  /** @param {Array<AdvancedTableColumn>} columns */
  set columns(columns) {
    this._table.columns = columns;
  }
  /** @param {LoadTableResponse} data */
  set data(data) {
    this.total = data.total;
    this._table.rows = data.rows;
  }
}
