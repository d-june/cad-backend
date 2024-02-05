/*
  Warnings:

  - You are about to drop the column `created_at` on the `product-comments` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `product-comments` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `products` table. All the data in the column will be lost.
  - Added the required column `updatedComment_at` to the `product-comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedProduct_at` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product-comments" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdComment_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedComment_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdProduct_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedProduct_at" TIMESTAMP(3) NOT NULL;
