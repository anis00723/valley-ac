import { ResultItem } from 'server/routers/course';

const processCourse = (course: ResultItem) => {
  let avgRating = 0;
  if (course) {
    avgRating =
      course?.reviews.reduce((acc, review) => acc + review.rating, 0) /
      course?.reviews.length;
  }

  return {
    ...course,
    avgRating,
  };
};

export default processCourse;
