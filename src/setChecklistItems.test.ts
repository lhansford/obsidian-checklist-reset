import { describe, it, expect } from "vitest";

import { setChecklistItems } from "./setChecklistItems";

const DEFAULT_SETTINGS = { deleteTextOnReset: "" };

describe("setChecklistItems", () => {
  describe("With multiple line breaks", () => {
    it("Retains the current line breaks", () => {
      expect(setChecklistItems("- [x] a\n\nb\n", DEFAULT_SETTINGS)).toBe("- [ ] a\n\nb\n");
    });
  });

  describe("When setting items to unchecked", () => {
    describe("With text with no checklist items", () => {
      it("Should return the text with no changes", () => {
        expect(setChecklistItems("abc123", DEFAULT_SETTINGS)).toBe("abc123");
        expect(setChecklistItems("a-b[ ]c123", DEFAULT_SETTINGS)).toBe(
          "a-b[ ]c123"
        );
      });

      describe("With a value set for deleteTextOnReset", () => {
        it("Should return the text with no changes", () => {
          expect(
            setChecklistItems("abc123", { deleteTextOnReset: "123" })
          ).toBe("abc123");
          expect(
            setChecklistItems("a-b[ ]c123", { deleteTextOnReset: "123" })
          ).toBe("a-b[ ]c123");
        });
      });
    });

    describe("With text with unchecked checklist items", () => {
      it("Should return the text with no changes", () => {
        expect(setChecklistItems("- [ ]", DEFAULT_SETTINGS)).toBe("- [ ]");
        expect(setChecklistItems("* [ ]", DEFAULT_SETTINGS)).toBe("* [ ]");
        expect(setChecklistItems("+ [ ]", DEFAULT_SETTINGS)).toBe("+ [ ]");
        expect(setChecklistItems("0. [ ]", DEFAULT_SETTINGS)).toBe("0. [ ]");
        expect(setChecklistItems("1. [ ]", DEFAULT_SETTINGS)).toBe("1. [ ]");
        expect(setChecklistItems("10. [ ]", DEFAULT_SETTINGS)).toBe("10. [ ]");
      });

      describe("With a value set for deleteTextOnReset", () => {
        it("Should return the text with no changes", () => {
          expect(setChecklistItems("- [ ] hello world", { deleteTextOnReset: 'hello' })).toBe("- [ ] hello world");
        });
      });
    });

    describe("With text with checked checklist items", () => {
      it("Should return the text with the checklist items unchecked", () => {
        expect(setChecklistItems("- [x]", DEFAULT_SETTINGS)).toBe("- [ ]");
        expect(setChecklistItems("* [x]", DEFAULT_SETTINGS)).toBe("* [ ]");
        expect(setChecklistItems("+ [x]", DEFAULT_SETTINGS)).toBe("+ [ ]");
        expect(setChecklistItems("- [?]", DEFAULT_SETTINGS)).toBe("- [ ]");
        expect(setChecklistItems("- [X]", DEFAULT_SETTINGS)).toBe("- [ ]");
        expect(setChecklistItems("- [/]", DEFAULT_SETTINGS)).toBe("- [ ]");
        expect(setChecklistItems("- [+]", DEFAULT_SETTINGS)).toBe("- [ ]");
        expect(setChecklistItems("0. [x]", DEFAULT_SETTINGS)).toBe("0. [ ]");
        expect(setChecklistItems("1. [x]", DEFAULT_SETTINGS)).toBe("1. [ ]");
        expect(setChecklistItems("10. [x]", DEFAULT_SETTINGS)).toBe("10. [ ]");
        expect(setChecklistItems("  10. [x] also dont remove checks later on - [x] ?", DEFAULT_SETTINGS)).toBe("  10. [ ] also dont remove checks later on - [x] ?");
      });

      describe("With a value set for deleteTextOnReset", () => {
        it("Should return the text with the checklist items unchecked and the text removed", () => {
          expect(setChecklistItems("- [x] hello world", { deleteTextOnReset: 'hello' })).toBe("- [ ]  world");
          // eslint-disable-next-line no-useless-escape
          expect(setChecklistItems("- [x] Do that thing ✅ 2025-02-16 (Some extra thing at the end)", { deleteTextOnReset: "/ ✅ \\d{4}-\\d{2}-\\d{2}.*/g" })).toBe("- [ ] Do that thing");
          // eslint-disable-next-line no-useless-escape
          expect(setChecklistItems("- [x] Do that thing ✅ 2025-02-16 (Some extra thing at the end)", { deleteTextOnReset: "/ ✅ \\d{4}-\\d{2}-\\d{2}/g" })).toBe("- [ ] Do that thing (Some extra thing at the end)");
        });
      });
    });
  });

  describe("When setting items to checked", () => {
    describe("With text with no checklist items", () => {
      it("Should return the text with no changes", () => {
        expect(setChecklistItems("abc123", DEFAULT_SETTINGS, 'check')).toBe(
          "abc123"
        );
        expect(setChecklistItems("a-b[ ]c123", DEFAULT_SETTINGS, 'check')).toBe(
          "a-b[ ]c123"
        );
      });
    });

    describe("With text with unchecked checklist items", () => {
      it("Should return the text with items checked", () => {
        expect(setChecklistItems("- [ ]", DEFAULT_SETTINGS, 'check')).toBe(
          "- [x]"
        );
        expect(setChecklistItems("* [ ]", DEFAULT_SETTINGS, 'check')).toBe(
          "* [x]"
        );
        expect(setChecklistItems("+ [ ]", DEFAULT_SETTINGS, 'check')).toBe(
          "+ [x]"
        );
        expect(setChecklistItems("0. [ ]", DEFAULT_SETTINGS, 'check')).toBe(
          "0. [x]"
        );
        expect(setChecklistItems("1. [ ]", DEFAULT_SETTINGS, 'check')).toBe(
          "1. [x]"
        );
        expect(setChecklistItems("10. [ ]", DEFAULT_SETTINGS, 'check')).toBe(
          "10. [x]"
        );
      });
    });

    describe("With text with checked checklist items", () => {
      it("Should return the text with the checklist items unchanged", () => {
        expect(setChecklistItems("- [x]", DEFAULT_SETTINGS, 'check')).toBe(
          "- [x]"
        );
        expect(setChecklistItems("* [x]", DEFAULT_SETTINGS, 'check')).toBe(
          "* [x]"
        );
        expect(setChecklistItems("+ [x]", DEFAULT_SETTINGS, 'check')).toBe(
          "+ [x]"
        );
        expect(setChecklistItems("- [?]", DEFAULT_SETTINGS, 'check')).toBe(
          "- [?]"
        );
        expect(setChecklistItems("- [X]", DEFAULT_SETTINGS, 'check')).toBe(
          "- [X]"
        );
        expect(setChecklistItems("- [/]", DEFAULT_SETTINGS, 'check')).toBe(
          "- [/]"
        );
        expect(setChecklistItems("- [+]", DEFAULT_SETTINGS, 'check')).toBe(
          "- [+]"
        );
        expect(setChecklistItems("0. [x]", DEFAULT_SETTINGS, 'check')).toBe(
          "0. [x]"
        );
        expect(setChecklistItems("1. [x]", DEFAULT_SETTINGS, 'check')).toBe(
          "1. [x]"
        );
        expect(setChecklistItems("10. [x]", DEFAULT_SETTINGS, 'check')).toBe(
          "10. [x]"
        );
      });
    });
  });
});
