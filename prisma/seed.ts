import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function seedDatabase() {
  const participantNames = [
    "Ben", "Cam", "Geoff", "Ivy", "Gavin", "Dan", "Joanne", "Nanny", "Papa", "Cara", "Cal"
  ];

  // Check if Participants already exist
  const participantCount = await prisma.participant.count();
  if (participantCount > 0) return; // Database already seeded

  // Create participants
  const participants = await Promise.all(
    participantNames.map(async (name) => {
      return prisma.participant.create({
        data: {
          participantName: name,
        },
      });
    })
  );

  // Create players for Season 47
  const players_s47 = [
    { name: "Andy", tribe: "Gata", season: 47, points: 165, eliminated: true },
    { name: "Anika", tribe: "Gata", season: 47, points: 44, eliminated: true },
    { name: "Aysha", tribe: "Lavo", season: 47, points: 30, eliminated: true },
    { name: "Caroline", tribe: "Tuku", season: 47, points: 115, eliminated: true },
    { name: "Gabe", tribe: "Tuku", season: 47, points: 127, eliminated: true },
    { name: "Genevieve", tribe: "Lavo", season: 47, points: 167, eliminated: true },
    { name: "Rome", tribe: "Lavo", season: 47, points: 88, eliminated: true },
    { name: "Jon", tribe: "Gata", season: 47, points: 9, eliminated: true },
    { name: "Kishan", tribe: "Lavo", season: 47, points: 25, eliminated: true },
    { name: "Kyle", tribe: "Tuku", season: 47, points: 149, eliminated: true },
    { name: "Rachel", tribe: "Gata", season: 47, points: 256, eliminated: false },
    { name: "Sam", tribe: "Gata", season: 47, points: 213, eliminated: false },
    { name: "Sierra", tribe: "Gata", season: 47, points: 82, eliminated: true },
    { name: "Sol", tribe: "Lavo", season: 47, points: 103, eliminated: true },
    { name: "Sue", tribe: "Tuku", season: 47, points: 169, eliminated: false },
    { name:"Teeny", tribe:"Lavo", season: 47 ,points: 185 , eliminated: true },
    { name: "TK", tribe: "Tuku", season: 47, points: 12, eliminated: true },
    { name: "Tiyana", tribe: "Tuku", season: 47, points: 64, eliminated: true }
  ];

  const players47 = await Promise.all(
    players_s47.map(async (player) => {
      return prisma.player.create({
        data: {
          playerName: player.name,
          tribeName: player.tribe,
          season: player.season,
          totalPoints: player.points,
          eliminated: player.eliminated,
        },
      });
    })
  );

  // Insert Player Points
  const pointsData47 = [
    { playerId: players47.find(p => p.playerName === "Andy" && p.season === 47)!.playerId, playerName: "Andy", season: 47, points: [11, 1, 1, 0, 2, 70, 0, 4, 0] },
    { playerId: players47.find(p => p.playerName === "Anika" && p.season === 47)!.playerId, playerName: "Anika", season: 47, points: [3, 0, 0, 0, 0, 14, 0, 3, 0] },
    { playerId: players47.find(p => p.playerName === "Aysha" && p.season === 47)!.playerId, playerName: "Aysha", season: 47, points: [1, 0, 0, 0, 0, 20, 0, 1, 0] },
    { playerId: players47.find(p => p.playerName === "Caroline" && p.season === 47)!.playerId, playerName: "Caroline", season: 47, points: [10, 1, 1, 0, 0, 35, 0, 3, 1] },
    { playerId: players47.find(p => p.playerName === "Gabe" && p.season === 47)!.playerId, playerName: "Gabe", season: 47, points: [8, 0, 1, 0, 1, 52, 1, 3, 0] },
    { playerId: players47.find(p => p.playerName === "Genevieve" && p.season === 47)!.playerId , playerName:"Genevieve", season: 47, points: [12 ,0 ,0 ,0 ,4 ,62 ,1 ,3 ,0] },
    { playerId: players47.find(p => p.playerName === "Rome" && p.season === 47)!.playerId, playerName: "Rome", season: 47, points: [4, 2, 2, 0, 0, 38, 0, 2, 0] },
    { playerId: players47.find(p => p.playerName === "Jon" && p.season === 47)!.playerId, playerName: "Jon", season: 47, points: [0, 0, 0, 0, 0, 9, 0, 0, 0] },
    { playerId: players47.find(p => p.playerName === "Kishan" && p.season === 47)!.playerId, playerName: "Kishan", season: 47, points: [2, 0, 0, 0, 0, 10, 0, 1, 0] },
    { playerId: players47.find(p => p.playerName === "Kyle" && p.season === 47)!.playerId, playerName: "Kyle", season: 47, points: [9, 0, 0, 0, 3, 29, 4, 3, 1] },
    { playerId: players47.find(p => p.playerName === "Rachel" && p.season === 47)!.playerId , playerName:"Rachel", season: 47, points: [14 ,2 ,3 ,1 ,2 ,86 ,4 ,3 ,1] },
    { playerId: players47.find(p => p.playerName === "Sam" && p.season === 47)!.playerId , playerName:"Sam", season: 47, points: [14 ,1 ,0 ,0 ,4 ,93 ,0 ,4 ,1] },
    { playerId: players47.find(p => p.playerName === "Sierra" && p.season === 47)!.playerId , playerName:"Sierra", season: 47, points: [6 ,0 ,0 ,0 ,2 ,22 ,0 ,4 ,0] },
    { playerId: players47.find(p => p.playerName === "Sol" && p.season === 47)!.playerId , playerName:"Sol", season: 47, points: [7 ,1 ,1 ,0 ,2 ,33 ,0 ,3 ,0] },
    { playerId: players47.find(p => p.playerName === "Sue" && p.season === 47)!.playerId, playerName:"Sue", season: 47, points: [14, 1, 0, 0, 2, 54, 1, 3, 1] },
    { playerId: players47.find(p => p.playerName === "Teeny" && p.season === 47)!.playerId, playerName:"Teeny", season: 47, points: [13, 1, 1, 0, 4, 70, 0, 3, 1] },
    { playerId: players47.find(p => p.playerName === "TK" && p.season === 47)!.playerId, playerName:"TK", season: 47, points: [0, 0, 0, 0, 0, 12, 0, 0, 0] },
    { playerId: players47.find(p => p.playerName === "Tiyana" && p.season === 47)!.playerId, playerName:"Tiyana", season: 47, points: [5, 0, 0, 0, 0, 19, 0, 3, 1] },
  ];

  await Promise.all(
    pointsData47.map(async (data) => {
      return prisma.playerPoints.create({
        data: {
          playerId: data.playerId,
          playerName: data.playerName,
          season: data.season,
          remainInTheGamePts: data.points[0],
          foundAdvantagePts: data.points[1],
          usedAdvantagePts: data.points[2],
          shotInTheDarkPts: data.points[3],
          individualRewardPts: data.points[4],
          confessionalPts: data.points[5],
          individualImmunityPts: data.points[6],
          tribalImmunityPts: data.points[7],
          tribalRewardPts: data.points[8],
        }
      });
    })
  );
  
  const participantPicks47 = [
    {
      participant: "Joanne",
      picks: [
        ["Kyle", 1, 0, 0],
        ["TK", 0, 1, 0],
        ["Teeny", 0, 0, 1],
        ["Caroline", 0, 0, 0],
        ["Andy", 0, 0, 0],
      ],
    },
    {
      participant: "Dan",
      picks: [
        ["Tiyana", 1, 0, 0],
        ["TK", 0, 1, 0],
        ["Sol", 0, 0, 1],
        ["Genevieve", 0, 0, 0],
        ["Rome", 0, 0, 0],
      ],
    },
    {
      participant: "Ivy",
      picks: [
        ["Teeny", 1, 0, 0],
        ["Sue", 0, 1, 0],
        ["Rachel", 0, 0, 1],
        ["Caroline", 0, 0, 0],
        ["Andy", 0, 0, 0],
      ],
    },
    {
      participant: "Gavin",
      picks: [
        ["Kyle", 1, 0, 0],
        ["Genevieve", 0, 1, 0],
        ["Tiyana", 0, 0, 1],
        ["Kishan", 0, 0, 0],
        ["Gabe", 0, 0, 0],
      ],
    },
    {
      participant: "Geoff",
      picks: [
        ["Teeny", 1, 0, 0],
        ["Tiyana", 0, 1, 0],
        ["Kishan", 0, 0, 1],
        ["TK", 0, 0, 0],
        ["Sierra", 0, 0, 0],
      ],
    },
    {
      participant: "Ben",
      picks: [
        ["Sam", 1, 0, 0],
        ["Teeny", 0, 1, 0],
        ["Tiyana", 0, 0, 1],
        ["TK", 0, 0, 0],
        ["Aysha", 0, 0, 0],
      ],
    },
    {
      participant: "Cam",
      picks: [
        ["Sam", 1, 0, 0],
        ["Teeny", 0, 1, 0],
        ["Tiyana", 0, 0, 1],
        ["TK", 0, 0, 0],
        ["Aysha", 0, 0, 0],
      ],
    },
    {
      participant: "Nanny",
      picks: [
        ["Genevieve", 1, 0, 0],
        ["Anika", 0, 1, 0],
        ["Kyle", 0, 0, 1],
        ["Sue", 0, 0, 0],
        ["Sol", 0, 0, 0],
      ],
    },
    {
      participant: "Papa",
      picks: [
        ["Sierra", 1, 0, 0],
        ["Kyle", 0, 1, 0],
        ["TK", 0, 0, 1],
        ["Sue", 0, 0, 0],
        ["Tiyana", 0, 0, 0],
      ],
    },
    {
      participant: "Cal",
      picks: [
        ["Kyle", 1, 0, 0],
        ["Sue", 0, 1, 0],
        ["Kishan", 0, 0, 1],
        ["Sol", 0, 0, 0],
        ["Aysha", 0, 0, 0],
      ],
    },
    {
      participant: "Cara",
      picks: [
        ["Tiyana", 1, 0, 0],
        ["Sam", 0, 1, 0],
        ["Teeny", 0, 0, 1],
        ["Aysha", 0, 0, 0],
        ["Sue", 0, 0, 0],
      ],
    },
  ];

  const mappings47 = participantPicks47.flatMap(({ participant, picks }) =>
    picks.map(([player, first, second, third]) => ({
      participantId: participants.find(p => p.participantName === participant)!.participantId,
      playerId: players47.find(p => p.playerName === player && p.season === 47)!.playerId,
      season: 47,
      first: Boolean(first),
      second: Boolean(second),
      third: Boolean(third),
    }))
  );

  await prisma.participantsMapper.createMany({
    data: mappings47,
  });

  // SEASON 48

  const players_s48 = [
      {name : "Stephanie", tribe: "Vula", season: 48, points: 6, eliminated: true},
      {name : "Sai", tribe: "Vula", season: 48, points: 98, eliminated: true},
      {name : "Kevin", tribe: "Vula", season: 48, points: 16, eliminated: true},
      {name : "Cedrek", tribe: "Vula", season: 48, points: 59, eliminated: true},
      {name : "Justin", tribe: "Vula", season: 48, points: 18, eliminated: true},
      {name : "Mary", tribe: "Vula", season: 48, points: 122, eliminated: true},
      {name : "Shauhin", tribe: "Lagi", season: 48, points: 150, eliminated: true},
      {name : "Eva", tribe: "Lagi", season: 48, points: 226, eliminated: false},
      {name : "Joe", tribe: "Lagi", season: 48, points: 210, eliminated: false},
      {name : "Thomas", tribe: "Lagi", season: 48, points: 44, eliminated: true},
      {name : "Bianca", tribe: "Lagi", season: 48, points: 49, eliminated: true},
      {name : "Star", tribe: "Lagi", season: 48, points: 106, eliminated: true},
      {name : "Kyle", tribe: "Civa", season: 48, points: 237, eliminated: false},
      {name : "Mitch", tribe: "Civa", season: 48, points: 151, eliminated: true},
      {name : "Kamilla", tribe: "Civa", season: 48, points: 205, eliminated: true},
      {name : "David", tribe: "Civa", season: 48, points: 126, eliminated: true},
      {name : "Charity", tribe: "Civa", season: 48, points: 59, eliminated: true},
      {name : "Chrissy", tribe: "Civa", season: 48, points: 67, eliminated: true}
  ];

  const players48 = await Promise.all(
    players_s48.map(async (player) => {
      return prisma.player.create({
        data: {
          playerName: player.name,
          tribeName: player.tribe,
          season: player.season,
          totalPoints: player.points,
          eliminated: player.eliminated,
        },
      });
    })
  );

  const pointsData48 = [
    { playerId: players48.find(p => p.playerName === "Stephanie" && p.season === 48)!.playerId, playerName: "Stephanie", season: 48, points: [0, 0, 0, 0, 0, 6, 0, 0, 0] },
    { playerId: players48.find(p => p.playerName === "Sai" && p.season === 48)!.playerId, playerName: "Sai", season: 48, points: [5, 1, 1, 0, 1, 53, 0, 1, 0] },
    { playerId: players48.find(p => p.playerName === "Kevin" && p.season === 48)!.playerId, playerName: "Kevin", season: 48, points: [0, 0, 0, 0, 0, 16, 0, 0, 0] },
    { playerId: players48.find(p => p.playerName === "Cedrek" && p.season === 48)!.playerId, playerName: "Cedrek", season: 48, points: [6, 0, 0, 0, 1, 19, 0, 1, 0] },
    { playerId: players48.find(p => p.playerName === "Justin" && p.season === 48)!.playerId , playerName:"Justin", season:48 , points:[1, 0, 0, 0, 0, 13, 0, 0, 0] },
    { playerId: players48.find(p => p.playerName === "Mary" && p.season === 48)!.playerId , playerName:"Mary", season: 48, points: [10, 0, 0, 1, 4, 37, 0, 2, 0] },
    { playerId: players48.find(p => p.playerName === "Shauhin" && p.season === 48)!.playerId, playerName: "Shauhin", season: 48, points: [11, 0, 0, 0, 5, 55, 0, 3, 0] },
    { playerId: players48.find(p => p.playerName === "Eva" && p.season === 48)!.playerId, playerName: "Eva", season: 48, points: [14, 3, 1, 0, 6, 76, 1, 4, 0] },
    { playerId: players48.find(p => p.playerName === "Joe" && p.season === 48)!.playerId, playerName: "Joe", season: 48, points: [14, 0, 0, 0, 4, 65, 4, 3, 0] },
    { playerId: players48.find(p => p.playerName === "Thomas" && p.season === 48)!.playerId, playerName: "Thomas", season: 48, points: [2, 1, 0, 0, 0, 19, 0, 2, 0] },
    { playerId: players48.find(p => p.playerName === "Bianca" && p.season === 48)!.playerId , playerName:"Bianca", season: 48, points: [3, 0, 0, 0, 0, 19, 0, 3, 0] },
    { playerId: players48.find(p => p.playerName === "Star" && p.season === 48)!.playerId , playerName:"Star", season: 48, points: [9, 1, 0, 0, 2, 26, 0, 4, 0] },
    { playerId: players48.find(p => p.playerName === "Kyle" && p.season === 48)!.playerId , playerName:"Kyle", season: 48, points: [14, 1, 2, 0, 5, 92, 2, 3, 0] },
    { playerId: players48.find(p => p.playerName === "Mitch" && p.season === 48)!.playerId , playerName:"Mitch", season: 48, points: [12, 1, 1, 0, 3, 51, 0, 3, 0] },
    { playerId: players48.find(p => p.playerName === "Kamilla" && p.season === 48)!.playerId, playerName:"Kamilla", season: 48, points: [13, 1, 0, 0, 6, 70, 2, 3, 0] },
    { playerId: players48.find(p => p.playerName === "David" && p.season === 48)!.playerId, playerName:"David", season: 48, points: [8, 0, 0, 0, 4, 36, 1, 4, 0] },
    { playerId: players48.find(p => p.playerName === "Charity" && p.season === 48)!.playerId, playerName:"Charity", season: 48, points: [4, 0, 0, 0, 1, 14, 0, 4, 0] },
    { playerId: players48.find(p => p.playerName === "Chrissy" && p.season === 48)!.playerId, playerName:"Chrissy", season: 48, points: [7, 0, 0, 0, 1, 12, 0, 3, 0] },
   ];

  await Promise.all(
    pointsData48.map(async (data) => {
      return prisma.playerPoints.create({
        data: {
          playerId: data.playerId,
          playerName: data.playerName,
          season: data.season,
          remainInTheGamePts: data.points[0],
          foundAdvantagePts: data.points[1],
          usedAdvantagePts: data.points[2],
          shotInTheDarkPts: data.points[3],
          individualRewardPts: data.points[4],
          confessionalPts: data.points[5],
          individualImmunityPts: data.points[6],
          tribalImmunityPts: data.points[7],
          tribalRewardPts: data.points[8],
        }
      });
    })
  );

  const participantPicks48 = [
    {
      participant: "Joanne",
      picks: [
        ["Eva", 1, 0, 0],
        ["Joe", 0, 1, 0],
        ["Mitch", 0, 0, 1],
        ["Thomas", 0, 0, 0],
        ["Sai", 0, 0, 0],
      ],
    },
    {
      participant: "Dan",
      picks: [
        ["Joe", 1, 0, 0],
        ["Shauhin", 0, 1, 0],
        ["Kamilla", 0, 0, 1],
        ["Eva", 0, 0, 0],
        ["Thomas", 0, 0, 0],
      ],
    },
    {
      participant: "Ivy",
      picks: [
        ["Eva", 1, 0, 0],
        ["David", 0, 1, 0],
        ["Shauhin", 0, 0, 1],
        ["Joe", 0, 0, 0],
        ["Mary", 0, 0, 0],
      ],
    },
    {
      participant: "Gavin",
      picks: [
        ["Mitch", 1, 0, 0],
        ["Joe", 0, 1, 0],
        ["Charity", 0, 0, 1],
        ["Eva", 0, 0, 0],
        ["Kevin", 0, 0, 0],
      ],
    },
    {
      participant: "Geoff",
      picks: [
        ["Joe", 1, 0, 0],
        ["Thomas", 0, 1, 0],
        ["Eva", 0, 0, 1],
        ["Mitch", 0, 0, 0],
        ["Shauhin", 0, 0, 0],
      ],
    },
    {
      participant: "Ben",
      picks: [
        ["Thomas", 1, 0, 0],
        ["Kamilla", 0, 1, 0],
        ["Shauhin", 0, 0, 1],
        ["Eva", 0, 0, 0],
        ["Joe", 0, 0, 0],
      ],
    },
    {
      participant: "Cam",
      picks: [
        ["Thomas", 1, 0, 0],
        ["Kamilla", 0, 1, 0],
        ["Shauhin", 0, 0, 1],
        ["Eva", 0, 0, 0],
        ["Joe", 0, 0, 0],
      ],
    },
    {
      participant: "Nanny",
      picks: [
        ["Joe", 1, 0, 0],
        ["Mitch", 0, 1, 0],
        ["Cedrek", 0, 0, 1],
        ["Mary", 0, 0, 0],
        ["Kamilla", 0, 0, 0],
      ],
    },
    {
      participant: "Papa",
      picks: [
        ["Bianca", 1, 0, 0],
        ["Joe", 0, 1, 0],
        ["Mitch", 0, 0, 1],
        ["Justin", 0, 0, 0],
        ["Sai", 0, 0, 0],
      ],
    },
    {
      participant: "Cal",
      picks: [
        ["Mary", 1, 0, 0],
        ["Cedrek", 0, 1, 0],
        ["Eva", 0, 0, 1],
        ["Joe", 0, 0, 0],
        ["Sai", 0, 0, 0],
      ],
    },
    {
      participant: "Cara",
      picks: [
        ["Joe", 1, 0, 0],
        ["Eva", 0, 1, 0],
        ["Kyle", 0, 0, 1],
        ["Thomas", 0, 0, 0],
        ["Shauhin", 0, 0, 0],
      ],
    },
  ];

  const mappings48 = participantPicks48.flatMap(({ participant, picks }) =>
    picks.map(([playerName, first, second, third]) => ({
      participantId: participants.find(p => p.participantName === participant)!.participantId,
      playerId: players48.find(p => p.playerName === playerName && p.season === 48)!.playerId,
      season: 48,
      first: Boolean(first),
      second: Boolean(second),
      third: Boolean(third),
    }))
  );

  await prisma.participantsMapper.createMany({
    data: mappings48,
  });

  // SEASON 49

  const players_s49 = [
    {name : "Alex", tribe: "Kele", season: 49, points: 119, eliminated: true},
    {name : "Annie", tribe: "Kele", season: 49, points: 6, eliminated: true},
    {name : "Jake", tribe: "Kele", season: 49, points: 23, eliminated: true},
    {name : "Jason", tribe: "Hina", season: 49, points: 35, eliminated: true},
    {name : "Jawan", tribe: "Uli", season: 49, points: 111, eliminated: true},
    {name : "Jeremiah", tribe: "Kele", season: 49, points: 17, eliminated: true},
    {name : "Kristina", tribe: "Hina", season: 49, points: 140, eliminated: true},
    {name : "Matt", tribe: "Hina", season: 49, points: 33, eliminated: true},
    {name : "MC", tribe: "Hina", season: 49, points: 91, eliminated: true},
    {name : "Nate", tribe: "Uli", season: 49, points: 73, eliminated: true},
    {name : "Nicole", tribe: "Kele", season: 49, points: 5, eliminated: true},
    {name : "Rizo", tribe: "Uli", season: 49, points: 169, eliminated: true},
    {name : "Sage", tribe: "Uli", season: 49, points: 177, eliminated: false},
    {name : "Savannah", tribe: "Uli", season: 49, points: 239, eliminated: false},
    {name : "Shannon", tribe: "Uli", season: 49, points: 60, eliminated: true},
    {name : "Sophi", tribe: "Kele", season: 49, points: 204, eliminated: false},
    {name : "Sophie", tribe: "Hina", season: 49, points: 144, eliminated: true},
    {name : "Steven", tribe: "Hina", season: 49, points: 181, eliminated: true}
  ];

  const players49 = await Promise.all(
    players_s49.map(async (player) => {
      return prisma.player.create({
        data: {
          playerName: player.name,
          tribeName: player.tribe,
          season: player.season,
          totalPoints: player.points,
          eliminated: player.eliminated,
        },
      });
    })
  );

  const pointsData49 = [
    { playerId: players49.find(p => p.playerName === "Alex" && p.season === 49)!.playerId, playerName: "Alex", season: 49, points: [7, 1, 1, 0, 2, 44, 0, 3, 1] },
    { playerId: players49.find(p => p.playerName === "Annie" && p.season === 49)!.playerId, playerName: "Annie", season: 49, points: [0, 0, 0, 0, 0, 6, 0, 0, 0] },
    { playerId: players49.find(p => p.playerName === "Jake" && p.season === 49)!.playerId, playerName: "Jake", season: 49, points: [1, 0, 0, 0, 0, 18, 0, 0, 0] },
    { playerId: players49.find(p => p.playerName === "Jason" && p.season === 49)!.playerId, playerName: "Jason", season: 49, points: [3, 0, 0, 0, 0, 10, 0, 2, 0] },
    { playerId: players49.find(p => p.playerName === "Jawan" && p.season === 49)!.playerId , playerName:"Jawan", season:49 , points:[8, 1, 1, 0, 1, 46, 0, 2, 0] },
    { playerId: players49.find(p => p.playerName === "Jeremiah" && p.season === 49)!.playerId , playerName:"Jeremiah", season: 49, points: [1, 0, 0, 0, 0, 12, 0, 0, 0] },
    { playerId: players49.find(p => p.playerName === "Kristina" && p.season === 49)!.playerId, playerName: "Kristina", season: 49, points: [11, 1, 1, 0, 2, 35, 0, 5, 1] },
    { playerId: players49.find(p => p.playerName === "Matt" && p.season === 49)!.playerId, playerName: "Matt", season: 49, points: [2, 0, 0, 0, 0, 13, 0, 2, 0] },
    { playerId: players49.find(p => p.playerName === "MC" && p.season === 49)!.playerId, playerName: "MC", season: 49, points: [6, 1, 0, 0, 0, 26, 0, 5, 1] },
    { playerId: players49.find(p => p.playerName === "Nate" && p.season === 49)!.playerId , playerName:"Nate", season:49 , points:[5, 0, 0, 0, 1, 23, 0, 3, 1] },
    { playerId: players49.find(p => p.playerName === "Nicole" && p.season === 49)!.playerId , playerName:"Nicole", season: 49, points: [0, 0, 0, 0, 0, 5, 0, 0, 0] },
    { playerId: players49.find(p => p.playerName === "Rizo" && p.season === 49)!.playerId , playerName:"Rizo", season: 49, points: [12, 1, 0, 0, 3, 69, 0, 3, 1] },
    { playerId: players49.find(p => p.playerName === "Sage" && p.season === 49)!.playerId , playerName:"Sage", season: 49, points: [13, 1, 1, 0, 3, 67, 0, 4, 0] },
    { playerId: players49.find(p => p.playerName === "Savannah" && p.season === 49)!.playerId , playerName:"Savannah", season: 49, points: [13, 1, 1, 0, 4, 84, 4, 3, 1] },
    { playerId: players49.find(p => p.playerName === "Shannon" && p.season === 49)!.playerId, playerName:"Shannon", season: 49, points: [4, 0, 0, 0, 0, 20, 0, 4, 0] },
    { playerId: players49.find(p => p.playerName === "Sophi" && p.season === 49)!.playerId , playerName:"Sophi", season:49 , points:[13, 2, 2, 0, 0, 79, 1, 1, 1] },
    { playerId: players49.find(p => p.playerName === "Sophie" && p.season === 49)!.playerId , playerName:"Sophie", season:49 , points:[9, 0, 0, 0, 3, 34, 2, 5, 1] },
    { playerId: players49.find(p => p.playerName === "Steven" && p.season === 49)!.playerId , playerName:"Steven", season:49 , points:[10, 1, 1, 0, 4, 61, 2, 4, 0] },
   ];

  await Promise.all(
    pointsData49.map(async (data) => {
      return prisma.playerPoints.create({
        data: {
          playerId: data.playerId,
          playerName: data.playerName,
          season: data.season,
          remainInTheGamePts: data.points[0],
          foundAdvantagePts: data.points[1],
          usedAdvantagePts: data.points[2],
          shotInTheDarkPts: data.points[3],
          individualRewardPts: data.points[4],
          confessionalPts: data.points[5],
          individualImmunityPts: data.points[6],
          tribalImmunityPts: data.points[7],
          tribalRewardPts: data.points[8],
        }
      });
    })
  );

  const participantPicks49 = [
    {
      participant: "Joanne",
      picks: [
        ["MC", 1, 0, 0],
        ["Jake", 0, 1, 0],
        ["Sophi", 0, 0, 1],
        ["Rizo", 0, 0, 0],
        ["Shannon", 0, 0, 0],
      ],
    },
    {
      participant: "Dan",
      picks: [
        ["Steven", 1, 0, 0],
        ["Nate", 0, 1, 0],
        ["Sophie", 0, 0, 1],
        ["Jawan", 0, 0, 0],
        ["Shannon", 0, 0, 0],
      ],
    },
    {
      participant: "Ivy",
      picks: [
        ["Savannah", 1, 0, 0],
        ["MC", 0, 1, 0],
        ["Sophi", 0, 0, 1],
        ["Rizo", 0, 0, 0],
        ["Jason", 0, 0, 0],
      ],
    },
    {
      participant: "Gavin",
      picks: [
        ["Jawan", 1, 0, 0],
        ["Shannon", 0, 1, 0],
        ["Matt", 0, 0, 1],
        ["Sophi", 0, 0, 0],
        ["Jake", 0, 0, 0],
      ],
    },
    {
      participant: "Geoff",
      picks: [
        ["Savannah", 1, 0, 0],
        ["MC", 0, 1, 0],
        ["Jawan", 0, 0, 1],
        ["Alex", 0, 0, 0],
        ["Rizo", 0, 0, 0],
      ],
    },
    {
      participant: "Ben",
      picks: [
        ["Savannah", 1, 0, 0],
        ["Sophi", 0, 1, 0],
        ["Shannon", 0, 0, 1],
        ["Rizo", 0, 0, 0],
        ["Alex", 0, 0, 0],
      ],
    },
    {
      participant: "Cam",
      picks: [
        ["Savannah", 1, 0, 0],
        ["Rizo", 0, 1, 0],
        ["Sophi", 0, 0, 1],
        ["Kristina", 0, 0, 0],
        ["Jawan", 0, 0, 0],
      ],
    },
    {
      participant: "Nanny",
      picks: [
        ["Rizo", 1, 0, 0],
        ["Jake", 0, 1, 0],
        ["Jeremiah", 0, 0, 1],
        ["Annie", 0, 0, 0],
        ["Jason", 0, 0, 0],
      ],
    },
    {
      participant: "Papa",
      picks: [
        ["Savannah", 1, 0, 0],
        ["Jake", 0, 1, 0],
        ["Matt", 0, 0, 1],
        ["Sophi", 0, 0, 0],
        ["Kristina", 0, 0, 0],
      ],
    },
    {
      participant: "Cal",
      picks: [
        ["Sophi", 1, 0, 0],
        ["MC", 0, 1, 0],
        ["Jason", 0, 0, 1],
        ["Jeremiah", 0, 0, 0],
        ["Shannon", 0, 0, 0],
      ],
    },
    {
      participant: "Cara",
      picks: [
        ["Savannah", 1, 0, 0],
        ["Rizo", 0, 1, 0],
        ["Sophi", 0, 0, 1],
        ["MC", 0, 0, 0],
        ["Alex", 0, 0, 0],
      ],
    },
  ];

  const mappings49 = participantPicks49.flatMap(({ participant, picks }) =>
    picks.map(([playerName, first, second, third]) => ({
      participantId: participants.find(p => p.participantName === participant)!.participantId,
      playerId: players49.find(p => p.playerName === playerName && p.season === 49)!.playerId,
      season: 49,
      first: Boolean(first),
      second: Boolean(second),
      third: Boolean(third),
    }))
  );

  await prisma.participantsMapper.createMany({
    data: mappings49,
  });

  // SEASON 50 - Add here
  
  const players_s50 = [
      {name : "Colby", tribe: "Vatu", season: 50, points: 42, eliminated: false},
      {name : "Genevieve", tribe: "Vatu", season: 50, points: 54, eliminated: false},
      {name : "Rizo", tribe: "Vatu", season: 50, points: 42, eliminated: false},
      {name : "Angelina", tribe: "Vatu", season: 50, points: 35, eliminated: false},
      {name : "Q", tribe: "Vatu", season: 50, points: 43, eliminated: true},
      {name : "Stephanie", tribe: "Vatu", season: 50, points: 38, eliminated: false},
      {name : "Kyle", tribe: "Vatu", season: 50, points: 14, eliminated: true},
      {name : "Aubry", tribe: "Vatu", season: 50, points: 43, eliminated: false},
      {name : "Joe", tribe: "Cila", season: 50, points: 40, eliminated: false},
      {name : "Savannah", tribe: "Cila", season: 50, points: 31, eliminated: true},
      {name : "Christian", tribe: "Cila", season: 50, points: 53, eliminated: false},
      {name : "Cirie", tribe: "Cila", season: 50, points: 41, eliminated: false},
      {name : "Ozzy", tribe: "Cila", season: 50, points: 53, eliminated: false},
      {name : "Emily", tribe: "Cila", season: 50, points: 38, eliminated: false},
      {name : "Rick", tribe: "Cila", season: 50, points: 44, eliminated: false},
      {name : "Jenna", tribe: "Cila", season: 50, points: 4, eliminated: true},
      {name : "Jonathan", tribe: "Kalo", season: 50, points: 47, eliminated: false},
      {name : "Dee", tribe: "Kalo", season: 50, points: 43, eliminated: false},
      {name : "Mike", tribe: "Kalo", season: 50, points: 47, eliminated: false},
      {name : "Kamilla", tribe: "Kalo", season: 50, points: 43, eliminated: false},
      {name : "Charlie", tribe: "Kalo", season: 50, points: 47, eliminated: false},
      {name : "Tiffany", tribe: "Kalo", season: 50, points: 42, eliminated: false},
      {name : "Coach", tribe: "Kalo", season: 50, points: 51, eliminated: false},
      {name : "Chrissy", tribe: "Kalo", season: 50, points: 44, eliminated: false}
  ];

  const players50 = await Promise.all(
    players_s50.map(async (player) => {
      return prisma.player.create({
        data: {
          playerName: player.name,
          tribeName: player.tribe,
          season: player.season,
          totalPoints: player.points,
          eliminated: player.eliminated,
        },
      });
    })
  );

  const pointsData50 = [
    { playerId: players50.find(p => p.playerName === "Colby" && p.season === 50)!.playerId, playerName: "Colby", season: 50, points: [4, 0, 0, 0, 0, 7, 0, 3, 0] },
    { playerId: players50.find(p => p.playerName === "Genevieve" && p.season === 50)!.playerId, playerName: "Genevieve", season: 50, points: [4, 1, 0, 0, 0, 14, 0, 3, 0] },
    { playerId: players50.find(p => p.playerName === "Rizo" && p.season === 50)!.playerId, playerName: "Rizo", season: 50, points: [4, 0, 0, 0, 0, 7, 0, 3, 0] },
    { playerId: players50.find(p => p.playerName === "Angelina" && p.season === 50)!.playerId, playerName: "Angelina", season: 50, points: [4, 0, 0, 0, 0, 5, 0, 2, 0] },
    { playerId: players50.find(p => p.playerName === "Q" && p.season === 50)!.playerId , playerName:"Q", season:50 , points: [3, 0, 0, 0, 0, 18, 0, 2, 0] },
    { playerId: players50.find(p => p.playerName === "Stephanie" && p.season === 50)!.playerId , playerName:"Stephanie", season: 50, points: [4, 0, 0, 0, 0, 8, 0, 2, 0] },
    { playerId: players50.find(p => p.playerName === "Kyle" && p.season === 50)!.playerId, playerName: "Kristina", season: 50, points: [1, 0, 0, 0, 0, 4, 0, 1, 0] },
    { playerId: players50.find(p => p.playerName === "Aubry" && p.season === 50)!.playerId, playerName: "Aubry", season: 50, points: [4, 0, 0, 0, 0, 8, 0, 3, 0] },
    { playerId: players50.find(p => p.playerName === "Joe" && p.season === 50)!.playerId, playerName: "Joe", season: 50, points: [4, 0, 0, 0, 0, 10, 0, 1, 1] },
    { playerId: players50.find(p => p.playerName === "Savannah" && p.season === 50)!.playerId , playerName:"Savannah", season: 50, points: [2, 1, 0, 0, 0, 11, 0, 0, 1] },
    { playerId: players50.find(p => p.playerName === "Christian" && p.season === 50)!.playerId , playerName:"Christian", season: 50, points: [4, 1, 0, 0, 0, 23, 0, 0, 1] },
    { playerId: players50.find(p => p.playerName === "Cirie" && p.season === 50)!.playerId , playerName:"Cirie", season: 50, points: [4, 0, 0, 0, 0, 11, 0, 1, 1] },
    { playerId: players50.find(p => p.playerName === "Ozzy" && p.season === 50)!.playerId , playerName:"Ozzy", season: 50, points: [4, 1, 0, 0, 0, 23, 0, 0, 1] },
    { playerId: players50.find(p => p.playerName === "Emily" && p.season === 50)!.playerId , playerName:"Emily", season: 50, points: [4, 0, 0, 0, 0, 13, 0, 0, 1] },
    { playerId: players50.find(p => p.playerName === "Rick" && p.season === 50)!.playerId, playerName:"Rick", season: 50, points: [4, 0, 0, 0, 0, 14, 0, 1, 1] },
    { playerId: players50.find(p => p.playerName === "Jenna" && p.season === 50)!.playerId , playerName:"Jenna", season: 50, points: [0, 0, 0, 0, 0, 4, 0, 0, 0] },
    { playerId: players50.find(p => p.playerName === "Jonathan" && p.season === 50)!.playerId , playerName:"Jonathan", season: 50, points:[4, 0, 0, 0, 0, 7, 0, 3, 1] },
    { playerId: players50.find(p => p.playerName === "Dee" && p.season === 50)!.playerId , playerName:"Dee", season: 50, points:[4, 0, 0, 0, 0, 3, 0, 3, 1] },
    { playerId: players50.find(p => p.playerName === "Mike" && p.season === 50)!.playerId , playerName:"Mike", season: 50, points: [4, 0, 0, 0, 0, 12, 0, 2, 1] },
    { playerId: players50.find(p => p.playerName === "Kamilla" && p.season === 50)!.playerId , playerName:"Kamilla", season: 50, points:[4, 0, 0, 0, 0, 3, 0, 3, 1] },
    { playerId: players50.find(p => p.playerName === "Charlie" && p.season === 50)!.playerId , playerName:"Charlie", season: 50, points:[4, 0, 0, 0, 0, 7, 0, 3, 1] },
    { playerId: players50.find(p => p.playerName === "Tiffany" && p.season === 50)!.playerId , playerName:"Tiffany", season: 50, points: [4, 0, 0, 0, 0, 2, 0, 3, 1] },
    { playerId: players50.find(p => p.playerName === "Coach" && p.season === 50)!.playerId , playerName:"Coach", season: 50, points:[4, 0, 0, 0, 0, 11, 0, 3, 1] },
    { playerId: players50.find(p => p.playerName === "Chrissy" && p.season === 50)!.playerId , playerName:"Chrissy", season: 50, points:[4, 0, 0, 0, 0, 4, 0, 3, 1] },
   ];

  await Promise.all(
    pointsData50.map(async (data) => {
      return prisma.playerPoints.create({
        data: {
          playerId: data.playerId,
          playerName: data.playerName,
          season: data.season,
          remainInTheGamePts: data.points[0],
          foundAdvantagePts: data.points[1],
          usedAdvantagePts: data.points[2],
          shotInTheDarkPts: data.points[3],
          individualRewardPts: data.points[4],
          confessionalPts: data.points[5],
          individualImmunityPts: data.points[6],
          tribalImmunityPts: data.points[7],
          tribalRewardPts: data.points[8],
        }
      });
    })
  );

  const participantPicks50 = [
    {
      participant: "Joanne",
      picks: [
        ["Christian", 1, 0, 0],
        ["Ozzy", 0, 1, 0],
        ["Stephanie", 0, 0, 1],
        ["Rizo", 0, 0, 0],
        ["Kamilla", 0, 0, 0],
      ],
    },
    {
      participant: "Dan",
      picks: [
        ["Christian", 1, 0, 0],
        ["Aubry", 0, 1, 0],
        ["Emily", 0, 0, 1],
        ["Ozzy", 0, 0, 0],
        ["Joe", 0, 0, 0],
      ],
    },
    {
      participant: "Ivy",
      picks: [
        ["Coach", 1, 0, 0],
        ["Genevieve", 0, 1, 0],
        ["Christian", 0, 0, 1],
        ["Joe", 0, 0, 0],
        ["Rizo", 0, 0, 0],
      ],
    },
    {
      participant: "Geoff",
      picks: [
        ["Rizo", 1, 0, 0],
        ["Coach", 0, 1, 0],
        ["Jonathan", 0, 0, 1],
        ["Christian", 0, 0, 0],
        ["Stephanie", 0, 0, 0],
      ],
    },
    {
      participant: "Ben",
      picks: [
        ["Christian", 1, 0, 0],
        ["Rick", 0, 1, 0],
        ["Genevieve", 0, 0, 1],
        ["Stephanie", 0, 0, 0],
        ["Emily", 0, 0, 0],
      ],
    },
    {
      participant: "Cam",
      picks: [
        ["Christian", 1, 0, 0],
        ["Rick", 0, 1, 0],
        ["Genevieve", 0, 0, 1],
        ["Stephanie", 0, 0, 0],
        ["Aubry", 0, 0, 0],
      ],
    },
    {
      participant: "Nanny",
      picks: [
        ["Rizo", 1, 0, 0],
        ["Ozzy", 0, 1, 0],
        ["Aubry", 0, 0, 1],
        ["Colby", 0, 0, 0],
        ["Emily", 0, 0, 0],
      ],
    },
    {
      participant: "Papa",
      picks: [
        ["Mike", 1, 0, 0],
        ["Chrissy", 0, 1, 0],
        ["Colby", 0, 0, 1],
        ["Charlie", 0, 0, 0],
        ["Savannah", 0, 0, 0],
      ],
    },
    {
      participant: "Cal",
      picks: [
        ["Aubry", 1, 0, 0],
        ["Christian", 0, 1, 0],
        ["Genevieve", 0, 0, 1],
        ["Angelina", 0, 0, 0],
        ["Q", 0, 0, 0],
      ],
    },
    {
      participant: "Cara",
      picks: [
        ["Christian", 1, 0, 0],
        ["Aubry", 0, 1, 0],
        ["Genevieve", 0, 0, 1],
        ["Charlie", 0, 0, 0],
        ["Colby", 0, 0, 0],
      ],
    },
  ];

  const mappings50 = participantPicks50.flatMap(({ participant, picks }) =>
    picks.map(([playerName, first, second, third]) => ({
      participantId: participants.find(p => p.participantName === participant)!.participantId,
      playerId: players50.find(p => p.playerName === playerName && p.season === 50)!.playerId,
      season: 50,
      first: Boolean(first),
      second: Boolean(second),
      third: Boolean(third),
    }))
  );

  await prisma.participantsMapper.createMany({
    data: mappings50,
  });

}

seedDatabase()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
