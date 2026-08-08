import DOMPurify from "dompurify";

const ALLOWED_TAGS = [
  "p", "br", "strong", "em", "u", "s", "h1", "h2", "h3", "h4", "h5", "h6",
  "ul", "ol", "li", "a", "img", "blockquote", "span", "div",
];
const ALLOWED_ATTR = ["href", "src", "alt", "target", "rel", "style", "class"];

/** Client-only — mirrors the old rmm-frontend utils/helpers.ts::sanitizeHTML(). */
export function sanitizeHTML(html: string): string {
  if (typeof window === "undefined") return html;
  return DOMPurify.sanitize(html, { ALLOWED_TAGS, ALLOWED_ATTR });
}
