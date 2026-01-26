import { useMemo } from "react";
import { useTable } from "@refinedev/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { ListView, ListViewHeader } from "@/components/refine-ui/views/list-view";
import { EditButton } from "@/components/refine-ui/buttons/edit";
import { DeleteButton } from "@/components/refine-ui/buttons/delete";
import { Edit, Trash2 } from "lucide-react";
import type { Service } from "@/types";
import { LoadingOverlay } from "@/components/refine-ui/layout/loading-overlay";

export function ServicesList() {
  const columns = useMemo<ColumnDef<Service>[]>(
    () => [
      {
        id: "title",
        accessorKey: "title",
        header: "Title",
        size: 250,
      },
      {
        id: "description",
        accessorKey: "description",
        header: "Description",
        size: 400,
        cell: ({ getValue }) => {
          const description = getValue<string>();
          return (
            <div className="truncate max-w-md" title={description}>
              {description}
            </div>
          );
        },
      },
      {
        id: "category",
        accessorKey: "category",
        header: "Category",
        size: 150,
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

  const table = useTable<Service>({
    columns,
    refineCoreProps: {
      resource: "services",
    },
  });

  const {
    refineCore: { tableQuery },
  } = table;

  return (
    <ListView>
      <ListViewHeader title="Services" canCreate={true} />
      <LoadingOverlay loading={tableQuery.isLoading}>
        <DataTable table={table} />
      </LoadingOverlay>
    </ListView>
  );
}
