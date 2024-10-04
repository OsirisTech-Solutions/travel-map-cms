import React from 'react';
import { searchWithText } from '../api.mapbox';
// defind type search function
const useSearch = (config: MapboxT.SearchConfig) => {
  const [data, setData] = React.useState<MapboxT.SearchResponse | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<
    | {
        isError: boolean;
        error: unknown;
      }
    | undefined
  >(undefined);
  const search = async (value: string) => {
    setIsLoading(true);
    const res = await searchWithText({ text: value, config });

    setIsLoading(false);
    if ('isError' in res) {
      setError(res.error as any);
      return;
    }
    setData(res);
    return res;
  };

  return {
    search,
    data,
    isLoading,
    error,
  };
};

export default useSearch;
