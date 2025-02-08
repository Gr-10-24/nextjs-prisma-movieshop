"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Genre, { DeleteGenre } from "../actions/genre"
import { DeleteDialog } from "@/components/ui/genre/delete-genre"
import { EditDialog } from "@/components/ui/genre/edit-genre"

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

  {
    id: "actions",
    cell: ({ row }) => {
      const genre = row.original

 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(genre.name)}
            >
              Copy Genre Name
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem
              onClick={async()=>DeleteGenre(genre.id)}
            >Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  {
    id: "edit",

    cell: ({ row }) => {
      const genre = row.original

      return <EditDialog genre={genre} />
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "delete",

    cell: ({ row }) => {
      const genre = row.original

      return <DeleteDialog genre = {genre}/>
    },
    enableSorting: false,
    enableHiding: false,
  },
 

]
