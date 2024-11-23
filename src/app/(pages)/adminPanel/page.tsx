"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PokemonForm from "@/components/forms/pokemonForm";
import DrugForm from "@/components/forms/drugForm";
import BadgeForm from "@/components/forms/badgeForm";
import { useQuery } from "@tanstack/react-query";
import { DrugWithFacts } from "@/components/tables/drugs/schema";
import { Button } from "@/components/ui/button";
import { drugColumns } from "@/components/tables/drugs/drug-columns";
import { DataTable } from "@/components/tables/data-table";
import { pokemonColumns } from "@/components/tables/pokemon/pokemon-columns";
import { PokemonWithFacts } from "@/components/tables/pokemon/schemas";

export default function AdminPanel() {
  const [viewMode, setViewMode] = useState<"form" | "table">("table");
  const [activeTab, setActiveTab] = useState("drugs");

  const { data: drugs, isLoading } = useQuery<DrugWithFacts[]>({
    queryKey: ["drugs"],
    queryFn: async () => {
      const response = await fetch("/api/admin/drug/all");
      if (!response.ok) throw new Error("Failed to fetch drugs");
      return response.json();
    },
    enabled: activeTab === "drugs",
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const { data: pokemons, isLoading: isLoadingPokemons } = useQuery<
    PokemonWithFacts[]
  >({
    queryKey: ["pokemons"],
    queryFn: async () => {
      const response = await fetch("/api/admin/pokemon/all");
      if (!response.ok) throw new Error("Failed to fetch pokemon");
      return response.json();
    },
    enabled: activeTab === "pokemon",
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <Tabs defaultValue="drugs" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pokemon">Pokémon</TabsTrigger>
          <TabsTrigger value="drugs">Drugs</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
        </TabsList>

        <TabsContent value="pokemon">
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button
                onClick={() =>
                  setViewMode(viewMode === "form" ? "table" : "form")
                }
              >
                {viewMode === "form" ? "View Table" : "Add New"}
              </Button>
            </div>
            {viewMode === "form" ? (
              <PokemonForm />
            ) : (
              <DataTable
                columns={pokemonColumns}
                data={pokemons ?? []}
                filterColumn="name"
                filterPlaceholder="Filter pokemon..."
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="drugs">
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button
                onClick={() =>
                  setViewMode(viewMode === "form" ? "table" : "form")
                }
              >
                {viewMode === "form" ? "View Table" : "Add New"}
              </Button>
            </div>
            {viewMode === "form" ? (
              <DrugForm />
            ) : (
              <DataTable
                columns={drugColumns}
                data={drugs ?? []}
                filterColumn="name"
                filterPlaceholder="Filter drugs..."
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="badges">
          <BadgeForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
