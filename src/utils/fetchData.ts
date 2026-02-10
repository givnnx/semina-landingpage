export async function getData(url: string, params?: any) {
  // In a real app, this would be an absolute URL or use a proxy.
  // For this replication, we might need to mock it or point to the original API if accessible.
  // Assuming the original project used a relative path proxying to somewhere,
  // but looking at `getServerSideProps` in original: `getData('api/v1/events')`.
  // If we don't have the backend, we might need mock data.
  // For now, I'll keep the structure but we might need to adjust the base URL.

  // Since this is a replication of FE only and I don't have the backend running,
  // I should probably mock this or ask the user.
  // However, the original code used axios. I'll use fetch.

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/${url}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${params}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function postData(url: string, payload: any) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/${url}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    if (!res.ok) {
      throw new Error("Failed to post data");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return { error: true, message: "Failed to post data" };
  }
}
