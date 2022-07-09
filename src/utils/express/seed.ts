export const INSTANCE = `
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export type Prisma = typeof prisma;

`;

export const SEED = `
import { prisma } from './instance';

const main = async () => {
  // Add any seed data here.
};

// Disconnect from the database
// after the seeding
main().finally(() => prisma.$disconnect());

`;
