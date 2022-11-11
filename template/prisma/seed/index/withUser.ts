import { prisma } from './instance';
import user from './user';

const main = async () => {
  // Create seed data here
  await user(prisma);
};

// Disconnect from the database
// after the seeding
main().finally(() => prisma.$disconnect());
