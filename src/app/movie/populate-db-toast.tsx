"use client"

// A toast to ask an admin if the database should be populated
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useEffect } from "react";

export default function PopulateDBToast () {
  useEffect(() => {
    toast({
      title: "Populate Database",
      description: "Your Database seems a bit empty. Do you want me to add some movies to it?",
      action: (
        <>
          <ToastAction
            onClick={async () => console.log("hallo")}
            altText="Add movies"
          >
            Add Movies
          </ToastAction>
          <ToastAction
            onClick={async () => console.log("hallo")}
            altText="Dismiss Forever"
          >
            No, go away forever
          </ToastAction >
        </>
      )
    })
  })

  return null
}
