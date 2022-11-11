import { prisma } from './instance';

const main = async () => {
  // Create seed data here
};

// Disconnect from the database
// after the seeding
main().finally(() => prisma.$disconnect());
