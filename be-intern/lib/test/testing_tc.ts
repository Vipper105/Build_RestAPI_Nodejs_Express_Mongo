import { helloTest, Calculator } from "../test/testing";
import { expect } from "chai";
import "mocha";

describe("First test", () => {
  it("should return true", () => {
    const result = helloTest();
    expect(result).to.equal(true);
  });
});

describe("Add two number", () => {
  it("should return sum of two number", () => {
    let calculator = new Calculator();
    const sum = calculator.add(5);
    expect(sum).to.equal(5);
  });
});
