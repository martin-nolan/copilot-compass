import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMonthYear(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
}

export function daysSince(value: string | number) {
  const target = typeof value === "number" ? value : new Date(`${value}T00:00:00`).getTime();
  return Math.floor((Date.now() - target) / (1000 * 60 * 60 * 24));
}

export function getHostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function renderSimpleMarkdown(input: string) {
  return input
    .split("\n")
    .map((line) => line.trimEnd())
    .filter(Boolean)
    .map((line, index) => {
      const html = line
        .replace(
          /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g,
          '<a href="$2" target="_blank" rel="noopener" class="text-amber underline underline-offset-4">$1</a>',
        )
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>");

      if (line.startsWith("- ")) {
        return `<div class="flex gap-2"><span class="text-amber">•</span><span>${html.slice(2)}</span></div>`;
      }

      return `<p key="${index}">${html}</p>`;
    })
    .join("");
}
