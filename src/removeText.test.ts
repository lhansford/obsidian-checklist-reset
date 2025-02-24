import { describe, it, expect } from "vitest";

import { removeText } from "./removeText";

describe('removeText', () => {
  describe('With a regex', () => {
    it('should remove all instances of the regex', () => {
      const text = 'Hello, World!';
      const result = removeText(text, /l{2}/g);
      expect(result).toBe('Heo, World!');
    });
  });

  describe('With a string', () => {
    it('should remove all instances of the string', () => {
      const text = 'Hello, World!';
      const string = 'o';
      const result = removeText(text, string);
      expect(result).toBe('Hell, Wrld!');
    });
  });

  describe('With an empty string', () => {
    it('should return the original text', () => {
      const text = 'Hello, World!';
      const result = removeText(text, '');
      expect(result).toBe(text);
    });
  });
});
