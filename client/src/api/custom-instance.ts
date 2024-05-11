export const customInstance = async <T>({
  url,
  method,
  params,
  data,
}: {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  params?: any;
  data?: unknown;
  responseType?: string;
}): Promise<T> => {
  const response = await fetch(`${url}` + new URLSearchParams(params), {
    method,
    ...(data ? { body: JSON.stringify(data) } : {}),
  });

  return response.json();
};

export default customInstance;
