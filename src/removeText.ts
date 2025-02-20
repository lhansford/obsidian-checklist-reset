export function removeText(text: string, pattern?: string): string {
  if (!pattern || pattern === "") {
    return text;
  }
  // TODO: Move this up somewhere so it's not repeated every call
  const match = pattern.match(new RegExp('^/(.*?)/([gimy]*)$'));
  const regex = match ? new RegExp(match[1], match[2]) : pattern;
  return text.replaceAll(regex, "");
}
