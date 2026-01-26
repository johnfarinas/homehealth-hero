import React from "react";
import { useList, useUpdate } from "@refinedev/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EditView, EditViewHeader } from "@/components/refine-ui/views/edit-view";
import { LoadingOverlay } from "@/components/refine-ui/layout/loading-overlay";
import type { Statistic } from "@/types";

// Define Zod schema for all 4 statistics
const statisticsFormSchema = z.object({
  stat1: z.object({
    label: z.string().min(1, "Label is required"),
    value: z.string().min(1, "Value is required"),
    description: z.string().min(1, "Description is required"),
  }),
  stat2: z.object({
    label: z.string().min(1, "Label is required"),
    value: z.string().min(1, "Value is required"),
    description: z.string().min(1, "Description is required"),
  }),
  stat3: z.object({
    label: z.string().min(1, "Label is required"),
    value: z.string().min(1, "Value is required"),
    description: z.string().min(1, "Description is required"),
  }),
  stat4: z.object({
    label: z.string().min(1, "Label is required"),
    value: z.string().min(1, "Value is required"),
    description: z.string().min(1, "Description is required"),
  }),
});

type StatisticsFormValues = z.infer<typeof statisticsFormSchema>;

export const StatisticsEdit = () => {
  const { query: statisticsQuery } = useList<Statistic>({
    resource: "statistics",
  });

  const { mutate: updateStatistic } = useUpdate();

  const statistics = statisticsQuery.data?.data || [];

  const form = useForm<StatisticsFormValues>({
    resolver: zodResolver(statisticsFormSchema),
    defaultValues: {
      stat1: {
        label: "",
        value: "",
        description: "",
      },
      stat2: {
        label: "",
        value: "",
        description: "",
      },
      stat3: {
        label: "",
        value: "",
        description: "",
      },
      stat4: {
        label: "",
        value: "",
        description: "",
      },
    },
  });

  // Update form values when data loads
  React.useEffect(() => {
    if (statistics.length > 0) {
      form.reset({
        stat1: {
          label: statistics[0]?.label || "",
          value: statistics[0]?.value || "",
          description: statistics[0]?.description || "",
        },
        stat2: {
          label: statistics[1]?.label || "",
          value: statistics[1]?.value || "",
          description: statistics[1]?.description || "",
        },
        stat3: {
          label: statistics[2]?.label || "",
          value: statistics[2]?.value || "",
          description: statistics[2]?.description || "",
        },
        stat4: {
          label: statistics[3]?.label || "",
          value: statistics[3]?.value || "",
          description: statistics[3]?.description || "",
        },
      });
    }
  }, [statistics, form]);

  const onSubmit = async (values: StatisticsFormValues) => {
    // Update each statistic individually
    const updates = [
      { id: statistics[0]?.id, data: values.stat1 },
      { id: statistics[1]?.id, data: values.stat2 },
      { id: statistics[2]?.id, data: values.stat3 },
      { id: statistics[3]?.id, data: values.stat4 },
    ];

    // Update all statistics
    for (const update of updates) {
      if (update.id) {
        updateStatistic(
          {
            resource: "statistics",
            id: update.id,
            values: update.data,
          },
          {
            onSuccess: () => {
              // Success notification will be shown automatically by Refine
            },
          },
        );
      }
    }
  };

  const isLoading = statisticsQuery.isLoading;
  const isSubmitting = form.formState.isSubmitting;

  return (
    <EditView>
      <EditViewHeader title="Edit Statistics" />
      <LoadingOverlay loading={isLoading}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Statistic 1 */}
              <Card>
                <CardHeader>
                  <CardTitle>Statistic 1</CardTitle>
                  <CardDescription>First statistic displayed on landing page</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="stat1.label"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Label</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Certified Coders" disabled={isSubmitting} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stat1.value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Value</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 450+" disabled={isSubmitting} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stat1.description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Expert coders on our team" disabled={isSubmitting} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Statistic 2 */}
              <Card>
                <CardHeader>
                  <CardTitle>Statistic 2</CardTitle>
                  <CardDescription>Second statistic displayed on landing page</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="stat2.label"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Label</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Charts Processed" disabled={isSubmitting} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stat2.value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Value</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 15M+" disabled={isSubmitting} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stat2.description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Total charts processed annually"
                            disabled={isSubmitting}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Statistic 3 */}
              <Card>
                <CardHeader>
                  <CardTitle>Statistic 3</CardTitle>
                  <CardDescription>Third statistic displayed on landing page</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="stat3.label"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Label</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Accuracy Rate" disabled={isSubmitting} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stat3.value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Value</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 99.2%" disabled={isSubmitting} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stat3.description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Coding accuracy maintained" disabled={isSubmitting} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Statistic 4 */}
              <Card>
                <CardHeader>
                  <CardTitle>Statistic 4</CardTitle>
                  <CardDescription>Fourth statistic displayed on landing page</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="stat4.label"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Label</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Average TAT" disabled={isSubmitting} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stat4.value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Value</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., <12 hrs" disabled={isSubmitting} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stat4.description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Turnaround time for coding" disabled={isSubmitting} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="submit" disabled={isSubmitting || isLoading}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save All Changes
              </Button>
            </div>
          </form>
        </Form>
      </LoadingOverlay>
    </EditView>
  );
};
