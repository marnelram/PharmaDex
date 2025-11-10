import { PrismaClient } from '@prisma/client';

// This script copies Drug and Pokemon data from production to development database
// Usage: ts-node scripts/copy-prod-to-dev.ts

async function main() {
  // Create two Prisma clients - one for prod, one for dev
  const prodPrisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.PRODUCTION_DATABASE_URL,
      },
    },
  });

  const devPrisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL, // Your dev database
      },
    },
  });

  try {
    console.log('🔄 Starting data copy from production to development...\n');

    // Fetch all drugs from production
    console.log('📦 Fetching drugs from production...');
    const prodDrugs = await prodPrisma.drug.findMany({
      include: {
        facts: true,
      },
    });
    console.log(`✅ Found ${prodDrugs.length} drugs in production\n`);

    // Fetch all pokemon from production
    console.log('📦 Fetching pokemon from production...');
    const prodPokemon = await prodPrisma.pokemon.findMany({
      include: {
        facts: true,
      },
    });
    console.log(`✅ Found ${prodPokemon.length} pokemon in production\n`);

    // Clear existing data in dev (optional - comment out if you want to keep existing data)
    console.log('🧹 Clearing existing data in development...');
    await devPrisma.fact.deleteMany({});
    await devPrisma.drug.deleteMany({});
    await devPrisma.pokemon.deleteMany({});
    console.log('✅ Cleared existing data\n');

    // Copy drugs to dev
    console.log('💾 Copying drugs to development...');
    for (const drug of prodDrugs) {
      await devPrisma.drug.create({
        data: {
          id: drug.id,
          name: drug.name,
          generic: drug.generic,
          dosageForm: drug.dosageForm,
          image: drug.image,
          description: drug.description,
          drugClass: drug.drugClass,
          generation: drug.generation,
          facts: {
            create: drug.facts.map((fact) => ({
              id: fact.id,
              title: fact.title,
              content: fact.content,
              category: fact.category,
            })),
          },
        },
      });
    }
    console.log(`✅ Copied ${prodDrugs.length} drugs\n`);

    // Copy pokemon to dev
    console.log('💾 Copying pokemon to development...');
    for (const pokemon of prodPokemon) {
      await devPrisma.pokemon.create({
        data: {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.image,
          description: pokemon.description,
          type1: pokemon.type1,
          type2: pokemon.type2,
          generation: pokemon.generation,
          facts: {
            create: pokemon.facts.map((fact) => ({
              id: fact.id,
              title: fact.title,
              content: fact.content,
              category: fact.category,
            })),
          },
        },
      });
    }
    console.log(`✅ Copied ${prodPokemon.length} pokemon\n`);

    console.log('🎉 Data copy completed successfully!');
    console.log(`   - ${prodDrugs.length} drugs`);
    console.log(`   - ${prodPokemon.length} pokemon`);
  } catch (error) {
    console.error('❌ Error copying data:', error);
    process.exit(1);
  } finally {
    await prodPrisma.$disconnect();
    await devPrisma.$disconnect();
  }
}

main();
