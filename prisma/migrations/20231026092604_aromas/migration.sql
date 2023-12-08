/*
  Warnings:

  - Made the column `productId` on table `Aromas` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Aromas" DROP CONSTRAINT "Aromas_productId_fkey";

-- AlterTable
ALTER TABLE "Aromas" ALTER COLUMN "productId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Aromas" ADD CONSTRAINT "Aromas_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
