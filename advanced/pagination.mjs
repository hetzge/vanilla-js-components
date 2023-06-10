// @ts-check

import * as core from "../core/index.mjs";

class PaginationData {
  constructor() {
    /** @property {number} _page */
    this._page = 1;
    /** @property {number} _pageSize */
    this._pageSize = 10;
    /** @property {number} _total */
    this._total = 0;
  }
  set pageSize(pageSize) {
    this._pageSize = pageSize;
  }
  get pageSize() {
    return this._pageSize;
  }
  set total(total) {
    this._total = total;
  }
  get total() {
    return this._total;
  }
  set page(page) {
    this._page = page;
  }
  get page() {
    return Math.max(1, Math.min(this._page, this.lastPage));
  }
  get lastPage() {
    return Math.ceil(this._total / this._pageSize);
  }
  get lowOptions() {
    const options = [];
    for (
      let option = Math.max(1, this.page - 3); option < this.page; option++
    ) {
      options.push(option);
    }
    return options;
  }
  get highOptions() {
    const options = [];
    for (
      let option = this.page + 1;
      option <= Math.min(this.lastPage, this.page + 3);
      option++
    ) {
      options.push(option);
    }
    return options;
  }
}

/**
 * @typedef {Object} PaginationSelectEventDetails
 * @property {number} page
 */
{}

export class Pagination extends core.BaseContainer {
  /** @type {core.Event<Pagination, void>} */
  static SELECT_EVENT = new core.Event();
  constructor() {
    super("span");
    this._data = new PaginationData();
    this.update();
  }
  set page(page) {
    this._data.page = page;
    this.update();
  }
  get page() {
    return this._data.page;
  }
  set pageSize(pageSize) {
    this._data.pageSize = pageSize;
    this.update();
  }
  get pageSize() {
    return this._data.pageSize;
  }
  set total(total) {
    this._data._total = total;
    this.update();
  }
  get total() {
    return this._data.total;
  }
  update() {
    this.$element.innerHTML = "";
    this.$element.append(this._createOption(1, "<<", this.page > 1));
    this.$element.append(
      this._createOption(Math.max(1, this._data.page - 1), "<", this.page > 1),
    );
    for (let option of this._data.lowOptions) {
      this.$element.append(this._createOption(option, "" + option));
    }
    this.$element.append(
      this._createOption(this._data.page, "" + this._data.page, false),
    );
    for (let option of this._data.highOptions) {
      this.$element.append(this._createOption(option, "" + option));
    }
    this.$element.append(
      this._createOption(
        Math.min(this._data.lastPage, this.page + 1),
        ">",
        this.page < this._data.lastPage,
      ),
    );
    this.$element.append(
      this._createOption(
        this._data.lastPage,
        ">>",
        this.page < this._data.lastPage,
      ),
    );
  }
  _createOption(page, label, enabled = true) {
    const optionElement = document.createElement("a");
    optionElement.href = "#";
    optionElement.innerText = label;
    optionElement.style.padding = "4px";
    if (enabled) {
      optionElement.style.cursor = "pointer";
    } else {
      optionElement.style.color = "gray";
    }
    optionElement.addEventListener("click", () => this._setPage(page));
    return optionElement;
  }
  _setPage(page) {
    this.page = page;
    this.dispatchEvent(Pagination.SELECT_EVENT);
  }
}
