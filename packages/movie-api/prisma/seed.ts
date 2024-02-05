import { PrismaClient, Prisma } from '@prisma/client';
import { hashPassword } from '../src/modules/auth';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const generateData = async () => {
  const seedData: Prisma.UserCreateInput[] = [
    {
      username: 'Alice',
      email: 'alice@email.com',
      password: await hashPassword('password123'),
      movies: {
        create: [
          {
            dateWatched: faker.date.recent(),
            film: 'Hereditary',
            review: faker.lorem.words({ min: 3, max: 15 }),
            rating: faker.number.int({ min: 1, max: 5 }),
            like: faker.datatype.boolean(),
          },
          {
            dateWatched: faker.date.recent(),
            film: 'Oppenheimer',
            review: faker.lorem.words({ min: 3, max: 15 }),
            rating: faker.number.int({ min: 1, max: 5 }),
            like: faker.datatype.boolean(),
          },
          {
            dateWatched: faker.date.recent(),
            film: 'Ferrari',
            review: faker.lorem.words({ min: 3, max: 15 }),
            rating: faker.number.int({ min: 1, max: 5 }),
            like: faker.datatype.boolean(),
          },
          {
            dateWatched: faker.date.recent(),
            film: 'Escape From New York',
            review: faker.lorem.words({ min: 3, max: 15 }),
            rating: faker.number.int({ min: 1, max: 5 }),
            like: faker.datatype.boolean(),
          },
          {
            dateWatched: faker.date.recent(),
            film: 'They Live',
            review: faker.lorem.words({ min: 3, max: 15 }),
            rating: faker.number.int({ min: 1, max: 5 }),
            like: faker.datatype.boolean(),
          },
          {
            dateWatched: faker.date.recent(),
            film: 'Tenet',
            review: faker.lorem.words({ min: 3, max: 15 }),
            rating: faker.number.int({ min: 1, max: 5 }),
            like: faker.datatype.boolean(),
          },
          {
            dateWatched: faker.date.recent(),
            film: 'The Lobster',
            review: faker.lorem.words({ min: 3, max: 15 }),
            rating: faker.number.int({ min: 1, max: 5 }),
            like: faker.datatype.boolean(),
          },
          {
            dateWatched: faker.date.recent(),
            film: 'Wonder Woman',
            review: faker.lorem.words({ min: 3, max: 15 }),
            rating: faker.number.int({ min: 1, max: 5 }),
            like: faker.datatype.boolean(),
          },
          {
            dateWatched: faker.date.recent(),
            film: 'Godzilla vs Kong',
            review: faker.lorem.words({ min: 3, max: 15 }),
            rating: faker.number.int({ min: 1, max: 5 }),
            like: faker.datatype.boolean(),
          },
          {
            dateWatched: faker.date.recent(),
            film: 'The Dark Knight',
            review: faker.lorem.words({ min: 3, max: 15 }),
            rating: faker.number.int({ min: 1, max: 5 }),
            like: faker.datatype.boolean(),
          },
        ],
      },
    },
    {
      username: 'Charles',
      email: 'charles@email.com',
      password: await hashPassword('password321'),
      movies: {
        create: [
          {
            dateWatched: faker.date.recent(),
            film: 'Fight Club',
            review: faker.lorem.words({ min: 3, max: 15 }),
            rating: faker.number.int({ min: 1, max: 5 }),
            like: faker.datatype.boolean(),
          },
        ],
      },
    },
  ];
  return seedData;
};

async function main() {
  console.log(`Start seeding ...`);
  const userData = await generateData();
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
