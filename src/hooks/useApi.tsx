import { useCallback, useState } from "react";
import axios, { AxiosResponse } from "axios";

const buildstring = (url: string, params?: object): string => {
  if (!params) return url;
  const keys = Object.keys(params);
  let final = url;

  for (const k of keys) {
    final = final.replace(`{:${k}}`, params[k as keyof typeof params]);
  }

  return final;
};

export function useApi<T, K>({ url, method }: { url: string; method: string }) {
  const [data, setData] = useState<K | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (args?: T) => {
    try {
      setError(null);
      setIsPending(true);

      if (args) {
        const finalUrl = buildstring(url, args);

        let res: AxiosResponse<K, unknown, unknown>;

        if (
          method.toLowerCase() === "get" ||
          method.toLowerCase() === "delete"
        ) {
          res = await axios.request<K>({
            method,
            url: `/api${finalUrl}`,
          });
        } else {
          res = await axios.request<K>({
            method,
            url: `/api${finalUrl}`,
            data: args,
          });
        }

        setData(res.data);
      } else {
        const res = await axios.request<K>({
          method,
          url: `/api${url}`,
        });

        setData(res.data);
      }
    } catch (err: unknown) {
      setError(err as string);
    } finally {
      setIsPending(false);
    }
  }, []);

  return { data, isPending, execute, error };
}
