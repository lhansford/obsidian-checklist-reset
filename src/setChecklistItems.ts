const CHECK_REGEX = " \\[.{1}\\])";
const UNCHECKED_REGEX = " \\[ \\])";
const LIST_SYMBOLS = ["-", "*", "+"];

export function setChecklistItems(content: string, checked = false): string {
  const newValue = checked ? '[x]' : '[ ]'
  const checkboxRegex = checked ? UNCHECKED_REGEX : CHECK_REGEX;

  return LIST_SYMBOLS.reduce((value, listSymbol) => {
    const regex = new RegExp(`(\\${listSymbol}${checkboxRegex}`, "g");
    return value.replaceAll(regex, `${listSymbol} ${newValue}`);
  }, content);
}
