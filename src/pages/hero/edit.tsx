import React from "react";
import { useList, useUpdate } from "@refinedev/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EditView, EditViewHeader } from "@/components/refine-ui/views/edit-view";
import { LoadingOverlay } from "@/components/refine-ui/layout/loading-overlay";
import type { HeroContent } from "@/types";

// Define Zod schema for hero content
const heroFormSchema = z.object({
  headline: z.string().min(10, "Headline must be at least 10 characters"),
  subheadline: z.string().min(10, "Subheadline must be at least 10 characters"),
  ctaPrimary: z.string().min(2, "Primary CTA text is required"),
  ctaSecondary: z.string().min(2, "Secondary CTA text is required"),
});

type HeroFormValues = z.infer<typeof heroFormSchema>;

export const HeroEdit = () => {
  const { query: heroQuery } = useList<HeroContent>({
    resource: "hero",
  });

  const { mutate: updateHero } = useUpdate();

  const heroData = heroQuery.data?.data?.[0];

  const form = useForm<HeroFormValues>({
    resolver: zodResolver(heroFormSchema),
    defaultValues: {
      headline: "",
      subheadline: "",
      ctaPrimary: "",
      ctaSecondary: "",
    },
  });

  // Update form values when data loads
  React.useEffect(() => {
    if (heroData) {
      form.reset({
        headline: heroData.headline || "",
        subheadline: heroData.subheadline || "",
        ctaPrimary: heroData.ctaPrimary || "",
        ctaSecondary: heroData.ctaSecondary || "",
      });
    }
  }, [heroData, form]);

  const onSubmit = async (values: HeroFormValues) => {
    if (heroData?.id) {
      updateHero(
        {
          resource: "hero",
          id: heroData.id,
          values: values,
        },
        {
          onSuccess: () => {
            // Success notification will be shown automatically by Refine
          },
        },
      );
    }
  };

  const isLoading = heroQuery.isLoading;
  const isSubmitting = form.formState.isSubmitting;

  return (
    <EditView>
      <EditViewHeader title="Edit Hero Section" />
      <LoadingOverlay loading={isLoading}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
            <Card>
              <CardHeader>
                <CardTitle>Hero Content</CardTitle>
                <CardDescription>Edit the main hero section content displayed on the landing page</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <FormField
                  control={form.control}
                  name="headline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Headline</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Main headline text"
                          className="resize-none min-h-24"
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subheadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subheadline</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Supporting text below the headline"
                          className="resize-none min-h-20"
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <FormField
                    control={form.control}
                    name="ctaPrimary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary CTA Button Text</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Connect With Us" disabled={isSubmitting} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ctaSecondary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Secondary CTA Button Text</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Play Video" disabled={isSubmitting} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-2">
              <Button type="submit" disabled={isSubmitting || isLoading}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </LoadingOverlay>
    </EditView>
  );
};
