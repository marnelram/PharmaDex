"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { pokemonFormSchema } from "@/lib/validation/zod/pokemon";

export default function PokemonForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof pokemonFormSchema>>({
    resolver: zodResolver(pokemonFormSchema),
    defaultValues: {
      name: "",
      description: "",
      generation: 1,
      facts: [{ title: "", content: "" }],
    },
  });

  const {
    mutate: addPokemon,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (values: z.infer<typeof pokemonFormSchema>) => {
      const res = await fetch("/api/admin/pokemon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error("Failed to add Pokémon");
      }

      return res.json();
    },
    onSuccess: () => {
      form.reset();
      toast({
        title: "Success",
        description: "Pokémon added successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add Pokémon",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof pokemonFormSchema>) => {
    addPokemon(values);
  };

  const addFact = () => {
    const currentFacts = form.getValues("facts");
    form.setValue("facts", [...currentFacts, { title: "", content: "" }]);
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Add New Pokémon</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Pikachu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter Pokémon description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="generation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Generation</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      placeholder="1"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel>Facts</FormLabel>
              {form.watch("facts").map((_, index) => (
                <div key={index} className="space-y-4">
                  <FormField
                    control={form.control}
                    name={`facts.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Fact Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`facts.${index}.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea placeholder="Fact Content" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addFact}
                className="mt-2"
                disabled={isPending}
              >
                Add Fact
              </Button>
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Pokémon...
                </>
              ) : (
                "Add Pokémon"
              )}
            </Button>

            {error && (
              <div className="text-sm text-red-500 mt-2">
                {error.message || "An error occurred while adding the Pokémon"}
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
