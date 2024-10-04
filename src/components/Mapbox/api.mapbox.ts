export type FetchQueryT<T, P> = (params: T) => Promise<
  | P
  | {
      isError: boolean;
      error: unknown;
    }
>;
export const searchWithText: FetchQueryT<
  { text: string; config: MapboxT.SearchConfig },
  MapboxT.SearchResponse
> = async ({ text, config }) => {
  const params = new URLSearchParams({
    q: text,
    language: config.language || 'en',
    country: config.country || 'vn',
    types: config.types || 'region,place,postcode,locality,neighborhood',
    session_token: '0dd2ad76-38f2-4bb1-8925-6792a4c05456',
    access_token: config.access_token,
  });

  try {
    const res = await fetch(
      `https://api.mapbox.com/search/geocode/v6/forward?${params.toString()}`,
    );
    return await res.json();
  } catch (error) {
    return {
      isError: true,
      error,
    };
  }
};
