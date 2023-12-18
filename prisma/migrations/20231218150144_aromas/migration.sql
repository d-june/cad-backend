/*
  Warnings:

  - Added the required column `image` to the `aromas-list` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "aromas-list" ADD COLUMN     "image" TEXT NOT NULL;
