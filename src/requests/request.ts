export async function request<T>(
  url: string,
  method: 'GET' | 'POST' = 'GET',
  body?: unknown,
): Promise<T> {
  try {
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorData = (await response.json()) as { message: string };
      throw new Error(`Error: ${response.status} - ${errorData.message || response.statusText}`);
    }

    return (await response.json()) as Promise<T>;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}
