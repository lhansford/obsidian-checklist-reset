import { removeText } from "./removeText";
import { ChecklistResetSettings } from "./types";

export type SetAction = "check" | "uncheck";

const CHECK_REGEX = " \\[[^ ]\\])";
const UNCHECKED_REGEX = " \\[ \\])";
const LIST_ITEM_START_REGEX = "^[ \t]*\\d*"; // i.e. start of line, zero or more spaces, zero or more digits (for ordered lists)
const LIST_SYMBOLS = ["-", "*", "+", "."];

export function setChecklistItems(
  content: string,
  { deleteTextOnReset }: ChecklistResetSettings,
  action: SetAction = "uncheck"
): string {
  const newValue = action === "check" ? "[x]" : "[ ]";
  const checkboxRegex = action === "check" ? UNCHECKED_REGEX : CHECK_REGEX;

  return content
    .split("\n")
    .map((line) => {
      const matchedListSymbol = LIST_SYMBOLS.find((listSymbol) => {
        const regex = new RegExp(
          `${LIST_ITEM_START_REGEX}(\\${listSymbol}${checkboxRegex}`,
          "g"
        );
        if (regex.test(line)) {
          return listSymbol;
        }
      });

      if (matchedListSymbol) {
        let transformedLine = line;
        if (
          deleteTextOnReset &&
          deleteTextOnReset !== "" &&
          action === "uncheck"
        ) {
          transformedLine = removeText(line, deleteTextOnReset);
        }
        return transformedLine.replace(
          new RegExp(`(\\${matchedListSymbol}${checkboxRegex}`, "g"),
          `${matchedListSymbol} ${newValue}`
        );
      }

      return line;
    })
    .join("\n");
}
