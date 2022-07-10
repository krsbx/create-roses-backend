export const userSeeder = `import { Prisma } from './instance';
import { hashText } from '../../src/utils/encryption';
import { USER_ROLE } from '../../src/utils/constants';

const main = async (prisma: Prisma) => {
  await prisma.user.createMany({
    data: [
      {
        username: 'admin',
        email: 'admin@admin.com',
        password: await hashText('admin'),
        role: USER_ROLE.ADMIN,
      },
    ],
    skipDuplicates: true,
  });
};

export default main;
`;
