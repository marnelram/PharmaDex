import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create some initial drugs
  const aspirin = await prisma.drug.create({
    data: {
      name: "Aspirin",
      description: "Common pain reliever and fever reducer",
      type: "analgesic",
      facts: {
        create: [
          {
            title: "Fun Fact",
            content:
              "Aspirin was originally derived from the bark of willow trees.",
            category: "drug",
          },
        ],
      },
    },
  });

  // Create standalone facts
  await prisma.fact.createMany({
    data: [
      {
        title: "Did you know?",
        content: "Pikachu was originally going to be named 'Gorochu'.",
        category: "pokemon",
      },
      {
        title: "Pokémon Trivia",
        content: "There are over 900 Pokémon species as of 2023.",
        category: "pokemon",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
