/*
  Warnings:

  - You are about to drop the column `aroma` on the `aromas` table. All the data in the column will be lost.
  - Added the required column `name` to the `aromas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "aromas" DROP COLUMN "aroma",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "color" TEXT NOT NULL;
