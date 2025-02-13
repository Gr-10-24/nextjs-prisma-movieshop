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
import AddMovie from "@/components/movies/movie-form";

export default async function Movies() {
  const getmovie = await GetMovie();

  return (
    <div className="flex">
      <div className="w-1/2 lg:w-1/3">
        <AddMovie />
      </div>
      <div className="w-1/2 lg:w-2/3 overflow-auto p-2">
        <h1 className="text-black m-4">Movie details</h1>
        {getmovie.length === 0 && <p>No book at yet</p>}
        {getmovie.length > 0 && (
          <Table>
            <TableCaption>A list of Movie</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>ImageUrl</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Released Date</TableHead>
                <TableHead>Runtime</TableHead>
                <TableHead>Edit</TableHead>
                <TableHead>Delete</TableHead>
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
    </div>
  );
}
