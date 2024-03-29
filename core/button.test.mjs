// @ts-check

// @ts-ignore
const QUnit = window.QUnit;

import { Button } from "./button.mjs";

QUnit.module("Button", hooks => {
  QUnit.test("click event", assert => {
    // Given
    const button = new Button();
    let clicked = false;
    button.onEvent(Button.CLICK_EVENT, () => clicked = true);
    // When
    button.$element.click();
    // Then
    assert.true(clicked);
  });
});