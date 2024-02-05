/*
  Warnings:

  - You are about to drop the column `productCommentsId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `ProductComments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_productCommentsId_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "productCommentsId";

-- DropTable
DROP TABLE "ProductComments";

-- CreateTable
CREATE TABLE "product-comments" (
    "id" SERIAL NOT NULL,
    "author" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "rating" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "product-comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product-comments" ADD CONSTRAINT "product-comments_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product-comments" ADD CONSTRAINT "product-comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
