import showdown from "showdown";
import { parse } from "node-html-parser";

const NEW_BADGE_MARKER = "<@&1423008037517660282>";
const NEW_BADGE_HTML = '<span class="bg-yellow-500 px-[8px] py-[1px] text-black font-bold rounded-xl">new!</span>';

interface CardData {
  title: string;
  content: string;
}

export function processContent(content: string): CardData[] {
  const sections = content.split('---').map((item) => item.trim());

  // First item is introduction section for Discord, we remove it
  // for the website, because the introduction is already on there.
  sections.splice(0, 1);

  const markdownConverter = new showdown.Converter({
    disableForced4SpacesIndentedSublists: true,
  });

  return sections
    .map((section) => section.replaceAll(NEW_BADGE_MARKER, NEW_BADGE_HTML))
    .map((section) => markdownConverter.makeHtml(section))
    .map((html) => modifyContentHtml(html));
}

function modifyContentHtml(html: string): CardData {
  const parsedHtml = parse(html);

  // Make all links open new tab
  parsedHtml.querySelectorAll("a").forEach((link) => {
    link.setAttribute("target", "_blank");
  });

  // Extract title
  const title = parsedHtml.querySelector("h3")?.text || "";

  // Assign searchable text to each list item
  const listItemsSortedByDepth = parsedHtml
    .querySelectorAll("li")
    .sort((a, b) => getNodeDepth(b as unknown as Node) - getNodeDepth(a as unknown as Node));

  listItemsSortedByDepth.forEach((listItem) => {
    const clonedNode = listItem.clone() as unknown as HTMLElement;
    clonedNode.querySelectorAll("[data-searchable]").forEach((item) => item.remove());
    const searchableText = clonedNode.textContent || '';
    listItem.setAttribute("data-searchable", searchableText);
  });

  return {
    content: parsedHtml.toString(),
    title: title,
  };
}

function getNodeDepth(element: Node): number {
  let depth = 0;
  let currentElement = element;
  while (currentElement.parentNode !== null) {
    depth++;
    currentElement = currentElement.parentNode as Node;
  }
  return depth;
}