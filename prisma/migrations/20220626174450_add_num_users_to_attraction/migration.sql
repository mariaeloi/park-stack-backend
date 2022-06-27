/*
  Warnings:

  - Added the required column `num_users` to the `attractions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "attractions" ADD COLUMN     "num_users" INTEGER NOT NULL;
