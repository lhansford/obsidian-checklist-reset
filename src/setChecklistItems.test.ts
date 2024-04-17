import { setChecklistItems } from "./setChecklistItems";

describe("setChecklistItems", () => {
  describe("When setting items to unchecked", () => {
    describe("With text with no checklist items", () => {
      it("Should return the text with no changes", () => {
        expect(setChecklistItems("abc123")).toBe("abc123");
        expect(setChecklistItems("a-b[ ]c123")).toBe("a-b[ ]c123");
      });
    });

    describe("With text with unchecked checklist items", () => {
      it("Should return the text with no changes", () => {
        expect(setChecklistItems("- [ ]")).toBe("- [ ]");
        expect(setChecklistItems("* [ ]")).toBe("* [ ]");
        expect(setChecklistItems("+ [ ]")).toBe("+ [ ]");
        expect(setChecklistItems("0. [ ]")).toBe("0. [ ]");
        expect(setChecklistItems("1. [ ]")).toBe("1. [ ]");
        expect(setChecklistItems("10. [ ]")).toBe("10. [ ]");
      });
    });

    describe("With text with checked checklist items", () => {
      it("Should return the text with the checklist items unchecked", () => {
        expect(setChecklistItems("- [x]")).toBe("- [ ]");
        expect(setChecklistItems("* [x]")).toBe("* [ ]");
        expect(setChecklistItems("+ [x]")).toBe("+ [ ]");
        expect(setChecklistItems("- [?]")).toBe("- [ ]");
        expect(setChecklistItems("- [X]")).toBe("- [ ]");
        expect(setChecklistItems("- [/]")).toBe("- [ ]");
        expect(setChecklistItems("- [+]")).toBe("- [ ]");
        expect(setChecklistItems("0. [x]")).toBe("0. [ ]");
        expect(setChecklistItems("1. [x]")).toBe("1. [ ]");
        expect(setChecklistItems("10. [x]")).toBe("10. [ ]");
      });
    });
  });

  describe("When setting items to checked", () => {
    describe("With text with no checklist items", () => {
      it("Should return the text with no changes", () => {
        expect(setChecklistItems("abc123", true)).toBe("abc123");
        expect(setChecklistItems("a-b[ ]c123", true)).toBe("a-b[ ]c123");
      });
    });

    describe("With text with unchecked checklist items", () => {
      it("Should return the text with items checked", () => {
        expect(setChecklistItems("- [ ]", true)).toBe("- [x]");
        expect(setChecklistItems("* [ ]", true)).toBe("* [x]");
        expect(setChecklistItems("+ [ ]", true)).toBe("+ [x]");
        expect(setChecklistItems("0. [ ]", true)).toBe("0. [x]");
        expect(setChecklistItems("1. [ ]", true)).toBe("1. [x]");
        expect(setChecklistItems("10. [ ]", true)).toBe("10. [x]");
      });
    });

    describe("With text with checked checklist items", () => {
      it("Should return the text with the checklist items unchanged", () => {
        expect(setChecklistItems("- [x]", true)).toBe("- [x]");
        expect(setChecklistItems("* [x]", true)).toBe("* [x]");
        expect(setChecklistItems("+ [x]", true)).toBe("+ [x]");
        expect(setChecklistItems("- [?]", true)).toBe("- [?]");
        expect(setChecklistItems("- [X]", true)).toBe("- [X]");
        expect(setChecklistItems("- [/]", true)).toBe("- [/]");
        expect(setChecklistItems("- [+]", true)).toBe("- [+]");
        expect(setChecklistItems("0. [x]", true)).toBe("0. [x]");
        expect(setChecklistItems("1. [x]", true)).toBe("1. [x]");
        expect(setChecklistItems("10. [x]", true)).toBe("10. [x]");
      });
    });
  });
});
