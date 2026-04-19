/*
  Warnings:

  - Added the required column `bonus` to the `ParticipantsMapper` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ParticipantsMapper" ADD COLUMN     "bonus" BOOLEAN NOT NULL;
