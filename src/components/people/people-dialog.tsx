"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Person } from "@prisma/client";

import { PenBox } from "lucide-react";
import PeopleForm from "./people-form";

export function PeopleDialog({ data }: { data?: Person }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"edit"} className="mx-1">
          {!data ? "Add Person" : <PenBox />}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        {data ? <PeopleForm data={data} /> : <PeopleForm />}
      </DialogContent>
    </Dialog>
  );
}
