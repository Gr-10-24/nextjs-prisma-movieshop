"use client";
// import { MovieData } from "@/app/actions/viewmovie";
import { TableCell, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import {
  //Role,
  User,
} from "@prisma/client";
// import { DeleteTodo } from "@/app/actions/editupdateMovie";
// import { Trash, Trash2, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { UpdateTodo } from "@/app/actions/ban";

export default function ViewBan({ data }: { data: User }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{data.email}</TableCell>
      <TableCell>{data.banReason}</TableCell>
      <TableCell>
        <Button
          onClick={() =>
            UpdateTodo(data.id).then(() =>
              toast({
                title: "unban successful",
                variant: "destructive",
              })
            )
          }
          className="bg-blue-500 hover:bg-green-700 text-white font-bold py-1 px-3 border border-green-700 rounded "
        >
          Unban
        </Button>
      </TableCell>
    </TableRow>
  );
}
