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
    <div className="flex container">
      <div className="border w-1/4 pl-8 ">
      <h1 className="text-2xl text-black py-5">Genre Registration Form</h1>
        <GenreForm />
      </div>
      <div className="w-3/4  px-3">
        <div className=" flex container justify-center text-2xl py-5">
          <h1>List of Genres</h1>
        </div>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}
