/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "description" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "thumbnailAlt" TEXT NOT NULL DEFAULT E'Thumbnail';

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
