"use client";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Person } from "@prisma/client";

import { BookOpenText } from "lucide-react";
import PeopleCardD from "./people-card-detailed";

export function PeopleDialogD({ data }: {data: Person}) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="border-2" > <BookOpenText /> </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
            <DialogTitle></DialogTitle>
        </DialogHeader>
        <PeopleCardD data={data} />
      </DialogContent>
    </Dialog>
  )
}
