// @ts-check

// @ts-ignore
const QUnit = window.QUnit;

import { SidebarLayout } from "./layout.mjs";

QUnit.module("SidebarLayout", hooks => {
  QUnit.test("left", assert => {
    // Given
    const layout = new SidebarLayout();
    layout.side.content = "123";
    layout.main.content = "ABC";
    // When
    layout.orientation = "left";
    // Then
    assert.strictEqual(layout.$element.innerText, "123ABC");
  });
  QUnit.test("right", assert => {
    // Given
    const layout = new SidebarLayout();
    layout.side.content = "123";
    layout.main.content = "ABC";
    // When
    layout.orientation = "right";
    // Then
    assert.strictEqual(layout.$element.innerText, "ABC123");
  });
});