/*
  Warnings:

  - Added the required column `form` to the `products` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `volume` on the `products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `price` on the `products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `depth` on the `products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `height` on the `products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `weight` on the `products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `width` on the `products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "form" TEXT NOT NULL,
DROP COLUMN "volume",
ADD COLUMN     "volume" INTEGER NOT NULL,
DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL,
DROP COLUMN "depth",
ADD COLUMN     "depth" INTEGER NOT NULL,
DROP COLUMN "height",
ADD COLUMN     "height" INTEGER NOT NULL,
DROP COLUMN "weight",
ADD COLUMN     "weight" INTEGER NOT NULL,
DROP COLUMN "width",
ADD COLUMN     "width" INTEGER NOT NULL;
