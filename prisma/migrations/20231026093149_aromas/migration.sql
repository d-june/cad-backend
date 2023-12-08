/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `Aromas` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `count` on the `Aromas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Aromas" DROP COLUMN "count",
ADD COLUMN     "count" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Aromas_productId_key" ON "Aromas"("productId");
