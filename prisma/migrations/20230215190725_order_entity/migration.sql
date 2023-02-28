-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "tax" DOUBLE PRECISION NOT NULL,
    "shippingFee" DOUBLE PRECISION NOT NULL,
    "subTotal" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "isPaid" BOOLEAN DEFAULT false,
    "paidAt" TIMESTAMP(3),
    "isDelivered" BOOLEAN DEFAULT false,
    "deliveredAt" TIMESTAMP(3),

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
