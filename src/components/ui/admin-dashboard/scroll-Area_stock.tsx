import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { CUSTOMMOVIE } from "../customer/landing-movies"
import { Separator } from "@/components/ui/separator"



export default function ScrollAreaStock({movie}:{movie:CUSTOMMOVIE[]}) {

   const movieStock = movie.sort((a,b)=>a.stock-b.stock )
  return (
    <ScrollArea className="h-72 w-48 rounded-md border md:border-4">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-semibold">Movie Stocks</h4>
        {movieStock.map((movie) => (
          <div key={movie.id}>
            <div key={movie.id} className="text-sm flex justify-between">
              <div>{movie.title}</div>
                <div >{movie.stock}</div>
            </div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
