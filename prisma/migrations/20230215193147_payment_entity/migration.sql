-- AlterTable
ALTER TABLE "product" ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "image" SET DEFAULT 'https://res.cloudinary.com/dg6qyxc0a/image/upload/v1676228907/shop/152-1520367_user-profile-default-image-png-clipart-png-download_wgrovb.png';

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "status" TEXT,
    "emailAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);
