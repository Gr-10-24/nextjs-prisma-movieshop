"use client";
import { DeleteTodo, GetMovie, MovieData } from "@/app/actions/viewmovie";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { Movie } from "@prisma/client";
import { useEffect, useState } from "react";
import { EditDialog } from "./movieEdit";

export default function ViewMovie({ data }: { data: MovieData }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{data.title}</TableCell>
      <TableCell>
        {data.description.length > 50
          ? `${data.description.slice(0, 50)}...`
          : data.description}
      </TableCell>
      <TableCell title={data.imageUrl ?? "No Image"}>
        {data.imageUrl ? `${data.imageUrl.slice(0, 30)}...` : "No Image"}
      </TableCell>
      <TableCell>{data.price}</TableCell>
      <TableCell>{data.stock}</TableCell>
      <TableCell>{data.releaseDate}</TableCell>
      <TableCell>{data.runtime}</TableCell>
      <TableCell>
        <EditDialog data={data} />
      </TableCell>
      <TableCell>
        <button
          onClick={() =>
            DeleteTodo(data.id).then(() =>
              toast({
                title: "Delete successful",
                description: data.title + "Was deleted",
                variant: "destructive",
              })
            )
          }
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 border border-red-700 rounded"
        >
          Delete
        </button>
      </TableCell>
    </TableRow>
  );
}
