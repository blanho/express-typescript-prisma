import { PrismaClient } from '@prisma/client';

import users from './seeds/users';
import categories from './seeds/categories';
import suppliers from './seeds/suppliers';
import products from './seeds/products';
import shippers from './seeds/shippers';
import bookmarks from './seeds/bookmarks';
import reviews from './seeds/reviews';

const prisma = new PrismaClient();

async function main () {
  // Seed users
  for (const user of users) {
    await prisma.user.upsert({
      create: user,
      update: user,
      where: { id: user.id },
    });
  }
  // Seed categories
  for (const category of categories) {
    await prisma.category.upsert({
      create: category,
      update: category,
      where: { id: category.id },
    });
  }
  // Seed suppliers
  for (const supplier of suppliers) {
    await prisma.supplier.upsert({
      create: supplier,
      update: supplier,
      where: { id: supplier.id },
    });
  }
  // Seed shippers
  for (const shipper of shippers) {
    await prisma.shipper.upsert({
      create: shipper,
      update: shipper,
      where: { id: shipper.id },
    });
  }
  // Seed products
  for (const product of products) {
    await prisma.product.upsert({
      create: product,
      update: product,
      where: { id: product.id },
    });
  }

  // Seed bookmarks
  for (const bookmark of bookmarks) {
    await prisma.bookmark.upsert({
      create: bookmark,
      update: bookmark,
      where: { id: bookmark.id },
    });
  }
  // Seed reviews
  for (const review of reviews) {
    await prisma.review.upsert({
      create: review,
      update: review,
      where: { id: review.id },
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
