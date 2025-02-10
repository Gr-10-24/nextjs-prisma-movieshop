  import { Genre } from "@prisma/client"
  import { columns } from "./columns"
  import { DataTable } from "./data-table"
  import { prisma } from "@/lib/prisma"
  import AddGenre from "@/components/genre/genre-form"

  async function getData(): Promise<Genre[]> {
  const getGenre = await prisma.genre.findMany()
    return getGenre 
  }

  export default async function DemoPage() {
    const data = await getData()
    return (
      <div className="flex container">
        <div className="flex container border w-1/4 ">
          <AddGenre/>
        </div>
      <div className="w-3/4  px-3">
        <div className=" flex container justify-center text-2xl py-5">
        <h1 >List of Genres</h1>
        </div>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
      </div>
    )
  }
