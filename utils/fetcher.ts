import { ContentfulSearchResult } from "types/ContentfulSearch";

export async function fetcher(url: string, data = undefined) {
  const response = await fetch(`${window.location.origin}/api${url}`, {
    method: data ? "POST" : "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData: ContentfulSearchResult = await response.json();
  return responseData;
}
