import { useState, useEffect, useCallback } from 'react';
import { throttle } from 'lodash';

const useInfiniteScroll = (callback: () => void, hasMore: boolean) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching ||
      !hasMore
    )
      return;
    setIsFetching(true);
  }, [isFetching, hasMore]);

  useEffect(() => {
    const throttledHandleScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching]); // eslint-disable-line react-hooks/exhaustive-deps

  return [isFetching, setIsFetching] as const;
};

export default useInfiniteScroll;
