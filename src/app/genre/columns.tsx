"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Genre = {
  id: string
  name: string
  description: string
  createdAt: Date
  updatedAt: Date

}

export const columns: ColumnDef<Genre>[] = [
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
      )
    },
    cell: ({ row }) => {
      const name:string = row.getValue("name")
      return <div className="text-start font-medium">{name}</div>
    },
  },
  {
    accessorKey: "description",
    header: () => <div className="text-start">Description</div>,
    cell: ({ row }) => {
      const description:string = row.getValue("description")
      return <div className="text-start font-medium">{description}</div>
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-start">Created At</div>,
    cell: ({ row }) => {
      const created:Date = row.getValue("createdAt")
      const formattedDate = created.toLocaleString()
      return <div className="text-start font-medium">{formattedDate}</div>
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="text-start">Updated At</div>,
    cell: ({ row }) => {
      const updated:Date = row.getValue("updatedAt")
      const formattedUpdated = updated.toLocaleString()
      return <div className="text-start font-medium">{formattedUpdated}</div>
    },
  },


]
