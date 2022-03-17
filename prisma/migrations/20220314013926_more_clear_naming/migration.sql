/*
  Warnings:

  - You are about to drop the column `enrolled` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `reviews` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "enrolled",
DROP COLUMN "reviews",
ADD COLUMN     "enrolledCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "reviewCount" INTEGER NOT NULL DEFAULT 0;
