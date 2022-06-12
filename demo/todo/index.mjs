// @ts-check

import * as core from "../../core/index.mjs";

/**
 * @typedef {Object} Todo
 * @property {string} title
 * @property {boolean} completed
 */
{ }

/**
 * @typedef {Object} Filter
 * @property {string} title
 * @property {string} key
 */
{ }

export class TodoListItem extends core.ListItem {
  static REMOVE_ITEM_EVENT_KEY = "TodoListItem#REMOVE_ITEM";
  static COMPLETE_ITEM_EVENT_KEY = "TodoListItem#COMPLETE_ITEM";
  static EDIT_ITEM_EVENT_KEY = "TodoListItem#EDIT";
  constructor() {
    super();
    // ---------------------------------------------------
    this._checkbox = new core.Checkbox();
    this._checkbox.className = "toggle";
    this._checkbox.onChange = () => this.dispatchEvent(TodoListItem.COMPLETE_ITEM_EVENT_KEY);
    // ---------------------------------------------------

    // ---------------------------------------------------
    this._label = new core.Label();
    // ---------------------------------------------------

    // ---------------------------------------------------
    this._button = new core.Button();
    this._button.toggleClass("destroy");
    this._button.onClick = () => this.dispatchEvent(TodoListItem.REMOVE_ITEM_EVENT_KEY);
    // ---------------------------------------------------

    // ---------------------------------------------------
    const division = new core.Division();
    division.className = "view";
    division.content = [this._checkbox, this._label, this._button];
    // ---------------------------------------------------

    // ---------------------------------------------------
    this._input = new core.TextInput();
    this._input.className = "edit";
    this._input.onEnter = () => this.submit();
    // ---------------------------------------------------

    this.content = [division, this._input];
    this.className = "todo-list-item";
    this.onDoubleClick = () => this.edit();
  }
  edit() {
    this._input.value = this._todo.title;
    TodoListItem.cancelEditAll();
    this.toggleClass("editing");
    requestAnimationFrame(() => this._input.focus());
  }
  submit() {
    this.dispatchEvent(TodoListItem.EDIT_ITEM_EVENT_KEY);
    TodoListItem.cancelEditAll();
  }
  /**
   * @param {Todo} todo
   */
  set todo(todo) {
    this._todo = todo;
    this._label.content = todo.title;
    this._checkbox.value = todo.completed;
    this.toggleClass("completed", todo.completed);
  }
  get todo() {
    return this._todo;
  }
  get value() {
    return this._input.value;
  }
  static cancelEditAll() {
    for (const $element of document.querySelectorAll(".todo-list-item.editing")) {
      $element.classList.toggle("editing", false);
    }
  }
}

export class FilterListItem extends core.ListItem {
  static FILTER_EVENT_KEY = "FilterListItem#FILTER";
  constructor() {
    super();

    // ---------------------------------------------------
    this._anchor = new core.Anchor();
    this._anchor.onClick = () => this.dispatchEvent(FilterListItem.FILTER_EVENT_KEY);
    // ---------------------------------------------------

    /** @type {Filter} */
    this._filter = undefined;
    this.content = this._anchor;
  }
  /**
   * @param {Filter} filter
   */
  set filter(filter) {
    this._filter = filter;
    this._anchor.content = filter.title;
  }
  get filter() {
    return this._filter;
  }
  set selected(selected) {
    this._anchor.toggleClass("selected", selected);
  }
  get selected() {
    return this._anchor.hasClass("selected");
  }
}

