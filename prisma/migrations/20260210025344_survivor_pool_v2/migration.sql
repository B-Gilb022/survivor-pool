/*
  Warnings:

  - A unique constraint covering the columns `[participantId,season]` on the table `ParticipantsMapper` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ParticipantsMapper_playerId_season_key";

-- CreateIndex
CREATE UNIQUE INDEX "ParticipantsMapper_participantId_season_key" ON "ParticipantsMapper"("participantId", "season");
