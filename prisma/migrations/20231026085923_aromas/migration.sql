/*
  Warnings:

  - You are about to drop the column `aromas` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "aromas";

-- CreateTable
CREATE TABLE "Aromas" (
    "id" TEXT NOT NULL,
    "aroma" TEXT NOT NULL,
    "count" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "Aromas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Aromas" ADD CONSTRAINT "Aromas_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
