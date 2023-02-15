import { getPreferenceValues } from "@raycast/api";

export interface Preferences {
  instance: string;
  token: string;
  linktextformat: string;
}

String.prototype.interpolate = function (params) {
  const names = Object.keys(params);
  const vals = Object.values(params);
  return new Function(...names, `return \`${this}\`;`)(...vals);
};

export function formatString(template, params) {
  return template.interpolate(params);
}

export function getRocketLink(issue) {
  const preferences = getPreferenceValues<Preferences>();
  const linkText = formatString(preferences.linktextformat, { key: issue.key, summary: issue.fields.summary });
  return `<${preferences.instance}/browse/${issue.key}|${linkText}>`;
}

export function getMarkdownLink(issue) {
  const preferences = getPreferenceValues<Preferences>();
  const linkText = formatString(preferences.linktextformat, { key: issue.key, summary: issue.fields.summary });
  return `[${linkText}](${preferences.instance}/browse/${issue.key})`;
}
