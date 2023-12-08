/*
  Warnings:

  - You are about to drop the `Aromas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Aromas" DROP CONSTRAINT "Aromas_productId_fkey";

-- DropTable
DROP TABLE "Aromas";

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
