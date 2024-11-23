"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PokemonForm from "@/components/forms/pokemonForm";
import DrugForm from "@/components/forms/drugForm";
import BadgeForm from "@/components/forms/badgeForm";
import { DataTable } from "@/components/tables/drugs/data-table";
import { columns } from "@/components/tables/drugs/columns";
import { useQuery } from "@tanstack/react-query";
import { DrugWithFacts } from "@/components/tables/drugs/schema";
import { Button } from "@/components/ui/button";

export default function AdminPanel() {
  const [viewMode, setViewMode] = useState<"form" | "table">("table");

  const { data: drugs, isLoading } = useQuery<DrugWithFacts[]>({
    queryKey: ["drugs"],
    queryFn: async () => {
      const response = await fetch("/api/admin/drug/all");
      if (!response.ok) throw new Error("Failed to fetch drugs");
      return response.json();
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <Tabs defaultValue="drugs" className="w-full">
        <TabsList>
          <TabsTrigger value="pokemon">Pokémon</TabsTrigger>
          <TabsTrigger value="drugs">Drugs</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
        </TabsList>

        <TabsContent value="pokemon">
          <PokemonForm />
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
              <DataTable columns={columns} data={drugs ?? []} />
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
