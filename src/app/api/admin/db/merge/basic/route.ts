import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const devClient = new MongoClient(process.env.DATABASE_DEV_URL as string);
const prodClient = new MongoClient(process.env.DATABASE_PROD_URL as string);

export async function GET() {
  try {
    await devClient.connect();
    await prodClient.connect();

    const devDb = devClient.db();
    const prodDb = prodClient.db();

    // Get drugs, pokemon, and facts collections from dev
    const devData = {
      drugs: await devDb.collection("Drug").find({}).toArray(),
      pokemon: await devDb.collection("Pokemon").find({}).toArray(),
      facts: await devDb.collection("Fact").find({}).toArray(),
    };

    // Upsert drugs, pokemon, and facts to prod
    const results = await Promise.all([
      ...devData.drugs.map((drug) =>
        prodDb
          .collection("Drug")
          .updateOne({ name: drug.name }, { $set: drug }, { upsert: true })
      ),
      ...devData.pokemon.map((pokemon) =>
        prodDb
          .collection("Pokemon")
          .updateOne(
            { name: pokemon.name },
            { $set: pokemon },
            { upsert: true }
          )
      ),
      ...devData.facts.map((fact) =>
        prodDb
          .collection("Fact")
          .updateOne({ _id: fact._id }, { $set: fact }, { upsert: true })
      ),
    ]);

    return NextResponse.json({
      message: "Basic collections and facts merged successfully",
      mergedCount: results.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to merge databases: ${error}` },
      { status: 500 }
    );
  } finally {
    await devClient.close();
    await prodClient.close();
  }
}
