import { prisma } from '../../../server/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { categoryIds } = req.body;
  const { pageNum } = req.body;
  let arr = [];
  for (let i = 0; i < categoryIds.length; i++) {
    const courses = await prisma.course.findMany({
      where: {
        // @ts-ignore
        categoryId: categoryIds[i],
      },
      include: {
        reviews: true,
      },
      orderBy: {
        reviews: {
          _count: 'desc',
        },
      },
    });
    arr.push(courses);
  }
// @ts-ignore

  arr = arr.flat();
  const result = arr.map(course => {
    // @ts-ignore
    const reviews = course.reviews;
    const ratings = reviews.map(review => review.rating);
    const avg = ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length;
    return {
      ...course,
      avgRating: avg,
    };
  });

  const count = result.length;
  result.sort((a, b) => b.avgRating - a.avgRating);
  const resultWithPagination = result.slice((pageNum - 1) * 9, pageNum * 9);
  const lastItem = result.indexOf(resultWithPagination[resultWithPagination.length - 1]) + 1;
  res.status(200).json({
    resultWithPagination,
    lastItem,
    count,
  });

}
