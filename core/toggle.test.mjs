// @ts-check

// @ts-ignore
const QUnit = window.QUnit;

import { Toggle } from "./toggle.mjs";
import { Button } from "./button.mjs";

QUnit.module("Toggle", hooks => {
  QUnit.test("toggle states", assert => {
    // Given
    const buttonC = new Button();
    buttonC.content = "123";
    const toggle = new Toggle();
    toggle.states = [
		{ value: "AAA", content: new Button() },
		{ value: "BBB", content: new Button() },
		{ value: "CCC", content: buttonC }
	];
    // When
    toggle.$element.click();
    toggle.$element.click();

    // Then
    assert.strictEqual(toggle.value, "CCC");
    assert.strictEqual(toggle.$element.innerText, "123");
  });
});