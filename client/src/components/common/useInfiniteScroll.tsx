import { useState, useEffect } from 'react';
import { throttle } from 'lodash';

const useInfiniteScroll = (callback: () => void, hasMore: boolean) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  };

  useEffect(() => {
    const throttledHandleScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    if (!hasMore) {
      setIsFetching(false);
      return;
    }
    callback();
  }, [isFetching, hasMore]);

  return [isFetching, setIsFetching] as const;
};

export default useInfiniteScroll;
