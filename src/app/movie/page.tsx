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
import MovieForm from "@/components/ui/movies/form";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function Movies() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const getmovie = await GetMovie();

  return (
    <div>
      {session?.user.role === "ADMIN" ? (
        <div className="flex">
          <div className=" border  w-1/2 lg:w-1/3 py-6 ">
            <h1 className="flex justify-center pb-2 text-2xl text-black ">
              Movie Registration Form
            </h1>
            <div className="flex container justify-center">
              <MovieForm />
            </div>
          </div>

          <div className="w-1/2 lg:w-2/3 overflow-auto p-2 py-5">
            <h1 className="flex text-black justify-center m-4 text-2xl">
              Movie details
            </h1>
            {getmovie.length === 0 && <p>No book at yet</p>}
            {getmovie.length > 0 && (
              <Table>
                <TableCaption>A list of Movie</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>ImageUrl</TableHead>
                    <TableHead>Genres</TableHead>
                    <TableHead>Actor</TableHead>
                    <TableHead>Director</TableHead>
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
      ) : (
        redirect("/")
      )}
    </div>
  );
}
