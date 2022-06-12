// @ts-check

// @ts-ignore
const QUnit = window.QUnit !== undefined ? window.QUnit : undefined;

import Table from "./table.mjs";

QUnit.module("Table", hooks => {
  QUnit.test("columns", assert => {
    // Given
    const table = new Table();
    // When
    table.columns = [
      {
        headFactory: column => "123",
        cellFactory: row => ""
      },
      {
        headFactory: column => "abc",
        cellFactory: row => ""
      }
    ];
    // Then
    assert.strictEqual(table.$element.outerHTML, "<table><thead><tr><th>123</th><th>abc</th></tr></thead><tbody></tbody></table>");
  });
  QUnit.test("rows", assert => {
    // Given
    const table = new Table();
    table.columns = [
      {
        headFactory: column => "123",
        cellFactory: row => row.toUpperCase()
      },
      {
        headFactory: column => "abc",
        cellFactory: row => row.toLowerCase()
      }
    ];
    // When
    table.rows = [
      "Abc", "123"
    ];
    // Then
    assert.strictEqual(table.$element.outerHTML, "<table><thead><tr><th>123</th><th>abc</th></tr></thead><tbody><tr><td>ABC</td><td>abc</td></tr><tr><td>123</td><td>123</td></tr></tbody></table>");
  });
});