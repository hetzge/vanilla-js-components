// @ts-check

// @ts-ignore
const QUnit = window.QUnit;

import { BaseContainer } from "./base-container.mjs";

QUnit.module("BaseContainer", hooks => {
  QUnit.test("content string", assert => {
    // Given
    const container = new BaseContainer("div");
    // When
    container.content = "TEST123";
    // Then
    assert.strictEqual(container.$element.outerHTML, "<div>TEST123</div>");
  });
  QUnit.test("content Array<string>", assert => {
    // Given
    const container = new BaseContainer("div");
    // When
    container.content = ["TEST123","BBB"];
    // Then
    assert.strictEqual(container.$element.outerHTML, "<div>TEST123BBB</div>");
  });
  QUnit.test("content $element", assert => {
    // Given
    const container = new BaseContainer("div");
    // When
    container.content = document.createElement("span");
    // Then
    assert.strictEqual(container.$element.outerHTML, "<div><span></span></div>");
  });
  QUnit.test("content Array<$element>", assert => {
    // Given
    const container = new BaseContainer("div");
    // When
    container.content = [document.createElement("span"), document.createElement("button")];
    // Then
    assert.strictEqual(container.$element.outerHTML, "<div><span></span><button></button></div>");
  });
  QUnit.test("content Component", assert => {
    // Given
    const container = new BaseContainer("div");
    // When
    container.content = new BaseContainer("span");
    // Then
    assert.strictEqual(container.$element.outerHTML, "<div><span></span></div>");
  });
  QUnit.test("content Array<Component>", assert => {
    // Given
    const container = new BaseContainer("div");
    // When
    container.content = [new BaseContainer("span"), new BaseContainer("button")];
    // Then
    assert.strictEqual(container.$element.outerHTML, "<div><span></span><button></button></div>");
  });
});