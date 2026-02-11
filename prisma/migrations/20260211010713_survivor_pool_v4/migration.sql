/*
  Warnings:

  - The primary key for the `ParticipantsMapper` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ParticipantsMapper` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ParticipantsMapper_participantId_season_key";

-- AlterTable
ALTER TABLE "ParticipantsMapper" DROP CONSTRAINT "ParticipantsMapper_pkey",
DROP COLUMN "id",
ADD COLUMN     "mapperid" SERIAL NOT NULL,
ADD CONSTRAINT "ParticipantsMapper_pkey" PRIMARY KEY ("mapperid");
