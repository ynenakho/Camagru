import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

const useInfiniteScroll = (callback: () => void, hasMore: boolean) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', debounce(handleScroll, 100));
    return () =>
      window.removeEventListener('scroll', debounce(handleScroll, 100));
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    if (!hasMore) {
      setIsFetching(false);
      return;
    }
    callback();
  }, [isFetching]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  };

  return [isFetching, setIsFetching] as const;
};

export default useInfiniteScroll;