export class TodoApp extends core.BaseComponent {
  static SUBMIT_EVENT_KEY = "TodoApp#SUBMIT";
  static CLEAR_COMPLETED_EVENT_KEY = "TodoApp#CLEAR_COMPLETED"
  static COMPLETE_ALL_EVENT_KEY = "TodoApp#COMPLETE_ALL"
  constructor() {
    super();

    const header = (() => {

      // ---------------------------------------------------
      this._input = new core.TextInput();
      this._input.className = "qa-todo-input new-todo";
      this._input.placeholder = "What needs to be done ?";
      this._input.autofocus = true;
      this._input.onEnter = () => this.dispatchEvent(TodoApp.SUBMIT_EVENT_KEY)
      // ---------------------------------------------------

      // ---------------------------------------------------
      const headline = new core.Headline1();
      headline.content = "todos";
      // ---------------------------------------------------

      // ---------------------------------------------------
      const header = new core.Header();
      header.className = "header";
      header.content = [this._input, headline];
      return header;
      // ---------------------------------------------------
    })();

    const body = (() => {
      // ---------------------------------------------------
      this._checkbox = new core.Checkbox();
      this._checkbox.className = "toggle-all";
      this._checkbox.onChange = () => this.dispatchEvent(TodoApp.COMPLETE_ALL_EVENT_KEY);
      // ---------------------------------------------------

      // ---------------------------------------------------
      const checkboxLabel = new core.Label();
      checkboxLabel.for = this._checkbox;
      checkboxLabel.content = "Mark all as complete";
      // ---------------------------------------------------

      // ---------------------------------------------------
      this._todoList = new core.UnorderedList();
      this._todoList.className = "todo-list";
      // ---------------------------------------------------

      const bodyFooter = (() => {
        // ---------------------------------------------------
        this._count = new core.Span();
        this._count.className = "todo-count";
        // ---------------------------------------------------

        // ---------------------------------------------------
        this._filterList = new core.UnorderedList();
        this._filterList.className = "filters";
        // ---------------------------------------------------

        // ---------------------------------------------------
        const button = new core.Button();
        button.className = "clear-completed qa-clear-completed-button";
        button.content = "Clear completed";
        button.onClick = () => this.dispatchEvent(TodoApp.CLEAR_COMPLETED_EVENT_KEY);
        // ---------------------------------------------------

        // ---------------------------------------------------
        const bodyFooter = new core.Footer();
        bodyFooter.className = "footer";
        bodyFooter.content = [this._count, this._filterList, button];
        return bodyFooter;
        // ---------------------------------------------------
      })();

      const body = new core.Section();
      body.content = [this._checkbox, checkboxLabel, this._todoList, bodyFooter];
      return body;
    })();

    const footer = (() => {
      // ---------------------------------------------------
      const clickToEditParahraph = new core.Paragraph();
      clickToEditParahraph.content = "Double-click to edit a todo";
      // ---------------------------------------------------

      // ---------------------------------------------------
      const writtenByPrefix = new core.Span();
      writtenByPrefix.content = "Written by ";
      // ---------------------------------------------------

      // ---------------------------------------------------
      const writtenByAnchor = new core.Anchor();
      writtenByAnchor.href = "https://github.com/hetzge";
      writtenByAnchor.content = "Markus Hettich";
      // ---------------------------------------------------

      // ---------------------------------------------------
      const writtenByParagraph = new core.Paragraph();
      writtenByParagraph.content = [clickToEditParahraph, writtenByPrefix, writtenByAnchor];
      // ---------------------------------------------------

      // ---------------------------------------------------
      const footer = new core.Footer();
      footer.content = writtenByParagraph;
      return footer;
      // ---------------------------------------------------
    })();

    // ---------------------------------------------------
    const mainSection = new core.Section();
    mainSection.className = "todoapp";
    mainSection.content = [header, body, footer];
    // ---------------------------------------------------

    this.$element = mainSection.$element;
  }
  /**
   * @param {Array<TodoListItem>} items
   */
  set todoListItems(items) {
    this._todoList.listContent = items;
  }
  /**
   * @param {Array<FilterListItem>} items
   */
  set filterItems(items) {
    this._filterList.listContent = items;
  }
  setCount(count) {
    this._count.content = count;
    return this;
  }
  get allCompleted() {
    return this._checkbox.value;
  }
  get inputValue() {
    return this._input.value;
  }
  clearInput() {
    this._input.value = "";
  }
}

