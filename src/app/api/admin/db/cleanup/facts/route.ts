import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const client = new MongoClient(process.env.DATABASE_URL as string);

export async function GET() {
  try {
    await client.connect();
    const db = client.db();

    // Get all facts, drugs, and pokemon
    const facts = await db.collection("Fact").find({}).toArray();
    const drugs = await db
      .collection("Drug")
      .find({})
      .project({ _id: 1 })
      .toArray();
    const pokemon = await db
      .collection("Pokemon")
      .find({})
      .project({ _id: 1 })
      .toArray();

    // Create sets of valid IDs for faster lookup
    const drugIds = new Set(drugs.map((drug) => drug._id.toString()));
    const pokemonIds = new Set(pokemon.map((poke) => poke._id.toString()));

    // Find facts without valid references
    const orphanedFacts = facts.filter((fact) => {
      if (fact.type === "drug") {
        const drugId = fact.drugId?.toString();
        return !drugId || !drugIds.has(drugId);
      } else if (fact.type === "pokemon") {
        const pokemonId = fact.pokemonId?.toString();
        return !pokemonId || !pokemonIds.has(pokemonId);
      }
      return true; // If fact.type is neither drug nor pokemon, consider it orphaned
    });

    // Delete orphaned facts
    const deleteResult = await db.collection("Fact").deleteMany({
      _id: { $in: orphanedFacts.map((fact) => fact._id) },
    });

    return NextResponse.json({
      message: "Orphaned facts cleaned up successfully",
      deletedCount: deleteResult.deletedCount,
      totalFacts: facts.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to clean up facts: ${error}` },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
