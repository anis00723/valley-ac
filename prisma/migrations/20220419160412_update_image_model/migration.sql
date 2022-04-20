/*
  Warnings:

  - The primary key for the `Image` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `clientName` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Image` table. All the data in the column will be lost.
  - Added the required column `originalFileName` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storedFileName` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" DROP CONSTRAINT "Image_pkey",
DROP COLUMN "clientName",
DROP COLUMN "name",
ADD COLUMN     "originalFileName" TEXT NOT NULL,
ADD COLUMN     "storedFileName" TEXT NOT NULL,
ADD CONSTRAINT "Image_pkey" PRIMARY KEY ("storedFileName");
