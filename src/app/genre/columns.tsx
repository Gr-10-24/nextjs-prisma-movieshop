"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Genre from "../actions/genre";
import { DeleteDialog } from "@/components/ui/genre/delete-genre";
import { EditDialog } from "@/components/ui/genre/edit-genre";
import { useState } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Genre = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function ExpandableText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 50;

  if (text.length < maxLength) {
    return <div>{text}</div>;
  }

  return (
    <div className="text-start font-medium">
      {expanded ? text : `${text.slice(0, maxLength)}  `}
      {text.length > maxLength && (
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? "Show Less" : "Read More..."}
        </button>
      )}
    </div>
  );
}

export const columns: ColumnDef<Genre>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Genre Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const name: string = row.getValue("name");
      return <div className="text-start font-medium">{name}</div>;
    },
  },
  {
    accessorKey: "description",
    header: () => <div className="text-start">Description</div>,
    cell: ({ row }) => {
      const description: string = row.getValue("description");

      return (
        <div className="text-start font-medium">
          <ExpandableText text={description} />
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-start">Created At</div>,
    cell: ({ row }) => {
      const created: Date = row.getValue("createdAt");
      const formattedDate = created.toLocaleString();
      return <div className="text-start font-medium">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="text-start">Updated At</div>,
    cell: ({ row }) => {
      const updated: Date = row.getValue("updatedAt");
      const formattedUpdated = updated.toLocaleString();
      return <div className="text-start font-medium">{formattedUpdated}</div>;
    },
  },
  {
    id: "edit",
    header: () => <div className="text-start">Edit</div>,

    cell: ({ row }) => {
      const genre = row.original;

      return <EditDialog genre={genre} />;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "delete",
    header: () => <div className="text-start">Delete</div>,

    cell: ({ row }) => {
      const genre = row.original;

      return <DeleteDialog genre={genre} />;
    },
    enableSorting: false,
    enableHiding: false,
  },
];
