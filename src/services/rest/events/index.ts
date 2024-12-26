import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_EVENTS_API_URL!;

export const eventsApi = axios.create({
  baseURL: BASE_URL
});

export const fetchEventsApiData = async <T>(req: string): Promise<T> => {
  const res = await eventsApi.get<T>(req);
  return res.data;
};

export default eventsApi;

type CacheEntry = {
  data: any;
  timestamp: number;
};

const cache: Map<string, CacheEntry> = new Map();
const CACHE_TTL = 5 * 60 * 1000; // Cache time-to-live in milliseconds (e.g., 5 minutes)

export async function cachedEventsApi(
  url: string,
  options?: AxiosRequestConfig
): Promise<any> {
  const cacheKey = JSON.stringify({ url, options });

  const cachedResponse = cache.get(cacheKey);
  const now = Date.now();

  if (cachedResponse && now - cachedResponse.timestamp < CACHE_TTL) {
    return Promise.resolve(cachedResponse.data);
  }

  const response: AxiosResponse = await eventsApi(url, options);
  const data = response.data;

  cache.set(cacheKey, { data, timestamp: now });

  return data;
}
