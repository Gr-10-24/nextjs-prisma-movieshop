import { Genre } from "@prisma/client";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { prisma } from "@/lib/prisma";
import GenreForm from "@/components/ui/genre/form";

async function getData(): Promise<Genre[]> {
  const getGenre = await prisma.genre.findMany();
  return getGenre;
}

export default async function DemoPage() {
  const data = await getData();
  return (
    <div className="flex w-full">
      <div className=" border  w-1/2 lg:w-1/3 py-6 ">
      <h1 className="flex justify-center pb-2 text-2xl text-black ">Genre Registration Form</h1>
       <div className="flex container justify-center">
        <GenreForm />
       </div>
      </div>
      <div className="w-1/2 lg:w-2/3 pl-2 overflow-auto py-5">
        <div className="flex  justify-center text-2xl ">
          <h1>List of Genres</h1>
        </div>
        <div className="">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}
