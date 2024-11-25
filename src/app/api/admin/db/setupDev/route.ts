import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is only available in development" },
      { status: 403 }
    );
  }

  const sourceDb = "DrugOrPokemon";
  const targetDb = "Dev";
  const mongoUri = process.env.DATABASE_PROD_URL;
  console.log(mongoUri);

  if (!mongoUri) {
    return NextResponse.json(
      { error: "DATABASE_URL environment variable is not set" },
      { status: 500 }
    );
  }

  const client = new MongoClient(mongoUri);

  try {
    await client.connect();

    // Get source database
    const sourceDatabase = client.db(sourceDb);

    // Get (or create) target database
    const targetDatabase = client.db(targetDb);

    // Get list of all collections in source database
    const collections = await sourceDatabase.listCollections().toArray();

    // Drop target database if it exists
    await targetDatabase.dropDatabase();

    // Copy each collection
    for (const collection of collections) {
      const sourceCollection = sourceDatabase.collection(collection.name);
      const targetCollection = targetDatabase.collection(collection.name);

      // Copy all documents
      const documents = await sourceCollection.find({}).toArray();
      if (documents.length > 0) {
        await targetCollection.insertMany(documents);
      }
    }

    return NextResponse.json({
      message: "Database cloned successfully",
      collections: collections.length,
    });
  } catch (error) {
    console.error("Database clone error:", error);
    return NextResponse.json(
      { error: `Failed to clone database: ${error}` },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
