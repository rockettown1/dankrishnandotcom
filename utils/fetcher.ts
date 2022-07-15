export async function fetcher(url: string, data: any = undefined) {
  const response = await fetch(`${window.location.origin}/api${url}`, {
    method: data ? "POST" : "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  return responseData;
}
