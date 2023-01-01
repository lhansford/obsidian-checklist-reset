const CHECK_REGEX = " \\[.{1}\\])";
const LIST_SYMBOLS = ["-", "*"];

export function resetChecklistItems(content: string): string {
  return LIST_SYMBOLS.reduce((value, listSymbol) => {
    const regex = new RegExp(`(\\${listSymbol}${CHECK_REGEX}`, "g");
    console.log(regex);
    return value.replaceAll(regex, `${listSymbol} [ ]`);
  }, content);
}
