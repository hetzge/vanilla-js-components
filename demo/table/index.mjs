// @ts-check

import * as core from "../../core/index.mjs";
import * as advanced from "../../advanced/index.mjs";

class TableApp extends core.BaseContainer {
  constructor() {
    super("div");
    const table = new advanced.AdvancedTable();
    table.columns = [
      {
        key: "A",
        headerFactory: () => "Test",
        cellFactory: row => row["a"]
      }
    ]
    table.data = {
      total: 500,
      rows: [
        { a: 123 }
      ]
    }
    this.content = table;
    this.onEvent(advanced.AdvancedTable.LOAD_EVENT, (table) => {
      console.log(table.request);
    });
  }
}

export default function main() {
  document.body.append(new TableApp().$element);
}