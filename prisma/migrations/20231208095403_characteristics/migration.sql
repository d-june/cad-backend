/*
  Warnings:

  - Added the required column `depth` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "depth" INTEGER NOT NULL,
ADD COLUMN     "height" INTEGER NOT NULL,
ADD COLUMN     "weight" INTEGER NOT NULL,
ADD COLUMN     "width" INTEGER NOT NULL;
