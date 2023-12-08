/*
  Warnings:

  - You are about to drop the column `group` on the `products` table. All the data in the column will be lost.
  - Added the required column `generalGroup` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specifiedGroup` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "group",
ADD COLUMN     "generalGroup" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "specifiedGroup" TEXT NOT NULL;
