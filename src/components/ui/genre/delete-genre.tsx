import { DeleteGenre } from "@/app/actions/genre"
import { Genre } from "@/app/genre/columns"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash } from "lucide-react"
import { useState } from "react"

export function DeleteDialog({genre}:{genre: Genre}) {
    const [open,setOpen] = useState(false)

    return (
    <Dialog open= {open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size={"icon"}><Trash/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Do You Want to Delete this?</DialogTitle>
          <DialogDescription>
            Trashed items are non recoverble!!!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex grid-cols-4 items-center justify-end gap-4">
            <Button variant= "destructive"  className= "border rounded p-4" 
            onClick={async ()=> {await DeleteGenre(genre.id)
              setOpen(false)
            }}
            >Yes</Button>
            <Button variant= "secondary"  className= "border rounded p-4" onClick={(()=>setOpen(false))}>Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}        