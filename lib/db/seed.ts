import db from "./database";

export function seedDatabase() {
    const row = db.prepare("SELECT COUNT(*) AS count FROM Participants").get() as { count: number };

    if (row.count > 0) return; // Database already seeded

    const insertParticipant = db.prepare("INSERT INTO Participants (ParticipantName) VALUES (?)");
    const insertMapper = db.prepare("INSERT INTO ParticipantsMapper (PlayerName, TribeName, Season, TotalPoints, Eliminated) VALUES (?, ?, ?, ?, ?)");
    const insertMapping = db.prepare("INSERT INTO ParticipantsMapper (ParticipantId, PlayerId, First, Second, Third, Season) VALUES (?, ?, ?, ?, ?, ?)");
    const insertPoints = db.prepare("INSERT INTO PlayerPoints (PlayerId, PlayerName, RemainInTheGamePts, FoundAdvantagePts, UsedAdvantagePts, ShotInTheDarkPts, IndividualRewardPts, ConfessionalPts, IndividualImmunityPts, TribalImmunityPts, TribalRewardPts) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    insertParticipant.run("Ben");
    insertParticipant.run("Cam");
    insertParticipant.run("Geoff");
    insertParticipant.run("Ivy");
    insertParticipant.run("Gavin");
    insertParticipant.run("Dan");
    insertParticipant.run("Joanne");
    insertParticipant.run("Nanny");
    insertParticipant.run("Papa");
    insertParticipant.run("Cara");
    insertParticipant.run("Cal");

    // CONTINUE ADDING INITIAL DATA
}