/*
  Warnings:

  - Added the required column `name` to the `EnhancedImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EnhancedImage" ADD COLUMN     "name" TEXT NOT NULL;
