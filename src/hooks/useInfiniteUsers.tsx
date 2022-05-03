import { useCallback, useEffect, useState } from 'react';
import { trpc } from 'utils/trpc';
import useDebounce from './useDebounce';

export const useInfiniteUsers = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [firstElementIndex, setFirstElementIndex] = useState(0);
  const [lastElementIndex, setLastElementIndex] = useState(0);
  const [query, setQuery] = useState(undefined);
  const debouncedQuery = useDebounce<string | undefined>(query, 500);

  const usersQuery = trpc.useInfiniteQuery(
    [
      'user.all',
      {
        query: debouncedQuery,
      },
    ],
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const [hasNextPage, setHasNextPage] = useState(
    usersQuery.data?.pages[pageIndex]?.nextCursor !== null,
  );

  const [users, setUsers] = useState(
    () => usersQuery.data?.pages[pageIndex]?.result.items || [],
  );

  useEffect(() => {
    setHasNextPage(usersQuery.data?.pages[pageIndex]?.nextCursor !== null);
  }, [usersQuery.data?.pages, pageIndex]);

  const [count, setCount] = useState(
    usersQuery.data?.pages[pageIndex]?.result.count || 0,
  );

  const replaceUsers = useCallback((newUsers) => {
    setUsers(newUsers);
  }, []);

  useEffect(() => {
    setFirstElementIndex(() => {
      if (pageIndex === 0) {
        return 1;
      }
      return (
        pageIndex *
          // @ts-ignore
          coursesQuery?.data?.pages[pageIndex - 1]?.result?.items?.length +
        1
      );
    });
  }, [pageIndex, usersQuery.data?.pages, users.length]);

  useEffect(() => {
    setLastElementIndex(firstElementIndex + users.length - 1);
  }, [firstElementIndex, users]);

  useEffect(() => {
    const users = usersQuery.data?.pages[pageIndex]?.result.items || [];

    const count = usersQuery.data?.pages[pageIndex]?.result.count || 0;
    replaceUsers(users);
    setCount(count);
  }, [usersQuery.data?.pages, pageIndex, replaceUsers]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  const handleNextPage = async () => {
    await usersQuery.fetchNextPage();
    setPageIndex((pageIndex) => pageIndex + 1);
    scrollToTop();
  };

  const handlePreviousPage = async () => {
    await usersQuery.fetchPreviousPage();
    setPageIndex((pageIndex) => pageIndex - 1);
    scrollToTop();
  };

  return {
    users,
    count,
    firstElementIndex,
    lastElementIndex,
    handleNextPage,
    handlePreviousPage,
    hasNextPage,
    setPageIndex,
    pageIndex,
    query,
    setQuery,
  };
};
