"use client";
import { MovieData } from "@/app/actions/viewmovie";
import { TableCell, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { Role } from "@prisma/client";
import { EditDialog } from "./movieEdit";
import { deleteMovie } from "@/app/actions/movie";

export default function ViewMovie({ data }: { data: MovieData }) {
  const directors =
    data.starring
      ?.filter((star) => star.role === Role.DIRECTOR)
      .map((star) => star.person.name)
      .join(", ") || "No Directors";

  const actors =
    data.starring
      ?.filter((star) => star.role === Role.ACTOR)
      .map((star) => star.person.name)
      .join(", ") || "No Actors";

  return (
    <TableRow>
      <TableCell className="font-medium">{data.title}</TableCell>
      <TableCell className="truncate">{data.description}</TableCell>
      <TableCell className="truncate">{data.imageUrl || "No Image"}</TableCell>
      <TableCell>{data.genres.map((genre) => genre.name).join(", ")}</TableCell>
      <TableCell>{actors}</TableCell>
      <TableCell>{directors}</TableCell>
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
            deleteMovie(data.id).then(() =>
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
