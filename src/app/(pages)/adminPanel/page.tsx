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
import { factColumns } from "@/components/tables/facts/fact-columns";
import { TFact } from "@/components/tables/facts/schema";

export default function AdminPanel() {
  const [viewMode, setViewMode] = useState<"form" | "table">("table");
  const [activeTab, setActiveTab] = useState("drugs");

  const { data: drugs, isLoading: isLoadingDrugs } = useQuery<DrugWithFacts[]>({
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

  const { data: facts, isLoading: isLoadingFacts } = useQuery<TFact[]>({
    queryKey: ["facts"],
    queryFn: async () => {
      const response = await fetch("/api/admin/fact/all");
      if (!response.ok) throw new Error("Failed to fetch facts");
      return response.json();
    },
    enabled: activeTab === "facts",
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
          <TabsTrigger value="facts">Facts</TabsTrigger>
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
            ) : isLoadingPokemons ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
              </div>
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
            ) : isLoadingDrugs ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
              </div>
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

        <TabsContent value="facts">
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
              <>in Progress</>
            ) : isLoadingFacts ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
              </div>
            ) : (
              <DataTable
                columns={factColumns}
                data={facts ?? []}
                filterColumn="title"
                filterPlaceholder="Filter facts..."
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
