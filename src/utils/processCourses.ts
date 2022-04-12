import { ResultItem } from 'server/routers/course';

const processCourses = (courses: ResultItem[] | undefined) => {
  return (
    courses?.map((course) => {
      const avgRating =
        course.reviews.reduce((acc, review) => acc + review.rating, 0) /
        course.reviews.length;
      return {
        ...course,
        avgRating,
      };
    }) || []
  );
};

export default processCourses;
