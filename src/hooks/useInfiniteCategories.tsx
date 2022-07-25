import { useCallback, useEffect, useState } from 'react';
import { ResultItem } from 'server/routers/category';
import { trpc } from 'utils/trpc';
import useDebounce from './useDebounce';

export const useInfiniteCategories = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [firstElementIndex, setFirstElementIndex] = useState(0);
  const [lastElementIndex, setLastElementIndex] = useState(0);
  const [query, setQuery] = useState(undefined);
  const debouncedQuery = useDebounce<string | undefined>(query, 500);

  const categoriesQuery = trpc.useInfiniteQuery(
    [
      'category.infinite',
      {
        query: debouncedQuery,
      },
    ],
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const [hasNextPage, setHasNextPage] = useState(
    categoriesQuery.data?.pages[pageIndex]?.nextCursor !== null,
  );

  const [categories, setCategories] = useState(
    () => categoriesQuery.data?.pages[pageIndex]?.result.items || [],
  );

  useEffect(() => {
    setHasNextPage(categoriesQuery.data?.pages[pageIndex]?.nextCursor !== null);
  }, [categoriesQuery.data?.pages, pageIndex]);

  const [count, setCount] = useState(
    categoriesQuery.data?.pages[pageIndex]?.result.count || 0,
  );

  const replaceCategories = useCallback((newCategories: ResultItem[]) => {
    setCategories(newCategories);
  }, []);

  useEffect(() => {
    setFirstElementIndex(() => {
      if (pageIndex === 0) {
        return 1;
      }
      return (
        pageIndex *
        // @ts-ignore
        categoriesQuery?.data?.pages[pageIndex - 1]?.result?.items?.length +
        1
      );
    });
  }, [pageIndex, categoriesQuery.data?.pages, categories.length]);

  useEffect(() => {
    setLastElementIndex(firstElementIndex + categories.length - 1);
  }, [firstElementIndex, categories]);

  useEffect(() => {
    const categories =
      categoriesQuery.data?.pages[pageIndex]?.result.items || [];

    const count = categoriesQuery.data?.pages[pageIndex]?.result.count || 0;
    replaceCategories(categories);
    setCount(count);
  }, [categoriesQuery.data?.pages, pageIndex, replaceCategories]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  const handleNextPage = async () => {
    await categoriesQuery.fetchNextPage();
    setPageIndex((pageIndex) => pageIndex + 1);
    scrollToTop();
  };

  const handlePreviousPage = async () => {
    await categoriesQuery.fetchPreviousPage();
    setPageIndex((pageIndex) => pageIndex - 1);
    scrollToTop();
  };

  return {
    categories,
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
