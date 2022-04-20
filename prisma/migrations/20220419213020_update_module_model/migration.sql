/*
  Warnings:

  - You are about to drop the column `audioFile` on the `Module` table. All the data in the column will be lost.
  - You are about to drop the column `pdfFile` on the `Module` table. All the data in the column will be lost.
  - Added the required column `audioFilePath` to the `Module` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pdfFilePath` to the `Module` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Module" DROP COLUMN "audioFile",
DROP COLUMN "pdfFile",
ADD COLUMN     "audioFilePath" TEXT NOT NULL,
ADD COLUMN     "pdfFilePath" TEXT NOT NULL;
