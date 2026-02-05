import db from "./database";

export function createTables() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS Participants (
            ParticipantId INTEGER PRIMARY KEY AUTOINCREMENT,
            ParticipantName TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS Players (
            PlayerId INTEGER PRIMARY KEY AUTOINCREMENT,
            PlayerName TEXT NOT NULL,
            TribeName TEXT NOT NULL,
            Season INTEGER,
            TotalPoints INTEGER,
            Eliminated BOOLEAN
        );

        CREATE TABLE IF NOT EXISTS ParticipantsMapper (
            MapperId INTEGER PRIMARY KEY AUTOINCREMENT,
            ParticipantId INTEGER NOT NULL,
            PlayerId INTEGER NOT NULL,
            First BOOLEAN,
            Second BOOLEAN,
            Third BOOLEAN,
            Season INTEGER,

            FOREIGN KEY (ParticipantId) REFERENCES Participants(ParticipantId),
            FOREIGN KEY (PlayerId) REFERENCES Players(PlayerId)
        );

        CREATE TABLE IF NOT EXISTS PlayerPoints (
            PlayerId INTEGER NOT NULL,
            PlayerName TEXT NOT NULL,
            RemainInTheGamePts INTEGER,
            FoundAdvantagePts INTEGER,
            UsedAdvantagePts INTEGER,
            ShotInTheDarkPts INTEGER,
            IndividualRewardPts INTEGER,
            ConfessionalPts INTEGER,
            IndividualImmunityPts INTEGER,
            TribalImmunityPts INTEGER,
            TribalRewardPts INTEGER,

            FOREIGN KEY (PlayerId) REFERENCES Players(PlayerId)
        );

    `);
}