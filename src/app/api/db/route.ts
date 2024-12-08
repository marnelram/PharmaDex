import { NextResponse } from "next/server";
import { PrismaClient as PostgresClient } from "@prisma/client";
import { Db, MongoClient } from "mongodb";

const mongoClient = new MongoClient(process.env.MONGODB_URL!);
const postgresClient = new PostgresClient();

export async function GET() {
  try {
    const db = mongoClient.db(); // Get the database instance
    const migrationResult = await migrate(db);
    return NextResponse.json({
      success: true,
      message: "Migration completed successfully",
      details: migrationResult || {},
    });
  } catch (error) {
    console.error("Migration failed:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Migration failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

async function migrate(db: Db) {
  try {
    // First migrate all Pokémon
    const pokemon = await db.collection("Pokemon").find({}).toArray();
    console.log(`Migrating ${pokemon.length} Pokémon...`);

    for (const poke of pokemon) {
      await postgresClient.pokemon.upsert({
        where: { id: poke._id.toString() },
        update: {
          name: poke.name,
          image: poke.image,
          description: poke.description,
          type1: poke.type1,
          type2: poke.type2,
          generation: poke.generation,
          updatedAt: poke.updatedAt,
        },
        create: {
          id: poke._id.toString(),
          name: poke.name,
          image: poke.image,
          description: poke.description,
          type1: poke.type1,
          type2: poke.type2,
          generation: poke.generation,
          createdAt: poke.createdAt,
          updatedAt: poke.updatedAt,
        },
      });
    }

    // Then migrate all Drugs
    const drugs = await db.collection("Drug").find({}).toArray();
    console.log(`Migrating ${drugs.length} Drugs...`);

    for (const drug of drugs) {
      await postgresClient.drug.upsert({
        where: { id: drug._id.toString() },
        create: {
          id: drug._id.toString(),
          name: drug.name,
          generic: drug.generic,
          dosageForm: drug.dosageForm,
          image: drug.image,
          description: drug.description,
          drugClass: drug.drugClass,
          generation: drug.generation,
          createdAt: drug.createdAt,
          updatedAt: drug.updatedAt,
        },
        update: {
          name: drug.name,
          generic: drug.generic,
          dosageForm: drug.dosageForm,
          image: drug.image,
          description: drug.description,
          drugClass: drug.drugClass,
          generation: drug.generation,
          updatedAt: drug.updatedAt,
        },
      });
    }

    // Finally migrate Facts with their relations
    const facts = await db.collection("Fact").find({}).toArray();
    console.log(`Migrating ${facts.length} Facts...`);

    for (const fact of facts) {
      try {
        // Verify that the related records exist before creating the fact
        if (fact.drugId) {
          const drug = await postgresClient.drug.findUnique({
            where: { id: fact.drugId.toString() },
          });
          if (!drug) {
            console.warn(
              `Skipping fact ${fact._id}: Drug ${fact.drugId} not found`
            );
            continue;
          }
        }

        if (fact.pokemonId) {
          const pokemon = await postgresClient.pokemon.findUnique({
            where: { id: fact.pokemonId.toString() },
          });
          if (!pokemon) {
            console.warn(
              `Skipping fact ${fact._id}: Pokemon ${fact.pokemonId} not found`
            );
            continue;
          }
        }

        await postgresClient.fact.upsert({
          where: { id: fact._id.toString() },
          update: {
            title: fact.title,
            content: fact.content,
            category: fact.category,
            ...(fact.drugId && { drugId: fact.drugId.toString() }),
            ...(fact.pokemonId && { pokemonId: fact.pokemonId.toString() }),
            updatedAt: fact.updatedAt,
          },
          create: {
            id: fact._id.toString(),
            title: fact.title,
            content: fact.content,
            category: fact.category,
            ...(fact.drugId && { drugId: fact.drugId.toString() }),
            ...(fact.pokemonId && { pokemonId: fact.pokemonId.toString() }),
            createdAt: fact.createdAt,
            updatedAt: fact.updatedAt,
          },
        });
      } catch (error) {
        console.error(`Error migrating fact ${fact._id}:`, error);
        throw error;
      }
    }

    return {
      pokemon: pokemon.length,
      drugs: drugs.length,
      facts: facts.length,
    };
  } catch (error) {
    throw error;
  } finally {
    await mongoClient.close();
    await postgresClient.$disconnect();
  }
}
