"use client";

// import { useSession } from "next-auth/react";
import { useState } from "react";
import PokemonForm from "@/components/forms/pokemonForm";
import DrugForm from "@/components/forms/drugForm";
import BadgeForm from "@/components/forms/badgeForm";
// import { redirect } from "next/navigation";

export default function AdminPanel() {
  // const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("pokemon");

  // if (!session?.user) {
  //   redirect("/auth/signin");
  // }

  // // Protect the route
  // if (!session?.user?.isAdmin) {
  //   return <div>Access Denied</div>;
  // }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("pokemon")}
          className={`px-4 py-2 rounded ${
            activeTab === "pokemon" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Pokémon
        </button>
        <button
          onClick={() => setActiveTab("drugs")}
          className={`px-4 py-2 rounded ${
            activeTab === "drugs" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Drugs
        </button>
        <button
          onClick={() => setActiveTab("badges")}
          className={`px-4 py-2 rounded ${
            activeTab === "badges" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Badges
        </button>
      </div>

      {activeTab === "pokemon" && <PokemonForm />}
      {activeTab === "drugs" && <DrugForm />}
      {activeTab === "badges" && <BadgeForm />}
    </div>
  );
}
