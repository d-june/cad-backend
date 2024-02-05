/*
  Warnings:

  - You are about to drop the `aromas` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `aroma` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "aromas" DROP CONSTRAINT "aromas_productId_fkey";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "aroma" TEXT NOT NULL;

-- DropTable
DROP TABLE "aromas";
