import { useState, useCallback } from 'react';

export function useRefreshHandler(refreshFn: () => Promise<void> | void) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refreshFn();
    } finally {
      setRefreshing(false);
    }
  }, [refreshFn]);

  return [refreshing, handleRefresh] as const;
} 