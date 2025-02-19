"use client"

// A toast to ask an admin if the database should be populated
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useEffect } from "react";
import { getMovieCount, populateDb } from "../actions/populate-db";

export default function PopulateDBToast () {
  useEffect(() => {
    const f = async () => {
      const movieCount = await getMovieCount()
      if (movieCount < 10)
      toast({
        title: "Add some movies?",
        description: "This site seems a bit empty. Do you want me to add some movies to it?",
        action: (
          <>
            <ToastAction
              onClick={populateDb}
              altText="Add movies"
            >
              Add some Movies
            </ToastAction>
            <ToastAction
              onClick={async () => console.log("goodbye")}
              altText="Dismiss Forever"
            >
              No, go away forever
            </ToastAction >
          </>
        )
      })
    }
    f()
  })

  return null
}
