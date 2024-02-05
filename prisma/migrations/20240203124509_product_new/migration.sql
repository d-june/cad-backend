/*
  Warnings:

  - Added the required column `productCommentsId` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "productCommentsId" INTEGER NOT NULL,
ADD COLUMN     "rating" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "volume" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "depth" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "height" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "weight" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "width" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "ProductComments" (
    "id" SERIAL NOT NULL,
    "author" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "ProductComments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_productCommentsId_fkey" FOREIGN KEY ("productCommentsId") REFERENCES "ProductComments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
