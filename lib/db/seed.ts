import db from "./database";

export function seedDatabase() {
    const row = db.prepare("SELECT COUNT(*) AS count FROM Participants").get() as { count: number };

    if (row.count > 0) return; // Database already seeded

    const insertParticipant = db.prepare("INSERT INTO Participants (ParticipantName) VALUES (?)");
    const insertPlayer = db.prepare("INSERT INTO Players (PlayerName, TribeName, Season, TotalPoints, Eliminated) VALUES (?, ?, ?, ?, ?)");
    const insertMapping = db.prepare("INSERT INTO ParticipantsMapper (ParticipantId, PlayerId, First, Second, Third, Season) VALUES (?, ?, ?, ?, ?, ?)");
    const insertPoints = db.prepare("INSERT INTO PlayerPoints (PlayerId, PlayerName, RemainInTheGamePts, FoundAdvantagePts, UsedAdvantagePts, ShotInTheDarkPts, IndividualRewardPts, ConfessionalPts, IndividualImmunityPts, TribalImmunityPts, TribalRewardPts) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    const participantIds: Record<string, number> = {};
    const playerIds: Record<string, number> = {};
    
    ["Ben", "Cam", "Geoff", "Ivy", "Gavin", "Dan", "Joanne", "Nanny", "Papa", "Cara", "Cal"]
    .forEach(name => {
        const result = insertParticipant.run(name);
        participantIds[name] = Number(result.lastInsertRowid);
    });

    // Season 47 Data

    const players_s47 = [
        {name : "Andy", tribe: "Gata", season: 47, points: 165, eliminated: 1},
        {name : "Anika", tribe: "Gata", season: 47, points: 44, eliminated: 1},
        {name : "Aysha", tribe: "Lavo", season: 47, points: 30, eliminated: 1},
        {name : "Caroline", tribe: "Tuku", season: 47, points: 115, eliminated: 1},
        {name : "Gabe", tribe: "Tuku", season: 47, points: 127, eliminated: 1},
        {name : "Genevieve", tribe: "Lavo", season: 47, points: 167, eliminated: 1},
        {name : "Rome", tribe: "Lavo", season: 47, points: 88, eliminated: 1},
        {name : "Jon", tribe: "Gata", season: 47, points: 9, eliminated: 1},
        {name : "Kishan", tribe: "Lavo", season: 47, points: 25, eliminated: 1},
        {name : "Kyle", tribe: "Tuku", season: 47, points: 149, eliminated: 1},
        {name : "Rachel", tribe: "Gata", season: 47, points: 256, eliminated: 0},
        {name : "Sam", tribe: "Gata", season: 47, points: 213, eliminated: 0},
        {name : "Sierra", tribe: "Gata", season: 47, points: 82, eliminated: 1},
        {name : "Sol", tribe: "Lavo", season: 47, points: 103, eliminated: 1},
        {name : "Sue", tribe: "Tuku", season: 47, points: 169, eliminated: 0},
        {name : "Teeny", tribe: "Lavo", season: 47, points: 185, eliminated: 1},
        {name : "TK", tribe: "Tuku", season: 47, points: 12, eliminated: 1},
        {name : "Tiyana", tribe: "Tuku", season: 47, points: 64, eliminated: 1}
    ];

    for (const player of players_s47) {
        const result = insertPlayer.run(player.name, player.tribe, player.season, player.points, player.eliminated);
        playerIds[`${player.name}::${player.season}`] = Number(result.lastInsertRowid);
    }

    insertPoints.run(playerIds["Andy::47"], "Andy", 11, 1, 1, 0, 2, 70, 0, 4, 0);
    insertPoints.run(playerIds["Anika::47"], "Anika", 3, 0, 0, 0, 0, 14, 0, 3, 0);
    insertPoints.run(playerIds["Aysha::47"], "Aysha", 1, 0, 0, 0, 0, 20, 0, 1, 0);
    insertPoints.run(playerIds["Caroline::47"], "Caroline", 10, 1, 1, 0, 0, 35, 0, 3, 1);
    insertPoints.run(playerIds["Gabe::47"], "Gabe", 8, 0, 1, 0, 1, 52, 1, 3, 0);
    insertPoints.run(playerIds["Genevieve::47"], "Genevieve", 12, 0, 0, 0, 4, 62, 1, 3, 0);
    insertPoints.run(playerIds["Rome::47"], "Rome", 4, 2, 2, 0, 0, 38, 0, 2, 0);
    insertPoints.run(playerIds["Jon::47"], "Jon", 0, 0, 0, 0, 0, 9, 0, 0, 0);
    insertPoints.run(playerIds["Kishan::47"], "Kishan", 2, 0, 0, 0, 0, 10, 0, 1, 0);
    insertPoints.run(playerIds["Kyle::47"], "Kyle", 9, 0, 0, 0, 3, 29, 4, 3, 1);
    insertPoints.run(playerIds["Rachel::47"], "Rachel", 14, 2, 3, 1, 2, 86, 4, 3, 1);
    insertPoints.run(playerIds["Sam::47"], "Sam", 14, 1, 0, 0, 4, 93, 0, 4, 1);
    insertPoints.run(playerIds["Sierra::47"], "Sierra", 6, 0, 0, 0, 2, 22, 0, 4, 0);
    insertPoints.run(playerIds["Sol::47"], "Sol", 7, 1, 1, 0, 2, 33, 0, 3, 0);
    insertPoints.run(playerIds["Sue::47"], "Sue", 14, 1, 0, 0, 2, 54, 1, 3, 1);
    insertPoints.run(playerIds["Teeny::47"], "Teeny", 13, 1, 1, 0, 4, 70, 0, 3, 1);
    insertPoints.run(playerIds["TK::47"], "TK", 0, 0, 0, 0, 0, 12, 0, 0, 0);
    insertPoints.run(playerIds["Tiyana::47"], "Tiyana", 5, 0, 0, 0, 0, 19, 0, 3, 1);

    insertMapping.run(participantIds["Joanne"], playerIds["Kyle::47"], 1, 0, 0, 47);
    insertMapping.run(participantIds["Joanne"], playerIds["TK::47"], 0, 1, 0, 47);
    insertMapping.run(participantIds["Joanne"], playerIds["Teeny::47"], 0, 0, 1, 47);
    insertMapping.run(participantIds["Joanne"], playerIds["Caroline::47"], 0, 0, 0, 47);
    insertMapping.run(participantIds["Joanne"], playerIds["Andy::47"], 0, 0, 0, 47);
    
    insertMapping.run(participantIds["Dan"], playerIds["Tiyana::47"], 1, 0, 0, 47);
    insertMapping.run(participantIds["Dan"], playerIds["TK::47"], 0, 1, 0, 47);
    insertMapping.run(participantIds["Dan"], playerIds["Sol::47"], 0, 0, 1, 47);
    insertMapping.run(participantIds["Dan"], playerIds["Genevieve::47"], 0, 0, 0, 47);
    insertMapping.run(participantIds["Dan"], playerIds["Rome::47"], 0, 0, 0, 47);

    insertMapping.run(participantIds["Ivy"], playerIds["Teeny::47"], 1, 0, 0, 47);
    insertMapping.run(participantIds["Ivy"], playerIds["Sue::47"], 0, 1, 0, 47);
    insertMapping.run(participantIds["Ivy"], playerIds["Rachel::47"], 0, 0, 1, 47);
    insertMapping.run(participantIds["Ivy"], playerIds["Caroline::47"], 0, 0, 0, 47);
    insertMapping.run(participantIds["Ivy"], playerIds["Andy::47"], 0, 0, 0, 47);

    insertMapping.run(participantIds["Gavin"], playerIds["Kyle::47"], 1, 0, 0, 47);
    insertMapping.run(participantIds["Gavin"], playerIds["Genevieve::47"], 0, 1, 0, 47);
    insertMapping.run(participantIds["Gavin"], playerIds["Tiyana::47"], 0, 0, 1, 47);
    insertMapping.run(participantIds["Gavin"], playerIds["Kishan::47"], 0, 0, 0, 47);
    insertMapping.run(participantIds["Gavin"], playerIds["Gabe::47"], 0, 0, 0, 47);

    insertMapping.run(participantIds["Geoff"], playerIds["Teeny::47"], 1, 0, 0, 47);
    insertMapping.run(participantIds["Geoff"], playerIds["Tiyana::47"], 0, 1, 0, 47);
    insertMapping.run(participantIds["Geoff"], playerIds["Kishan::47"], 0, 0, 1, 47);
    insertMapping.run(participantIds["Geoff"], playerIds["TK::47"], 0, 0, 0, 47);
    insertMapping.run(participantIds["Geoff"], playerIds["Sierra::47"], 0, 0, 0, 47);

    insertMapping.run(participantIds["Ben"], playerIds["Sam::47"], 1, 0, 0, 47);
    insertMapping.run(participantIds["Ben"], playerIds["Teeny::47"], 0, 1, 0, 47);
    insertMapping.run(participantIds["Ben"], playerIds["Tiyana::47"], 0, 0, 1, 47);
    insertMapping.run(participantIds["Ben"], playerIds["TK::47"], 0, 0, 0, 47);
    insertMapping.run(participantIds["Ben"], playerIds["Aysha::47"], 0, 0, 0, 47);

    insertMapping.run(participantIds["Cam"], playerIds["Sam::47"], 1, 0, 0, 47);
    insertMapping.run(participantIds["Cam"], playerIds["Teeny::47"], 0, 1, 0, 47);
    insertMapping.run(participantIds["Cam"], playerIds["Tiyana::47"], 0, 0, 1, 47);
    insertMapping.run(participantIds["Cam"], playerIds["TK::47"], 0, 0, 0, 47);
    insertMapping.run(participantIds["Cam"], playerIds["Aysha::47"], 0, 0, 0, 47);

    insertMapping.run(participantIds["Nanny"], playerIds["Genevieve::47"], 1, 0, 0, 47);
    insertMapping.run(participantIds["Nanny"], playerIds["Anika::47"], 0, 1, 0, 47);
    insertMapping.run(participantIds["Nanny"], playerIds["Kyle::47"], 0, 0, 1, 47);
    insertMapping.run(participantIds["Nanny"], playerIds["Sue::47"], 0, 0, 0, 47);
    insertMapping.run(participantIds["Nanny"], playerIds["Sol::47"], 0, 0, 0, 47);

    insertMapping.run(participantIds["Papa"], playerIds["Sierra::47"], 1, 0, 0, 47);
    insertMapping.run(participantIds["Papa"], playerIds["Kyle::47"], 0, 1, 0, 47);
    insertMapping.run(participantIds["Papa"], playerIds["TK::47"], 0, 0, 1, 47);
    insertMapping.run(participantIds["Papa"], playerIds["Sue::47"], 0, 0, 0, 47);
    insertMapping.run(participantIds["Papa"], playerIds["Tiyana::47"], 0, 0, 0, 47);

    insertMapping.run(participantIds["Cal"], playerIds["Kyle::47"], 1, 0, 0, 47);
    insertMapping.run(participantIds["Cal"], playerIds["Sue::47"], 0, 1, 0, 47);
    insertMapping.run(participantIds["Cal"], playerIds["Kishan::47"], 0, 0, 1, 47);
    insertMapping.run(participantIds["Cal"], playerIds["Sol::47"], 0, 0, 0, 47);
    insertMapping.run(participantIds["Cal"], playerIds["Aysha::47"], 0, 0, 0, 47);

    insertMapping.run(participantIds["Cara"], playerIds["Tiyana::47"], 1, 0, 0, 47);
    insertMapping.run(participantIds["Cara"], playerIds["Sam::47"], 0, 1, 0, 47);
    insertMapping.run(participantIds["Cara"], playerIds["Teeny::47"], 0, 0, 1, 47);
    insertMapping.run(participantIds["Cara"], playerIds["Aysha::47"], 0, 0, 0, 47);
    insertMapping.run(participantIds["Cara"], playerIds["Sue::47"], 0, 0, 0, 47);

        // Season 48 Data

    const players_s48 = [
        {name : "Stephanie", tribe: "Vula", season: 48, points: 6, eliminated: 1},
        {name : "Sai", tribe: "Vula", season: 48, points: 98, eliminated: 1},
        {name : "Kevin", tribe: "Vula", season: 48, points: 16, eliminated: 1},
        {name : "Cedrek", tribe: "Vula", season: 48, points: 59, eliminated: 1},
        {name : "Justin", tribe: "Vula", season: 48, points: 18, eliminated: 1},
        {name : "Mary", tribe: "Vula", season: 48, points: 122, eliminated: 1},
        {name : "Shauhin", tribe: "Lagi", season: 48, points: 150, eliminated: 1},
        {name : "Eva", tribe: "Lagi", season: 48, points: 226, eliminated: 0},
        {name : "Joe", tribe: "Lagi", season: 48, points: 210, eliminated: 0},
        {name : "Thomas", tribe: "Lagi", season: 48, points: 44, eliminated: 1},
        {name : "Bianca", tribe: "Lagi", season: 48, points: 49, eliminated: 1},
        {name : "Star", tribe: "Lagi", season: 48, points: 106, eliminated: 1},
        {name : "Kyle", tribe: "Civa", season: 48, points: 237, eliminated: 0},
        {name : "Mitch", tribe: "Civa", season: 48, points: 151, eliminated: 1},
        {name : "Kamilla", tribe: "Civa", season: 48, points: 205, eliminated: 1},
        {name : "David", tribe: "Civa", season: 48, points: 126, eliminated: 1},
        {name : "Charity", tribe: "Civa", season: 48, points: 59, eliminated: 1},
        {name : "Chrissy", tribe: "Civa", season: 48, points: 67, eliminated: 1}
    ];

    for (const player of players_s48) {
        const result = insertPlayer.run(player.name, player.tribe, player.season, player.points, player.eliminated);
        playerIds[`${player.name}::${player.season}`] = Number(result.lastInsertRowid);
    }

    insertPoints.run(playerIds["Stephanie::48"], "Stephanie", 0, 0, 0, 0, 0, 6, 0, 0, 0);
    insertPoints.run(playerIds["Sai::48"], "Sai", 5, 1, 1, 0, 1, 53, 0, 1, 0);
    insertPoints.run(playerIds["Kevin::48"], "Kevin", 0, 0, 0, 0, 0, 16, 0, 0, 0);
    insertPoints.run(playerIds["Cedrek::48"], "Cedrek", 6, 0, 0, 0, 1, 19, 0, 1, 0);
    insertPoints.run(playerIds["Justin::48"], "Justin", 1, 0, 0, 0, 0, 13, 0, 0, 0);
    insertPoints.run(playerIds["Mary::48"], "Mary", 10, 0, 0, 1, 4, 37, 0, 2, 0);
    insertPoints.run(playerIds["Shauhin::48"], "Shauhin", 11, 0, 0, 0, 5, 55, 0, 3, 0);
    insertPoints.run(playerIds["Eva::48"], "Eva", 14, 3, 1, 0, 6, 76, 1, 4, 0);
    insertPoints.run(playerIds["Joe::48"], "Joe", 14, 0, 0, 0, 4, 65, 4, 3, 0);
    insertPoints.run(playerIds["Thomas::48"], "Thomas", 2, 1, 0, 0, 0, 19, 0, 2, 0);
    insertPoints.run(playerIds["Bianca::48"], "Bianca", 3, 0, 0, 0, 0, 19, 0, 3, 0);
    insertPoints.run(playerIds["Star::48"], "Star", 9, 1, 0, 0, 2, 26, 0, 4, 0);
    insertPoints.run(playerIds["Kyle::48"], "Kyle", 14, 1, 2, 0, 5, 92, 2, 3, 0);
    insertPoints.run(playerIds["Mitch::48"], "Mitch", 12, 1, 1, 0, 3, 51, 0, 3, 0);
    insertPoints.run(playerIds["Kamilla::48"], "Kamilla", 13, 1, 0, 0, 6, 70, 2, 3, 0);
    insertPoints.run(playerIds["David::48"], "David", 8, 0, 0, 0, 4, 36, 1, 4, 0);
    insertPoints.run(playerIds["Charity::48"], "Charity", 4, 0, 0, 0, 1, 14, 0, 4, 0);
    insertPoints.run(playerIds["Chrissy::48"], "Chrissy", 7, 0, 0, 0, 1, 12, 0, 3, 0);

    insertMapping.run(participantIds["Joanne"], playerIds["Eva::48"], 1, 0, 0, 48);
    insertMapping.run(participantIds["Joanne"], playerIds["Joe::48"], 0, 1, 0, 48);
    insertMapping.run(participantIds["Joanne"], playerIds["Mitch::48"], 0, 0, 1, 48);
    insertMapping.run(participantIds["Joanne"], playerIds["Thomas::48"], 0, 0, 0, 48);
    insertMapping.run(participantIds["Joanne"], playerIds["Sai::48"], 0, 0, 0, 48);
    
    insertMapping.run(participantIds["Dan"], playerIds["Joe::48"], 1, 0, 0, 48);
    insertMapping.run(participantIds["Dan"], playerIds["Shauhin::48"], 0, 1, 0, 48);
    insertMapping.run(participantIds["Dan"], playerIds["Kamilla::48"], 0, 0, 1, 48);
    insertMapping.run(participantIds["Dan"], playerIds["Eva::48"], 0, 0, 0, 48);
    insertMapping.run(participantIds["Dan"], playerIds["Thomas::48"], 0, 0, 0, 48);

    insertMapping.run(participantIds["Ivy"], playerIds["Eva::48"], 1, 0, 0, 48);
    insertMapping.run(participantIds["Ivy"], playerIds["David::48"], 0, 1, 0, 48);
    insertMapping.run(participantIds["Ivy"], playerIds["Shauhin::48"], 0, 0, 1, 48);
    insertMapping.run(participantIds["Ivy"], playerIds["Joe::48"], 0, 0, 0, 48);
    insertMapping.run(participantIds["Ivy"], playerIds["Mary::48"], 0, 0, 0, 48);

    insertMapping.run(participantIds["Gavin"], playerIds["Mitch::48"], 1, 0, 0, 48);
    insertMapping.run(participantIds["Gavin"], playerIds["Joe::48"], 0, 1, 0, 48);
    insertMapping.run(participantIds["Gavin"], playerIds["Charity::48"], 0, 0, 1, 48);
    insertMapping.run(participantIds["Gavin"], playerIds["Eva::48"], 0, 0, 0, 48);
    insertMapping.run(participantIds["Gavin"], playerIds["Kevin::48"], 0, 0, 0, 48);

    insertMapping.run(participantIds["Geoff"], playerIds["Joe::48"], 1, 0, 0, 48);
    insertMapping.run(participantIds["Geoff"], playerIds["Thomas::48"], 0, 1, 0, 48);
    insertMapping.run(participantIds["Geoff"], playerIds["Eva::48"], 0, 0, 1, 48);
    insertMapping.run(participantIds["Geoff"], playerIds["Mitch::48"], 0, 0, 0, 48);
    insertMapping.run(participantIds["Geoff"], playerIds["Shauhin::48"], 0, 0, 0, 48);

    insertMapping.run(participantIds["Ben"], playerIds["Thomas::48"], 1, 0, 0, 48);
    insertMapping.run(participantIds["Ben"], playerIds["Kamilla::48"], 0, 1, 0, 48);
    insertMapping.run(participantIds["Ben"], playerIds["Shauhin::48"], 0, 0, 1, 48);
    insertMapping.run(participantIds["Ben"], playerIds["Eva::48"], 0, 0, 0, 48);
    insertMapping.run(participantIds["Ben"], playerIds["Joe::48"], 0, 0, 0, 48);

    insertMapping.run(participantIds["Cam"], playerIds["Thomas::48"], 1, 0, 0, 48);
    insertMapping.run(participantIds["Cam"], playerIds["Kamilla::48"], 0, 1, 0, 48);
    insertMapping.run(participantIds["Cam"], playerIds["Shauhin::48"], 0, 0, 1, 48);
    insertMapping.run(participantIds["Cam"], playerIds["Joe::48"], 0, 0, 0, 48);
    insertMapping.run(participantIds["Cam"], playerIds["Eva::48"], 0, 0, 0, 48);

    insertMapping.run(participantIds["Nanny"], playerIds["Joe::48"], 1, 0, 0, 48);
    insertMapping.run(participantIds["Nanny"], playerIds["Mitch::48"], 0, 1, 0, 48);
    insertMapping.run(participantIds["Nanny"], playerIds["Cedrek::48"], 0, 0, 1, 48);
    insertMapping.run(participantIds["Nanny"], playerIds["Mary::48"], 0, 0, 0, 48);
    insertMapping.run(participantIds["Nanny"], playerIds["Kamilla::48"], 0, 0, 0, 48);

    insertMapping.run(participantIds["Papa"], playerIds["Bianca::48"], 1, 0, 0, 48);
    insertMapping.run(participantIds["Papa"], playerIds["Joe::48"], 0, 1, 0, 48);
    insertMapping.run(participantIds["Papa"], playerIds["Mitch::48"], 0, 0, 1, 48);
    insertMapping.run(participantIds["Papa"], playerIds["Justin::48"], 0, 0, 0, 48);
    insertMapping.run(participantIds["Papa"], playerIds["Sai::48"], 0, 0, 0, 48);

    insertMapping.run(participantIds["Cal"], playerIds["Mary::48"], 1, 0, 0, 48);
    insertMapping.run(participantIds["Cal"], playerIds["Cedrek::48"], 0, 1, 0, 48);
    insertMapping.run(participantIds["Cal"], playerIds["Eva::48"], 0, 0, 1, 48);
    insertMapping.run(participantIds["Cal"], playerIds["Joe::48"], 0, 0, 0, 48);
    insertMapping.run(participantIds["Cal"], playerIds["Sai::48"], 0, 0, 0, 48);

    insertMapping.run(participantIds["Cara"], playerIds["Joe::48"], 1, 0, 0, 48);
    insertMapping.run(participantIds["Cara"], playerIds["Eva::48"], 0, 1, 0, 48);
    insertMapping.run(participantIds["Cara"], playerIds["Kyle::48"], 0, 0, 1, 48);
    insertMapping.run(participantIds["Cara"], playerIds["Thomas::48"], 0, 0, 0, 48);
    insertMapping.run(participantIds["Cara"], playerIds["Shauhin::48"], 0, 0, 0, 48);

    // CONTINUE ADDING INITIAL DATA (Season 49)
}