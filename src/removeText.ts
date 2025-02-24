export function removeText(text: string, pattern: string | RegExp): string {
  return text.replaceAll(pattern, "");
}
