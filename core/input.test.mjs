// @ts-check

// @ts-ignore
const QUnit = window.QUnit;

import { IntegerInput, TextInput, Checkbox } from "./input.mjs";

QUnit.module("TextInput", hooks => {
  QUnit.test("value", assert => {
    // Given
    const input = new TextInput();
    // When
    input.value = "abc123";
    // Then
    assert.strictEqual(input.value, "abc123");
  });
});
QUnit.module("IntegerInput", hooks => {
  QUnit.test("value", assert => {
    // Given
    const input = new IntegerInput();
    // When
    input.value = 12345;
    // Then
    assert.strictEqual(input.value, 12345);
  });
});
QUnit.module("Checkbox", hooks => {
  QUnit.test("value", assert => {
    // Given
    const input = new Checkbox();
    // When
    input.value = true;
    // Then
    assert.strictEqual(input.value, true);
  });
  QUnit.test("click", assert => {
    // Given
    const input = new Checkbox();
    // When
    input.$element.click();
    // Then
    assert.strictEqual(input.value, true);
  });
});