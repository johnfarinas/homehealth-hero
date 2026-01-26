import { useMemo } from "react";
import { useTable } from "@refinedev/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { ListView, ListViewHeader } from "@/components/refine-ui/views/list-view";
import { EditButton } from "@/components/refine-ui/buttons/edit";
import { DeleteButton } from "@/components/refine-ui/buttons/delete";
import { Edit, Trash2 } from "lucide-react";
import type { Testimonial } from "@/types";
import { LoadingOverlay } from "@/components/refine-ui/layout/loading-overlay";

export function TestimonialsList() {
  const columns = useMemo<ColumnDef<Testimonial>[]>(
    () => [
      {
        id: "authorName",
        accessorKey: "authorName",
        header: "Client Name",
        size: 200,
      },
      {
        id: "company",
        accessorKey: "company",
        header: "Company",
        size: 200,
      },
      {
        id: "authorTitle",
        accessorKey: "authorTitle",
        header: "Title",
        size: 200,
      },
      {
        id: "quote",
        accessorKey: "quote",
        header: "Quote Preview",
        size: 400,
        cell: ({ getValue }) => {
          const quote = getValue<string>();
          const preview = quote.length > 100 ? `${quote.substring(0, 100)}...` : quote;
          return (
            <div className="truncate max-w-md" title={quote}>
              {preview}
            </div>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        size: 120,
        enableSorting: false,
        enableColumnFilter: false,
        cell: ({ row }) => {
          const recordItemId = row.original.id;

          return (
            <div className="flex gap-1">
              <EditButton recordItemId={recordItemId} size="icon-sm" variant="secondary">
                <Edit className="h-4 w-4" />
              </EditButton>
              <DeleteButton recordItemId={recordItemId} size="icon-sm" variant="destructive">
                <Trash2 className="h-4 w-4" />
              </DeleteButton>
            </div>
          );
        },
      },
    ],
    [],
  );

  const table = useTable<Testimonial>({
    columns,
    refineCoreProps: {
      resource: "testimonials",
    },
  });

  const {
    refineCore: { tableQuery },
  } = table;

  return (
    <ListView>
      <ListViewHeader title="Testimonials" canCreate={true} />
      <LoadingOverlay loading={tableQuery.isLoading}>
        <DataTable table={table} />
      </LoadingOverlay>
    </ListView>
  );
}
