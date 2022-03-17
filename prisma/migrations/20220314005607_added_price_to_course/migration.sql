/*
  Warnings:

  - You are about to drop the column `text` on the `Course` table. All the data in the column will be lost.
  - Added the required column `price` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "text",
ADD COLUMN     "enrolled" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "featured" SET DEFAULT false,
ALTER COLUMN "rating" SET DEFAULT 0,
ALTER COLUMN "reviews" SET DEFAULT 0;
