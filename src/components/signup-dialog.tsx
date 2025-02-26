"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import SignUpForm from "./signup-form";

export function SignupDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"default"} className="border-2">
          {"Register"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <SignUpForm />
      </DialogContent>
    </Dialog>
  );
}
