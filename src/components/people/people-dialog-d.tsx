"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { BookOpenText } from "lucide-react";
import PeopleCardD from "./people-card-detailed";
import { Peep } from "@/types/people";

export function PeopleDialogD({ data }: { data: Peep }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="border-2">
          {" "}
          <BookOpenText />{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <PeopleCardD data={data} />
      </DialogContent>
    </Dialog>
  );
}
