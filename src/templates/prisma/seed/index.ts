export const imports = {
  instance: "import { prisma } from './instance';",
  user: "import user from './user';",
};

export const seeder = {
  start: 'const main = async () => {',
  user: 'await user(prisma);',
  end: `}
  
// Disconnect from the database
// after the seeding
main().finally(() => prisma.$disconnect());  
`,
};
