/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const firstPostId = '5c03994c-fc16-47e0-bd02-d218a370a078';
  await prisma.post.upsert({
    where: {
      id: firstPostId,
    },
    create: {
      id: firstPostId,
      title: 'First Post',
      text: 'This is an example post generated from `prisma/seed.ts`',
    },
    update: {},
  });

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

  // add some courses
  const courses = [
    {
      id: '5c03994c-fc16-47e0-bd02-d218a370a083',
      name: 'Course 1',
      price: 100.0,
      thumbnail:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.wallpaperbetter.com%2Fwallpaper%2F357%2F126%2F478%2Ffitness-workout-stretching-2K-wallpaper.jpg&f=1&nofb=1',
      categoryId: '5c03994c-fc16-47e0-bd02-d218a370a082',
    },
    {
      id: '5c03994c-fc16-47e0-bd02-d218a370a084',
      name: 'Course 2',
      price: 200.0,
      thumbnail:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.wallpaperbetter.com%2Fwallpaper%2F357%2F126%2F478%2Ffitness-workout-stretching-2K-wallpaper.jpg&f=1&nofb=1',
      categoryId: '5c03994c-fc16-47e0-bd02-d218a370a082',
    },
    {
      id: '5c03994c-fc16-47e0-bd02-d218a370a085',
      name: 'Course 3',
      price: 300.0,
      thumbnail:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.wallpaperbetter.com%2Fwallpaper%2F357%2F126%2F478%2Ffitness-workout-stretching-2K-wallpaper.jpg&f=1&nofb=1',
      categoryId: '5c03994c-fc16-47e0-bd02-d218a370a082',
    },
    {
      id: '5c03994c-fc16-47e0-bd02-d218a370a086',
      name: 'Course 4',
      price: 400.0,
      thumbnail:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.wallpaperbetter.com%2Fwallpaper%2F357%2F126%2F478%2Ffitness-workout-stretching-2K-wallpaper.jpg&f=1&nofb=1',
      categoryId: '5c03994c-fc16-47e0-bd02-d218a370a082',
    },
  ];

  await prisma.course.createMany({
    data: courses,
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