export class TodoAppModel {
  constructor() {
    /**
     * @type {Array<Todo>}
     */
    this._todos = [];
    /**
     * @type {Filter}
     */
    this._filter = undefined;
  }
  /**
   * @param {Todo} todo
   */
  addTodo(todo) {
    this._todos.push(todo);
  }
  /**
   * @param {Todo} todo
   */
  removeTodo(todo) {
    this._todos = this._todos.filter(it => it !== todo);
  }
  /**
   * @param {boolean} completed
   */
  completeAll(completed) {
    for (const todo of this._todos) {
      todo.completed = completed;
    }
  }
  clearCompleted() {
    this._todos = this._todos.filter(it => !it.completed);
  }
  /** 
   * @param {Filter} filter
   */
  set filter(filter) {
    this._filter = filter;
  }
  get filter() {
    return this._filter;
  }
  get filteredTodos() {
    return this._todos.filter(todo => {
      if (this._filter === undefined) {
        return true;
      } else if (this._filter.key === "completed") {
        return todo.completed;
      } else if (this._filter.key === "active") {
        return !todo.completed;
      } else {
        return true;
      }
    });
  }
}

export class TodoAppController {
  constructor() {
    this._filters = [
      { title: "All", key: undefined },
      { title: "Active", key: "active" },
      { title: "Completed", key: "completed" },
    ];
    this._model = new TodoAppModel();
    this._model.filter = this._filters[0];
    this.todoApp = new TodoApp();
    this.todoApp.onEvent(TodoApp.SUBMIT_EVENT_KEY, payload => this.addTodo())
    this.todoApp.onEvent(TodoApp.COMPLETE_ALL_EVENT_KEY, payload => this.completeAll())
    this.todoApp.onEvent(TodoApp.CLEAR_COMPLETED_EVENT_KEY, payload => this.clearCompleted());
    this.todoApp.onEvent(FilterListItem.FILTER_EVENT_KEY, payload => this.setFilter(/** @type {FilterListItem} */(payload.component).filter));
    this.todoApp.onEvent(TodoListItem.REMOVE_ITEM_EVENT_KEY, (/** @type {{component:TodoListItem}} */ payload) => this.removeTodo(payload.component.todo));
    this.todoApp.onEvent(TodoListItem.COMPLETE_ITEM_EVENT_KEY, (/** @type {{component:TodoListItem}} */ payload) => this.complete(payload.component.todo));
    this.todoApp.onEvent(TodoListItem.EDIT_ITEM_EVENT_KEY, (/** @type {{component:TodoListItem}} */ payload) => this.edit(payload.component.value, payload.component.todo));
    this.updateTodos();
    this.updateFilters();
  }
  updateTodos() {
    this.todoApp.todoListItems = this._model.filteredTodos.map(todo => this._createTodoItem(todo));
  }
  updateFilters() {
    this.todoApp.filterItems = this._filters.map(filter => this._createFilterItem(filter));
  }
  /**
   * @param {Todo} todo
   */
  removeTodo(todo) {
    this._model.removeTodo(todo);
    this.updateTodos();
  }
  /**
   * @param {Todo} todo
   */
  complete(todo) {
    todo.completed = !todo.completed;
    this.updateTodos();
  }
  edit(value, todo) {
	todo.title = value;
	this.updateTodos(); 
  }
  clearCompleted() {
    this._model.clearCompleted();
    this.updateTodos();
  }
  /**
   * @param {Filter} filter
   */
  setFilter(filter) {
    this._model.filter = filter;
    this.updateTodos();
    this.updateFilters();
  }
  /**
   * @param {Array<Filter>} filters
   */
  setFilters(filters) {

  }
  completeAll() {
    this._model.completeAll(this.todoApp.allCompleted);
    this.updateTodos();
  }
  addTodo() {
    this._model.addTodo({
      title: this.todoApp.inputValue,
      completed: false
    });
    this.updateTodos();
    this.todoApp.clearInput();
  }
  /**
   * @param {Filter} filter
   */
  _createFilterItem(filter) {
    const listItem = new FilterListItem();
    listItem.filter = filter;
    listItem.selected = filter === this._model.filter;
    return listItem;
  }
  /**
   * @param {Todo} todo
   */
  _createTodoItem(todo) {
    const listItem = new TodoListItem();
    listItem.todo = todo;
    return listItem;
  }
}


