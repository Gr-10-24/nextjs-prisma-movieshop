import ViewMovie from "@/components/movies/viewmovie";
import { GetMovie } from "../actions/viewmovie";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Movies() {
  const getmovie = await GetMovie();

  return (
    <div className="overflow-auto p-2">
      <h1 className="text-black m-4">Movie details</h1>
      {getmovie.length === 0 && <p>No book at yet</p>}
      {getmovie.length > 0 && (
        <Table className="table-fixed">
          <TableCaption>A list of Movie</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>ImageUrl</TableHead>
              <TableHead>Genres</TableHead>
              <TableHead>Actor</TableHead>
              <TableHead>Director</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Released Date</TableHead>
              <TableHead>Runtime</TableHead>
              <TableHead className="w-[80px]">Edit</TableHead>
              <TableHead className="w-[80px]">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getmovie.map((movie) => (
              <ViewMovie key={movie.id} data={movie} />
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
