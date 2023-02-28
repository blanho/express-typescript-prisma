import { Prisma, PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async(createUser: Prisma.UserCreateInput) => {
  return (await prisma.user.create({
    data: createUser,
  })) as User;
};

export const findUser = async(where: Partial<Prisma.UserWhereInput>, select?: Prisma.UserSelect) => {
  return await prisma.user.findFirst({
    where,
    select
  }) as User;
};

export const findUniqueUser = async(where: Prisma.UserWhereUniqueInput, select?: Prisma.UserSelect) => {
  return await prisma.user.findUnique({
    where,
    select
  }) as User;
};

export const updateUser = async(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput, select?: Prisma.UserSelect) => {
  return await prisma.user.update({
    where,
    data,
    select
  }) as User;
};
