import db from "./database";

export function createTables() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS Participants (
            ParticipantId INTEGER PRIMARY KEY AUTOINCREMENT,
            ParticipantName TEXT NOT NULL,
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
            FOREIGN KEY (ParticipantId) REFERENCES Participants(ParticipantId),
            FOREIGN KEY (PlayerId) REFERENCES Participants(PlayerId),
            First BOOLEAN,
            Second BOOLEAN,
            Third BOOLEAN,
            Season INTEGER
        );

        CREATE TABLE IF NOT EXISTS PlayerPoints (
            FOREIGN KEY (PlayerId) REFERENCES Participants(PlayerId),
            PlayerName TEXT NOT NULL,
            RemainInTheGamePts INTEGER,
            FoundAdvantagePts INTEGER,
            UsedAdvantagePts INTEGER,
            ShotInTheDarkPts INTEGER,
            IndividualRewardPts INTEGER,
            ConfessionalPts INTEGER,
            IndividualImmunityPts INTEGER,
            TribalImmunityPts INTEGER,
            TribalRewardPts INTEGER
        );

    `);
}