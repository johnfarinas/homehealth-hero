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
import type { Contact } from "@/types";

// Define Zod schema for contact information
const contactFormSchema = z.object({
  address1: z.string().min(1, "Address is required"),
  city1: z.string().min(1, "City is required"),
  state1: z.string().min(1, "State is required"),
  zip1: z.string().min(1, "ZIP code is required"),
  phone1: z.string().min(1, "Phone number is required"),
  address2: z.string().min(1, "Address is required"),
  city2: z.string().min(1, "City is required"),
  state2: z.string().min(1, "State is required"),
  zip2: z.string().min(1, "ZIP code is required"),
  phone2: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export const ContactEdit = () => {
  const { query: contactQuery } = useList<Contact>({
    resource: "contact",
  });

  const { mutate: updateContact } = useUpdate();

  const contactData = contactQuery.data?.data?.[0];

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      address1: "",
      city1: "",
      state1: "",
      zip1: "",
      phone1: "",
      address2: "",
      city2: "",
      state2: "",
      zip2: "",
      phone2: "",
      email: "",
    },
  });

  // Update form values when data loads
  React.useEffect(() => {
    if (contactData) {
      form.reset({
        address1: contactData.address1 || "",
        city1: contactData.city1 || "",
        state1: contactData.state1 || "",
        zip1: contactData.zip1 || "",
        phone1: contactData.phone1 || "",
        address2: contactData.address2 || "",
        city2: contactData.city2 || "",
        state2: contactData.state2 || "",
        zip2: contactData.zip2 || "",
        phone2: contactData.phone2 || "",
        email: contactData.email || "",
      });
    }
  }, [contactData, form]);

  const onSubmit = async (values: ContactFormValues) => {
    if (contactData?.id) {
      updateContact(
        {
          resource: "contact",
          id: contactData.id,
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

  const isLoading = contactQuery.isLoading;
  const isSubmitting = form.formState.isSubmitting;

  return (
    <EditView>
      <EditViewHeader title="Edit Contact Information" />
      <LoadingOverlay loading={isLoading}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tampa Office */}
              <Card>
                <CardHeader>
                  <CardTitle>Tampa Office</CardTitle>
                  <CardDescription>Primary office contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="address1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="1200 Healthcare Plaza, Ste 200" disabled={isSubmitting} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Tampa" disabled={isSubmitting} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="FL" maxLength={2} disabled={isSubmitting} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="zip1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl>
                          <Input placeholder="33602" disabled={isSubmitting} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="1-800-HERO-HHA (4376-442)" disabled={isSubmitting} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Skokie Office */}
              <Card>
                <CardHeader>
                  <CardTitle>Skokie Office</CardTitle>
                  <CardDescription>Secondary office contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="address2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="9933 Lawler Ave. Ste. 332" disabled={isSubmitting} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Skokie" disabled={isSubmitting} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="IL" maxLength={2} disabled={isSubmitting} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="zip2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl>
                          <Input placeholder="60077" disabled={isSubmitting} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="1 (312) 889-0670" disabled={isSubmitting} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Email - Full Width */}
            <Card>
              <CardHeader>
                <CardTitle>Email</CardTitle>
                <CardDescription>General contact email address</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="solutions@homehealthhero.com"
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
