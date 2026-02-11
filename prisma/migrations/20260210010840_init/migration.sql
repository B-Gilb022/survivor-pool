-- CreateTable
CREATE TABLE "Participant" (
    "participantId" SERIAL NOT NULL,
    "participantName" TEXT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("participantId")
);

-- CreateTable
CREATE TABLE "Player" (
    "playerId" SERIAL NOT NULL,
    "playerName" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("playerId")
);

-- CreateTable
CREATE TABLE "ParticipantsMapper" (
    "id" SERIAL NOT NULL,
    "participantId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "season" INTEGER NOT NULL,
    "totalPoints" INTEGER NOT NULL,
    "eliminated" BOOLEAN NOT NULL,
    "first" BOOLEAN NOT NULL,
    "second" BOOLEAN NOT NULL,
    "third" BOOLEAN NOT NULL,

    CONSTRAINT "ParticipantsMapper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerPoints" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "season" INTEGER NOT NULL,
    "remainInTheGamePts" INTEGER NOT NULL,
    "foundAdvantagePts" INTEGER NOT NULL,
    "usedAdvantagePts" INTEGER NOT NULL,
    "shotInTheDarkPts" INTEGER NOT NULL,
    "individualRewardPts" INTEGER NOT NULL,
    "confessionalPts" INTEGER NOT NULL,
    "individualImmunityPts" INTEGER NOT NULL,
    "tribalImmunityPts" INTEGER NOT NULL,
    "tribalRewardPts" INTEGER NOT NULL,

    CONSTRAINT "PlayerPoints_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ParticipantsMapper_playerId_season_key" ON "ParticipantsMapper"("playerId", "season");

-- AddForeignKey
ALTER TABLE "ParticipantsMapper" ADD CONSTRAINT "ParticipantsMapper_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("participantId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantsMapper" ADD CONSTRAINT "ParticipantsMapper_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerPoints" ADD CONSTRAINT "PlayerPoints_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;
