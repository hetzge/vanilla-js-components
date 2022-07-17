// @ts-check

// @ts-ignore
const QUnit = window.QUnit !== undefined ? window.QUnit : undefined;

import { Dropdown } from "./dropdown.mjs";

QUnit.module("Dropdown", hooks => {
  QUnit.test("change", assert => {
    // Given
    const dropdown = new Dropdown();
    dropdown.options = [
      { value: "AAA", text: "Aaa" },
      { value: "BBB", text: "Bbb" },
    ];
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