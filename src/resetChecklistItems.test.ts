import { resetChecklistItems } from "./resetChecklistItems";

describe("resetChecklistItems", () => {
  describe("With text with no checklist items", () => {
    it("Should return the text with no changes", () => {
      expect(resetChecklistItems("abc123")).toBe("abc123");
      expect(resetChecklistItems("a-b[ ]c123")).toBe("a-b[ ]c123");
    });
  });

  describe("With text with unchecked checklist items", () => {
    it("Should return the text with no changes", () => {
      expect(resetChecklistItems("- [ ]")).toBe("- [ ]");
      expect(resetChecklistItems("* [ ]")).toBe("* [ ]");
      expect(resetChecklistItems("+ [ ]")).toBe("+ [ ]");
    });
  });

  describe("With text with checked checklist items", () => {
    it("Should return the text with the checklist items unchecked", () => {
      expect(resetChecklistItems("- [x]")).toBe("- [ ]");
      expect(resetChecklistItems("* [x]")).toBe("* [ ]");
      expect(resetChecklistItems("+ [x]")).toBe("+ [ ]");
      expect(resetChecklistItems("- [?]")).toBe("- [ ]");
      expect(resetChecklistItems("- [X]")).toBe("- [ ]");
      expect(resetChecklistItems("- [/]")).toBe("- [ ]");
      expect(resetChecklistItems("- [+]")).toBe("- [ ]");
    });
  });
});
