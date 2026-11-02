export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000";

export async function getData(
  url: string,
  params?: Record<string, string>,
  token?: string,
) {
  try {
    const cleanUrl = url.startsWith("/") ? url.slice(1) : url;
    let fullUrl = `${API_BASE_URL}/${cleanUrl}`;

    if (params && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams(params);
      fullUrl += `?${searchParams.toString()}`;
    }

    const headers: Record<string, string> = {};
    if (token && typeof token === "string" && token.trim() !== "") {
      headers["Authorization"] = `Bearer ${token.trim()}`;
    }

    const res = await fetch(fullUrl, {
      method: "GET",
      headers,
    });

    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error("Fetch error on GET", url, error);
    return null;
  }
}

export async function postData(
  url: string,
  payload: unknown,
  token?: string,
) {
  try {
    const cleanUrl = url.startsWith("/") ? url.slice(1) : url;
    const fullUrl = `${API_BASE_URL}/${cleanUrl}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token && typeof token === "string" && token.trim() !== "") {
      headers["Authorization"] = `Bearer ${token.trim()}`;
    }

    const res = await fetch(fullUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const errorMsg =
        data?.msg || data?.message || data?.error || "Failed to process request";
      return { error: true, message: errorMsg, data };
    }

    return { error: false, data: data?.data ?? data, message: data?.msg };
  } catch (error: unknown) {
    console.error("Fetch error on POST", url, error);
    const msg =
      error instanceof Error ? error.message : "Failed to post data";
    return { error: true, message: msg };
  }
}

export async function putData(
  url: string,
  payload: unknown,
  token?: string,
) {
  try {
    const cleanUrl = url.startsWith("/") ? url.slice(1) : url;
    const fullUrl = `${API_BASE_URL}/${cleanUrl}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token && typeof token === "string" && token.trim() !== "") {
      headers["Authorization"] = `Bearer ${token.trim()}`;
    }

    const res = await fetch(fullUrl, {
      method: "PUT",
      headers,
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const errorMsg =
        data?.msg || data?.message || data?.error || "Failed to process request";
      return { error: true, message: errorMsg, data };
    }

    return { error: false, data: data?.data ?? data, message: data?.msg };
  } catch (error: unknown) {
    console.error("Fetch error on PUT", url, error);
    const msg =
      error instanceof Error ? error.message : "Failed to update data";
    return { error: true, message: msg };
  }
}
