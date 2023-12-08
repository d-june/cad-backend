/*
  Warnings:

  - You are about to drop the column `aromas` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `Aroma` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Aroma" DROP CONSTRAINT "Aroma_productId_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "aromas";

-- DropTable
DROP TABLE "Aroma";

-- CreateTable
CREATE TABLE "aromas" (
    "id" SERIAL NOT NULL,
    "aroma" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "productId" TEXT,

    CONSTRAINT "aromas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "aromas" ADD CONSTRAINT "aromas_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
