/*
  Warnings:

  - Made the column `name` on table `EnhancedImage` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "EnhancedImage" ALTER COLUMN "name" SET NOT NULL;
