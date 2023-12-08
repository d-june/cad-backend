/*
  Warnings:

  - You are about to drop the `aromas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "aromas" DROP CONSTRAINT "aromas_productId_fkey";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "aromas" TEXT[];

-- DropTable
DROP TABLE "aromas";

-- CreateTable
CREATE TABLE "Aroma" (
    "id" SERIAL NOT NULL,
    "aroma" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "productId" TEXT,

    CONSTRAINT "Aroma_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Aroma" ADD CONSTRAINT "Aroma_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
