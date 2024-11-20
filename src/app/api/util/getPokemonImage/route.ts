import { NextResponse } from "next/server";
import { PokemonClient } from "pokenode-ts";

export async function GET(request: Request) {
  const api = new PokemonClient();
  const { searchParams } = new URL(request.url);
  const names = searchParams.get("names")?.split(",") || [];

  try {
    if (names.length === 0) {
      return NextResponse.json(
        { error: "No pokemon names provided" },
        { status: 400 }
      );
    }

    const pokemonImages = await Promise.all(
      names.map(async (name) => {
        try {
          const pokemon = await api.getPokemonByName(name.toLowerCase());
          return {
            name,
            imageUrl: pokemon.sprites.front_default,
          };
        } catch (error) {
          return {
            name,
            imageUrl: null,
            error: `Failed to fetch image for ${name}: ${error}`,
          };
        }
      })
    );

    return NextResponse.json({ pokemonImages });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching pokemon images: " + error },
      { status: 500 }
    );
  }
}
