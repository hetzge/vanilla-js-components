// @ts-check

import { Dropdown } from "./dropdown.js";
import { Pagination } from "./pagination.js";
import { SearchInput } from "./search-input.js";
import { Table } from "./table.js";
import { FlexSpaceBetween } from "./flex-space-between.js";

/**
 * @typedef {Object} SortableTitleSortEventDetails
 * @property {string} key
 * @property {boolean|undefined} desc
 */
{ }

class SortableTitle {
  static SORT_EVENT_KEY = "SortableTitle#sort";
  /**
   * @param {string} key
   * @param {HTMLElement} element
   */
  constructor(key, element) {
    /** @type {boolean|undefined} */
    this._state = undefined;
    /** @type {HTMLSpanElement} */
    this.el = document.createElement("span");
    this.el.append(element);
    this.el.append(this._arrowContainer = document.createElement("span"));
    this.el.style.cursor = "pointer";
    this.el.addEventListener("click", () => {
      if (this._state === undefined) {
        this._state = false;
        this._arrowContainer.innerText = "false";
      } else if (this._state === false) {
        this._state = true;
        this._arrowContainer.innerText = "true";
      } else {
        this._state = undefined;
        this._arrowContainer.innerText = "";
      }
      this.el.dispatchEvent(new CustomEvent(SortableTitle.SORT_EVENT_KEY, { bubbles: true, detail: { key, desc: this._state } }));
    });
  }
  /**
   * @param {EventTarget} element - The element to listen for the sort event on.
   * @param {function(SortableTitleSortEventDetails):void} callback - The sort callback.
   */
  static onSort(element, callback) {
    element.addEventListener(SortableTitle.SORT_EVENT_KEY, (/** @type {CustomEvent<SortableTitleSortEventDetails>} */ event) => callback(event.detail));
  }
}


class PageDropdown {
  constructor() {
    this._dropdown = new Dropdown();
    this.el = this._dropdown.el;
    this._dropdown.options = [
      { value: "10", text: "10" },
      { value: "20", text: "20" },
      { value: "30", text: "30" },
      { value: "40", text: "40" },
      { value: "50", text: "50" },
      { value: "75", text: "75" },
      { value: "100", text: "100" },
    ];
  }
}

/**
 * @typedef {Object} AdvancedTableColumn
 * @property {string} key
 * @property {function(AdvancedTableColumn):HTMLElement} headerFactory
 * @property {function(Object):HTMLElement} cellFactory
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


export class AdvancedTable {
  static LOAD_EVENT_KEY = "AdvancedTable#load";
  constructor() {
    /** @type {LoadTableRequest} */
    this._request = {
      sorts: {},
      offset: 0,
      limit: 10,
      query: "+"
    };
    this._searchInput = new SearchInput();
    this._table = new Table();
    this._topPagination = new Pagination();
    this._bottomPagination = new Pagination();
    this._pageDropdown = new PageDropdown();
    this.el = document.createElement("div");
    this.el.append(FlexSpaceBetween.create([
		this._topPagination.el,
		this._searchInput.el
    ]).el);
    this.el.append(this._table.el);
    this.el.append(FlexSpaceBetween.create([
      this._bottomPagination.el,
      this._pageDropdown.el
    ]).el);
    SearchInput.onSearch(this.el, details => {
      this._request.query = details.query;
      this.load();
    });
    SortableTitle.onSort(this.el, details => {
      this._request.sorts[details.key] = details.desc;
      if (details.desc === undefined) {
        delete this._request.sorts[details.key];
      }
      this.load();
    });
    Pagination.onSelect(this.el, details => {
      this._request.offset = (details.page - 1) * this._request.limit;
      this._topPagination.page = details.page;
      this._bottomPagination.page = details.page;
      this.load();
    });
    Dropdown.onSelect(this.el, details => {
      this._topPagination.pageSize = parseInt(details.value);
      this._bottomPagination.pageSize = parseInt(details.value);
      this._request.limit = parseInt(details.value);
      this._request.offset = (this._topPagination.page - 1) * this._request.limit;
      this.load();
    });
  }
  async load() {
    return new Promise((resolve, reject) => {
      this.el.dispatchEvent(new CustomEvent(AdvancedTable.LOAD_EVENT_KEY, {
        bubbles: true,
        detail: {
          request: this._request,
          callback: { resolve, reject }
        }
      }));
    }).then(response => {
      this._topPagination.total = response.total;
      this._bottomPagination.total = response.total;
      this._table.rows = response.rows;
    });
  }
  /** @param {Array<AdvancedTableColumn>} columns */
  set columns(columns) {
    this._table.columns = columns.map(column => {
      return {
        headerFactory: tableColumn => new SortableTitle(column.key, column.headerFactory(column)).el,
        cellFactory: column.cellFactory
      };
    });
  }
  /**
   * @param {EventTarget} element - The element to listen for the load event on.
   * @param {function(AdvancedTableLoadEventDetails):void} callback - The load table callback.
   */
  static onLoad(element, callback) {
    element.addEventListener(AdvancedTable.LOAD_EVENT_KEY, (/** @type {CustomEvent<AdvancedTableLoadEventDetails>} */ event) => callback(event.detail));
  }
}





