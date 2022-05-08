/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */

import { PrismaClient } from '@prisma/client';
import faker from '@faker-js/faker';
const prisma = new PrismaClient();

async function main() {
  // add some categories to your db
  const categories = [
    {
      id: '5c03994c-fc16-47e0-bd02-d218a370a078',
      name: 'Coaching',
      thumbnail:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbase2.co.uk%2Fwp-content%2Fuploads%2F2018%2F01%2FCoaching-mindmap.jpg&f=1&nofb=1',
    },
    {
      id: '5c03994c-fc16-47e0-bd02-d218a370a079',
      name: 'Médecine douce',
      thumbnail:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rezo-65.com%2Fwp-content%2Fuploads%2Fmedecine-douce-650x325.png&f=1&nofb=1',
    },
    {
      id: '5c03994c-fc16-47e0-bd02-d218a370a080',
      name: 'Psychologie',
      thumbnail:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.publicdomainpictures.net%2Fpictures%2F270000%2Fvelka%2Fpsychology-brain-memory-concept.jpg&f=1&nofb=1',
    },
    {
      id: '5c03994c-fc16-47e0-bd02-d218a370a081',
      name: 'Sport',
      thumbnail:
        'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.wallpaperbetter.com%2Fwallpaper%2F357%2F126%2F478%2Ffitness-workout-stretching-2K-wallpaper.jpg&f=1&nofb=1',
    },
    {
      id: '5c03994c-fc16-47e0-bd02-d218a370a082',
      name: 'Thérapie énergétique',
      thumbnail:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbeta.prendssoinsdetoi.ch%2Fwp-content%2Fuploads%2F2020%2F07%2Fchironique-top.jpg&f=1&nofb=1',
    },
  ];

  await prisma.category.createMany({
    data: categories,
    skipDuplicates: true,
  });

  // Remove all courses
  await prisma.course.deleteMany({});

  // fake course data using faker
  for (let i = 0; i < 50; i++) {
    const randomNumberOfReviews = Math.floor(Math.random() * 10) + 1;
    // fake reviews for each course
    const reviews = [];
    for (let j = 0; j < randomNumberOfReviews; j++) {
      reviews.push({
        id: faker.datatype.uuid(),
        comment: faker.lorem.sentence(),
        rating: Math.floor(Math.random() * 5) + 1,
      });
    }

    const course = {
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: faker.datatype.number({ min: 10, max: 100, precision: 0.01 }),
      thumbnail: faker.image.imageUrl(),
      categoryId: faker.random.arrayElement(categories).id,
      description: faker.lorem.paragraph(),
      reviews: {
        create: reviews,
      },
    };

    await prisma.course.create({
      data: course,
      include: {
        reviews: true,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
