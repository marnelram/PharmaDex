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
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { drugFormSchema } from "@/lib/validation/zod/drug";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DrugFormProps {
  initialData?: z.infer<typeof drugFormSchema>;
  drugId?: string;
}

export default function DrugForm({ initialData, drugId }: DrugFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof drugFormSchema>>({
    resolver: zodResolver(drugFormSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      drugClass: "",
      generation: undefined,
      facts: [{ title: "", content: "" }],
      dosageForm: undefined,
    },
  });

  const {
    mutate: updateDrug,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (values: z.infer<typeof drugFormSchema>) => {
      const res = await fetch(`/api/admin/drug/${drugId}`, {
        method: drugId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Failed to save drug");
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: drugId
          ? "Drug updated successfully!"
          : "Drug added successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add drug",
        variant: "destructive",
      });
    },
  });

  const addFact = () => {
    const currentFacts = form.getValues("facts");
    form.setValue("facts", [...currentFacts, { title: "", content: "" }]);
  };

  const onSubmit = (values: z.infer<typeof drugFormSchema>) => {
    updateDrug(values);
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Add New Drug</CardTitle>
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
                    <Input placeholder="Aspirin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="generic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Generic Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Acetaminophen" {...field} />
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
                    <Textarea placeholder="Enter drug description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="drugClass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class</FormLabel>
                  <FormControl>
                    <Input placeholder="Analgesic" {...field} />
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
                  <FormLabel>Generation (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="1"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseInt(e.target.value) : undefined
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dosageForm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dosage Form</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a dosage form" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PILL">Pill</SelectItem>
                      <SelectItem value="POWDER">Powder</SelectItem>
                      <SelectItem value="LIQUID">Liquid</SelectItem>
                      <SelectItem value="DROP">Drop</SelectItem>
                      <SelectItem value="CREAM">Cream</SelectItem>
                      <SelectItem value="INHALER">Inhaler</SelectItem>
                      <SelectItem value="INSERT">Insert</SelectItem>
                      <SelectItem value="PATCH">Patch</SelectItem>
                      <SelectItem value="SPRAY">Spray</SelectItem>
                    </SelectContent>
                  </Select>
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
              >
                Add Fact
              </Button>
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Drug...
                </>
              ) : (
                "Add Drug"
              )}
            </Button>

            {isError && (
              <div className="text-sm text-red-500 mt-2">
                {error.message || "An error occurred while adding the drug"}
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
