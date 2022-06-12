// @ts-check

// @ts-ignore
const QUnit = window.QUnit !== undefined ? window.QUnit : undefined;

import { Dropdown, Option } from "./dropdown.mjs";

QUnit.module("Dropdown", hooks => {
  QUnit.test("change", assert => {
    // Given
    const optionA = new Option();
    optionA.value = "AAA";
    optionA.content = "Aaa";
    const optionB = new Option();
    optionB.value = "BBB";
    optionB.content = "Bbb";
    const dropdown = new Dropdown();
    dropdown.options = [optionA, optionB];
    let selected = false;
    dropdown.onEvent(Dropdown.SELECT_EVENT_KEY, () => selected = true);
    // When
   	dropdown.value = "BBB";
   	dropdown.$element.dispatchEvent(new Event('change'));
    // Then
    assert.true(selected);
    assert.strictEqual(dropdown.value, "BBB");
  });
});