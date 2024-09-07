import Mark from "mark.js";

function hideSearchable(element: HTMLElement) {
  element.classList.add("search-hidden");
}

function showSearchable(element: HTMLElement) {
  element.classList.remove("search-hidden");
}

function hideAllSearchable() {
  document.querySelectorAll("[data-searchable]")
    .forEach((element) => {
      hideSearchable(element as HTMLElement);
    });
}

function showAllSearchable() {
  document.querySelectorAll("[data-searchable]")
    .forEach((element) => {
      showSearchable(element as HTMLElement);
    });
}

function toggleNoResults(isVisible: boolean) {
  const noResultsElement = document.querySelector("#no-results")!;
  if (isVisible) {
    noResultsElement.classList.remove("hidden");
  } else {
    noResultsElement.classList.add("hidden");
  }
}

function unmarkAll() {
  new Mark('[data-searchable]').unmark();
}

function doSearch(query: string) {
  query = query.trim();
  unmarkAll();

  if (query === "") {
    toggleNoResults(false);
    showAllSearchable();
    return;
  }

  const words = query
    .replaceAll(/\s+/g, " ")
    .split(" ")
    .map((word) => word.toLocaleLowerCase());

  // 1. Hide all searchable elements
  hideAllSearchable();

  // 2. Show elements that match the query
  document.querySelectorAll(`[data-searchable]`)
    .forEach((element) => {
      const searchableText = (element.getAttribute("data-searchable") || "").toLowerCase();
      for (const word of words) {
        if (searchableText.includes(word)) {
          showSearchable(element as HTMLElement);
          break;
        }
      }
    });

  // 3. Show child searchable elements of parent elements that match the query
  document.querySelectorAll(`[data-searchable]:not(.search-hidden)`)
    .forEach((element) => {
      element.querySelectorAll("[data-searchable]")
        .forEach((childElement) => {
          showSearchable(childElement as HTMLElement);
        });
    });

  // 4. Show parent searchable elements of child elements that match the query
  document.querySelectorAll(`[data-searchable]:not(.search-hidden)`)
    .forEach((element) => {
      let currentElement = element;
      while (currentElement.parentNode !== null) {
        showSearchable(currentElement as HTMLElement);
        currentElement = currentElement.parentNode as HTMLElement;
      }
    });

  // 5. Check if there are any elements found and show the no-results element if not
  const foundElements = document.querySelectorAll("[data-searchable]:not(.search-hidden)");

  // 6. Mark the found elements
  new Mark('[data-searchable]:not(.search-hidden)').mark(query);
  toggleNoResults(foundElements.length === 0);
}

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('input#search-input') as HTMLInputElement;

  searchInput.addEventListener('input', async (event) => {
    const query = searchInput.value;
    doSearch(query);
  });
});