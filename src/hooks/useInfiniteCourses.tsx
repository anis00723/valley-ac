import { useCallback, useEffect, useState } from 'react';
import { trpc } from '../utils/trpc';
import processCourses from '../utils/processCourses';
import { useCoursesStore } from 'store/CoursesStore';
import { useDebounce } from 'hooks';
import { ResultItem } from 'server/routers/course';

export const useInfiniteCourses = (
  userSelectedCategory?: boolean,
  categoryIds?: string[],
) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [firstElementIndex, setFirstElementIndex] = useState(0);
  const [lastElementIndex, setLastElementIndex] = useState(0);
  const [query, setQuery] = useState(undefined);
  const debouncedQuery = useDebounce<string | undefined>(query, 500);
  const filters = useCoursesStore((store) => store.filters);

  const selectedOptionsIds = useCallback(
    (filterId: string) =>
      (filters.find((filter) => filter.id === filterId)?.options || [])
        .filter((option) => option.selected)
        .map((option) => option.id),
    [filters],
  );

  const coursesQuery = trpc.useInfiniteQuery(
    [
      'course.all',
      {
        categoryIds: userSelectedCategory
          ? selectedOptionsIds('category')
          : categoryIds,
        query: debouncedQuery,
      },
    ],
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const [hasNextPage, setHasNextPage] = useState(
    coursesQuery.data?.pages[pageIndex]?.nextCursor !== null,
  );

  useEffect(() => {
    setHasNextPage(coursesQuery.data?.pages[pageIndex]?.nextCursor !== null);
  }, [coursesQuery.data?.pages, pageIndex]);

  const [courses, setCourses] = useState<ResultItem[]>(() =>
    processCourses(coursesQuery.data?.pages[pageIndex]?.result.items),
  );

  const [count, setCount] = useState(
    coursesQuery.data?.pages[pageIndex]?.result.count || 0,
  );

  const replaceCourses = useCallback((newCourses: ResultItem[]) => {
    setCourses(newCourses);
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
  }, [pageIndex, coursesQuery.data?.pages, courses.length]);

  useEffect(() => {
    setLastElementIndex(firstElementIndex + courses.length - 1);
  }, [firstElementIndex, courses]);

  useEffect(() => {
    const courses = processCourses(
      coursesQuery.data?.pages[pageIndex]?.result.items,
    );
    const count = coursesQuery.data?.pages[pageIndex]?.result.count || 0;
    replaceCourses(courses);
    setCount(count);
  }, [coursesQuery.data?.pages, pageIndex, replaceCourses]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  const handleNextPage = async () => {
    await coursesQuery.fetchNextPage();
    setPageIndex((pageIndex) => pageIndex + 1);
    scrollToTop();
  };

  const handlePreviousPage = async () => {
    await coursesQuery.fetchPreviousPage();
    setPageIndex((pageIndex) => pageIndex - 1);
    scrollToTop();
  };

  return {
    courses,
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
