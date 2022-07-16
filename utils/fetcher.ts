export async function fetcher(url: string, data: any = undefined) {
  const response = await fetch(`${window.location.origin}/api${url}`, {
    method: data ? "POST" : "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}
