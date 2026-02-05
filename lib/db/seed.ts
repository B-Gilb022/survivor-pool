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

    // Season 49

    const players_s49 = [
        {name : "Alex", tribe: "Kele", season: 49, points: 119, eliminated: 1},
        {name : "Annie", tribe: "Kele", season: 49, points: 6, eliminated: 1},
        {name : "Jake", tribe: "Kele", season: 49, points: 23, eliminated: 1},
        {name : "Jason", tribe: "Hina", season: 49, points: 35, eliminated: 1},
        {name : "Jawan", tribe: "Uli", season: 49, points: 111, eliminated: 1},
        {name : "Jeremiah", tribe: "Kele", season: 49, points: 17, eliminated: 1},
        {name : "Kristina", tribe: "Hina", season: 49, points: 140, eliminated: 1},
        {name : "Matt", tribe: "Hina", season: 49, points: 33, eliminated: 1},
        {name : "MC", tribe: "Hina", season: 49, points: 91, eliminated: 1},
        {name : "Nate", tribe: "Uli", season: 49, points: 73, eliminated: 1},
        {name : "Nicole", tribe: "Kele", season: 49, points: 5, eliminated: 1},
        {name : "Rizo", tribe: "Uli", season: 49, points: 169, eliminated: 1},
        {name : "Sage", tribe: "Uli", season: 49, points: 177, eliminated: 0},
        {name : "Savannah", tribe: "Uli", season: 49, points: 239, eliminated: 0},
        {name : "Shannon", tribe: "Uli", season: 49, points: 60, eliminated: 1},
        {name : "Sophi", tribe: "Kele", season: 49, points: 204, eliminated: 0},
        {name : "Sophie", tribe: "Hina", season: 49, points: 144, eliminated: 1},
        {name : "Steven", tribe: "Hina", season: 49, points: 181, eliminated: 1}
    ];

    for (const player of players_s49) {
        const result = insertPlayer.run(player.name, player.tribe, player.season, player.points, player.eliminated);
        playerIds[`${player.name}::${player.season}`] = Number(result.lastInsertRowid);
    }

    insertPoints.run(playerIds["Alex::49"], "Alex", 7, 1, 1, 0, 2, 44, 0, 3, 1);
    insertPoints.run(playerIds["Annie::49"], "Annie", 0, 0, 0, 0, 0, 6, 0, 0, 0);
    insertPoints.run(playerIds["Jake::49"], "Jake", 1, 0, 0, 0, 0, 18, 0, 0, 0);
    insertPoints.run(playerIds["Jason::49"], "Jason", 3, 0, 0, 0, 0, 10, 0, 2, 0);
    insertPoints.run(playerIds["Jawan::49"], "Jawan", 8, 1, 1, 0, 1, 46, 0, 2, 0);
    insertPoints.run(playerIds["Jeremiah::49"], "Jeremiah", 1, 0, 0, 0, 0, 12, 0, 0, 0);
    insertPoints.run(playerIds["Kristina::49"], "Kristina", 11, 1, 1, 0, 2, 35, 0, 5, 1);
    insertPoints.run(playerIds["Matt::49"], "Matt", 2, 0, 0, 0, 0, 13, 0, 2, 0);
    insertPoints.run(playerIds["MC::49"], "MC", 6, 1, 0, 0, 0, 26, 0, 5, 1);
    insertPoints.run(playerIds["Nate::49"], "Nate", 5, 0, 0, 0, 1, 23, 0, 3, 1);
    insertPoints.run(playerIds["Nicole::49"], "Nicole", 0, 0, 0, 0, 0, 5, 0, 0, 0);
    insertPoints.run(playerIds["Rizo::49"], "Rizo", 12, 1, 0, 0, 3, 69, 0, 3, 1);
    insertPoints.run(playerIds["Sage::49"], "Sage", 13, 1, 1, 0, 3, 67, 0, 4, 0);
    insertPoints.run(playerIds["Savannah::49"], "Savannah", 13, 1, 1, 0, 4, 84, 4, 3, 1);
    insertPoints.run(playerIds["Shannon::49"], "Shannon", 4, 0, 0, 0, 0, 20, 0, 4, 0);
    insertPoints.run(playerIds["Sophi::49"], "Sophi", 13, 2, 2, 0, 0, 79, 1, 1, 1);
    insertPoints.run(playerIds["Sophie::49"], "Sophie", 9, 0, 0, 0, 3, 34, 2, 5, 1);
    insertPoints.run(playerIds["Steven::49"], "Steven", 10, 1, 1, 0, 4, 61, 2, 4, 0);

    insertMapping.run(participantIds["Joanne"], playerIds["MC::49"], 1, 0, 0, 49);
    insertMapping.run(participantIds["Joanne"], playerIds["Jake::49"], 0, 1, 0, 49);
    insertMapping.run(participantIds["Joanne"], playerIds["Sophi::49"], 0, 0, 1, 49);
    insertMapping.run(participantIds["Joanne"], playerIds["Rizo::49"], 0, 0, 0, 49);
    insertMapping.run(participantIds["Joanne"], playerIds["Shannon::49"], 0, 0, 0, 49);
    
    insertMapping.run(participantIds["Dan"], playerIds["Steven::49"], 1, 0, 0, 49);
    insertMapping.run(participantIds["Dan"], playerIds["Nate::49"], 0, 1, 0, 49);
    insertMapping.run(participantIds["Dan"], playerIds["Sophie::49"], 0, 0, 1, 49);
    insertMapping.run(participantIds["Dan"], playerIds["Jawan::49"], 0, 0, 0, 49);
    insertMapping.run(participantIds["Dan"], playerIds["Shannon::49"], 0, 0, 0, 49);

    insertMapping.run(participantIds["Ivy"], playerIds["Savannah::49"], 1, 0, 0, 49);
    insertMapping.run(participantIds["Ivy"], playerIds["MC::49"], 0, 1, 0, 49);
    insertMapping.run(participantIds["Ivy"], playerIds["Sophi::49"], 0, 0, 1, 49);
    insertMapping.run(participantIds["Ivy"], playerIds["Rizo::49"], 0, 0, 0, 49);
    insertMapping.run(participantIds["Ivy"], playerIds["Jason::49"], 0, 0, 0, 49);

    insertMapping.run(participantIds["Gavin"], playerIds["Jawan::49"], 1, 0, 0, 49);
    insertMapping.run(participantIds["Gavin"], playerIds["Shannon::49"], 0, 1, 0, 49);
    insertMapping.run(participantIds["Gavin"], playerIds["Matt::49"], 0, 0, 1, 49);
    insertMapping.run(participantIds["Gavin"], playerIds["Sophi::49"], 0, 0, 0, 49);
    insertMapping.run(participantIds["Gavin"], playerIds["Jake::49"], 0, 0, 0, 49);

    insertMapping.run(participantIds["Geoff"], playerIds["Savannah::49"], 1, 0, 0, 49);
    insertMapping.run(participantIds["Geoff"], playerIds["MC::49"], 0, 1, 0, 49);
    insertMapping.run(participantIds["Geoff"], playerIds["Jawan::49"], 0, 0, 1, 49);
    insertMapping.run(participantIds["Geoff"], playerIds["Alex::49"], 0, 0, 0, 49);
    insertMapping.run(participantIds["Geoff"], playerIds["Rizo::49"], 0, 0, 0, 49);

    insertMapping.run(participantIds["Ben"], playerIds["Savannah::49"], 1, 0, 0, 49);
    insertMapping.run(participantIds["Ben"], playerIds["Sophi::49"], 0, 1, 0, 49);
    insertMapping.run(participantIds["Ben"], playerIds["Shannon::49"], 0, 0, 1, 49);
    insertMapping.run(participantIds["Ben"], playerIds["Rizo::49"], 0, 0, 0, 49);
    insertMapping.run(participantIds["Ben"], playerIds["Alex::49"], 0, 0, 0, 49);

    insertMapping.run(participantIds["Cam"], playerIds["Savannah::49"], 1, 0, 0, 49);
    insertMapping.run(participantIds["Cam"], playerIds["Rizo::49"], 0, 1, 0, 49);
    insertMapping.run(participantIds["Cam"], playerIds["Sophi::49"], 0, 0, 1, 49);
    insertMapping.run(participantIds["Cam"], playerIds["Kristina::49"], 0, 0, 0, 49);
    insertMapping.run(participantIds["Cam"], playerIds["Jawan::49"], 0, 0, 0, 49);

    insertMapping.run(participantIds["Nanny"], playerIds["Rizo::49"], 1, 0, 0, 49);
    insertMapping.run(participantIds["Nanny"], playerIds["Jake::49"], 0, 1, 0, 49);
    insertMapping.run(participantIds["Nanny"], playerIds["Jeremiah::49"], 0, 0, 1, 49);
    insertMapping.run(participantIds["Nanny"], playerIds["Annie::49"], 0, 0, 0, 49);
    insertMapping.run(participantIds["Nanny"], playerIds["Jason::49"], 0, 0, 0, 49);

    insertMapping.run(participantIds["Papa"], playerIds["Savannah::49"], 1, 0, 0, 49);
    insertMapping.run(participantIds["Papa"], playerIds["Jake::49"], 0, 1, 0, 49);
    insertMapping.run(participantIds["Papa"], playerIds["Matt::49"], 0, 0, 1, 49);
    insertMapping.run(participantIds["Papa"], playerIds["Sophi::49"], 0, 0, 0, 49);
    insertMapping.run(participantIds["Papa"], playerIds["Kristina::49"], 0, 0, 0, 49);

    insertMapping.run(participantIds["Cal"], playerIds["Sophi::49"], 1, 0, 0, 49);
    insertMapping.run(participantIds["Cal"], playerIds["MC::49"], 0, 1, 0, 49);
    insertMapping.run(participantIds["Cal"], playerIds["Jason::49"], 0, 0, 1, 49);
    insertMapping.run(participantIds["Cal"], playerIds["Jeremiah::49"], 0, 0, 0, 49);
    insertMapping.run(participantIds["Cal"], playerIds["Shannon::49"], 0, 0, 0, 49);

    insertMapping.run(participantIds["Cara"], playerIds["Savannah::49"], 1, 0, 0, 49);
    insertMapping.run(participantIds["Cara"], playerIds["Rizo::49"], 0, 1, 0, 49);
    insertMapping.run(participantIds["Cara"], playerIds["Sophi::49"], 0, 0, 1, 49);
    insertMapping.run(participantIds["Cara"], playerIds["MC::49"], 0, 0, 0, 49);
    insertMapping.run(participantIds["Cara"], playerIds["Alex::49"], 0, 0, 0, 49);

    // Season 50

    const players_s50 = [
        {name : "Colby", tribe: "Vatu", season: 50, points: 0, eliminated: 0},
        {name : "Genevieve", tribe: "Vatu", season: 50, points: 0, eliminated: 0},
        {name : "Rizo", tribe: "Vatu", season: 50, points: 0, eliminated: 0},
        {name : "Angelina", tribe: "Vatu", season: 50, points: 0, eliminated: 0},
        {name : "Q", tribe: "Vatu", season: 50, points: 0, eliminated: 0},
        {name : "Stephanie", tribe: "Vatu", season: 50, points: 0, eliminated: 0},
        {name : "Kyle", tribe: "Vatu", season: 50, points: 0, eliminated: 0},
        {name : "Aubry", tribe: "Vatu", season: 50, points: 0, eliminated: 0},
        {name : "Joe", tribe: "Cila", season: 50, points: 0, eliminated: 0},
        {name : "Savannah", tribe: "Cila", season: 50, points: 0, eliminated: 0},
        {name : "Christian", tribe: "Cila", season: 50, points: 0, eliminated: 0},
        {name : "Cirie", tribe: "Cila", season: 50, points: 0, eliminated: 0},
        {name : "Ozzy", tribe: "Cila", season: 50, points: 0, eliminated: 0},
        {name : "Emily", tribe: "Cila", season: 50, points: 0, eliminated: 0},
        {name : "Rick", tribe: "Cila", season: 50, points: 0, eliminated: 0},
        {name : "Jenna", tribe: "Cila", season: 50, points: 0, eliminated: 0},
        {name : "Jonathan", tribe: "Kalo", season: 50, points: 0, eliminated: 0},
        {name : "Dee", tribe: "Kalo", season: 50, points: 0, eliminated: 0},
        {name : "Mike", tribe: "Kalo", season: 50, points: 0, eliminated: 0},
        {name : "Kamilla", tribe: "Kalo", season: 50, points: 0, eliminated: 0},
        {name : "Charlie", tribe: "Kalo", season: 50, points: 0, eliminated: 0},
        {name : "Tiffany", tribe: "Kalo", season: 50, points: 0, eliminated: 0},
        {name : "Coach", tribe: "Kalo", season: 50, points: 0, eliminated: 0},
        {name : "Chrissy", tribe: "Kalo", season: 50, points: 0, eliminated: 0}
    ];

    for (const player of players_s50) {
        const result = insertPlayer.run(player.name, player.tribe, player.season, player.points, player.eliminated);
        playerIds[`${player.name}::${player.season}`] = Number(result.lastInsertRowid);
    }

    insertPoints.run(playerIds["Colby::50"], "Colby", 0, 0, 0, 0, 0, 0, 0, 0, 0);
    insertPoints.run(playerIds["Genevieve::50"], "Genevieve", 0, 0, 0, 0, 0, 0, 0, 0, 0);
    insertPoints.run(playerIds["Rizo::50"], "Rizo", 0, 0, 0, 0, 0, 0, 0, 0, 0);
    insertPoints.run(playerIds["Angelina::50"], "Angelina", 0, 0, 0, 0, 0, 0, 0, 0, 0);
    insertPoints.run(playerIds["Q::50"], "Q", 0, 0, 0, 0, 0, 0, 0, 0, 0);
    insertPoints.run(playerIds["Stephanie::50"], "Stephanie", 0, 0, 0, 0, 0, 0, 0, 0, 0);
    insertPoints.run(playerIds["Kyle::50"], "Kyle", 0, 0, 0, 0, 0, 0, 0, 0, 0);
    insertPoints.run(playerIds["Aubry::50"], "Aubry", 0, 0, 0, 0, 0, 0, 0, 0, 0);
    insertPoints.run(playerIds["Joe::50"], "Joe", 0, 0, 0, 0, 0, 0, 0, 0, 0);
    insertPoints.run(playerIds["Savannah::50"], "Savannah", 0, 0, 0, 0, 0, 0, 0, 0, 0);
    insertPoints.run(playerIds["Christian::50"], "Christian", 0, 0, 0, 0, 0, 0, 0, 0, 0);
    insertPoints.run(playerIds["Cirie::50"], "Cirie", 0, 0, 0, 0, 0, 0, 0, 0, 0);
    insertPoints.run(playerIds["Ozzy::50"], "Ozzy", 0, 0, 0, 0, 0, 0, 0, 0, 0);
    insertPoints.run(playerIds["Emily::50"], "Emily", 0, 0, 0, 0, 0, 0, 0, 0, 0);
    insertPoints.run(playerIds["Rick::50"], "Rick", 0, 0, 0, 0, 0, 0, 0, 0, 0);
    insertPoints.run(playerIds["Jenna::50"], "Jenna", 0, 0, 0, 0, 0, 0, 0, 0, 0);
    insertPoints.run(playerIds["Jonathan::50"], "Jonathan", 0, 0, 0, 0, 0, 0, 0, 0, 0);
    insertPoints.run(playerIds["Dee::50"], "Dee", 0, 0, 0, 0, 0, 0, 0, 0, 0);
    insertPoints.run(playerIds["Mike::50"], "Mike", 0, 0, 0, 0, 0, 0, 0, 0, 0);
    insertPoints.run(playerIds["Kamilla::50"], "Kamilla", 0, 0, 0, 0, 0, 0, 0, 0, 0);
    insertPoints.run(playerIds["Charlie::50"], "Charlie", 0, 0, 0, 0, 0, 0, 0, 0, 0);
    insertPoints.run(playerIds["Tiffany::50"], "Tiffany", 0, 0, 0, 0, 0, 0, 0, 0, 0);
    insertPoints.run(playerIds["Coach::50"], "Coach", 0, 0, 0, 0, 0, 0, 0, 0, 0);
    insertPoints.run(playerIds["Chrissy::50"], "Chrissy", 0, 0, 0, 0, 0, 0, 0, 0, 0);

    // Add in Player Choices for Season 50 here
}