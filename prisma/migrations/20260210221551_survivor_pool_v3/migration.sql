/*
  Warnings:

  - You are about to drop the column `eliminated` on the `ParticipantsMapper` table. All the data in the column will be lost.
  - You are about to drop the column `totalPoints` on the `ParticipantsMapper` table. All the data in the column will be lost.
  - Added the required column `eliminated` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `season` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPoints` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tribeName` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerName` to the `PlayerPoints` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ParticipantsMapper" DROP COLUMN "eliminated",
DROP COLUMN "totalPoints";

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "eliminated" BOOLEAN NOT NULL,
ADD COLUMN     "season" INTEGER NOT NULL,
ADD COLUMN     "totalPoints" INTEGER NOT NULL,
ADD COLUMN     "tribeName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PlayerPoints" ADD COLUMN     "playerName" TEXT NOT NULL;
