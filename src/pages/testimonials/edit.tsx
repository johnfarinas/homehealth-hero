import { type HttpError } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { EditView, EditViewHeader } from "@/components/refine-ui/views/edit-view";
import { LoadingOverlay } from "@/components/refine-ui/layout/loading-overlay";
import type { Testimonial } from "@/types";
import { useNavigate, useParams } from "react-router";

const testimonialFormSchema = z.object({
  quote: z.string().min(10, { message: "Quote must be at least 10 characters." }),
  authorName: z.string().min(2, { message: "Client name must be at least 2 characters." }),
  authorTitle: z.string().min(2, { message: "Client title must be at least 2 characters." }),
  company: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  logo: z.string().optional(),
  avatar: z.string().optional(),
});

type TestimonialFormValues = z.infer<typeof testimonialFormSchema>;

export function TestimonialsEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    refineCore: { onFinish, query, formLoading },
    ...form
  } = useForm<Testimonial, HttpError, TestimonialFormValues>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: {
      quote: "",
      authorName: "",
      authorTitle: "",
      company: "",
      logo: "",
      avatar: "",
    },
    refineCoreProps: {
      resource: "testimonials",
      action: "edit",
      id: id,
      redirect: "list",
    },
  });

  function onSubmit(values: TestimonialFormValues) {
    onFinish(values);
  }

  return (
    <EditView>
      <EditViewHeader title={`Edit Testimonial #${id}`} />
      <LoadingOverlay loading={query?.isLoading || formLoading}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4 max-w-2xl">
            <FormField
              control={form.control}
              name="quote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quote</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter testimonial quote" className="resize-none min-h-32" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="authorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter client name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="authorTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter client title (e.g., Director of Operations)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Logo URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/logo.png" {...field} />
                  </FormControl>
                  <FormDescription>URL to the company logo image</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/avatar.jpg" {...field} />
                  </FormControl>
                  <FormDescription>URL to the client's avatar/photo</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/testimonials")}
                disabled={form.formState.isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </LoadingOverlay>
    </EditView>
  );
}
