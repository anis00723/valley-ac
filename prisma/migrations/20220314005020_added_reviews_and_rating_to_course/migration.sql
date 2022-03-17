/*
  Warnings:

  - Added the required column `featured` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviews` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "featured" BOOLEAN NOT NULL,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "reviews" INTEGER NOT NULL;
