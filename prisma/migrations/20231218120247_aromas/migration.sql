-- CreateTable
CREATE TABLE "aromas-list" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "top" TEXT NOT NULL,
    "middle" TEXT NOT NULL,
    "base" TEXT NOT NULL,

    CONSTRAINT "aromas-list_pkey" PRIMARY KEY ("id")
);
