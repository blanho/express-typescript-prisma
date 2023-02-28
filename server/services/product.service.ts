import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const findMany = async () => {
  return await prisma.product.findMany();
};

const findOne = async (id: number) => {
  return await prisma.product.findFirst({
    where: {
      id,
    },
  });
};

export { findMany, findOne };
