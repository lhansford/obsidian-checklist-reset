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
      it("Should return the text with no changes", () => {
        expect(setChecklistItems("- [ ]", true)).toBe("- [x]");
        expect(setChecklistItems("* [ ]", true)).toBe("* [x]");
        expect(setChecklistItems("+ [ ]", true)).toBe("+ [x]");
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
      });
    });
  });
});
