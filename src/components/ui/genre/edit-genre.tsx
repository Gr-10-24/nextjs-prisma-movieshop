import { EditGenre } from "@/app/actions/genre";
import { Genre } from "@/app/genre/columns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import { Input } from "../input";


export function EditDialog({ genre }: { genre: Genre }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(genre.name);
  const [description, setDescription] = useState(genre.description);
  const [loading, setLoading] = useState(false);
  const [FieldError, setFieldError] = useState<Record<string, string[]>>({});

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const result = await EditGenre(genre.id, name, description);
    setLoading(false);

    if (result?.success) {
      setOpen(false);
      setFieldError({});
    } else {
      setFieldError(result?.FieldError || {});
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="bg-blue-700 text-white"
          size={"default"}
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] ">
        <form onSubmit={handleUpdate}>
          <DialogHeader>
            <DialogTitle>Quick Edit Form</DialogTitle>
            <DialogDescription>Fill your Changes Below</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name">Name</label>
              <Input
                id="name"
                className="w-96 border border-black rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Input>
            </div>
            {FieldError.name && (
              <div className="text-red-800 flex justify-end">
                {FieldError.name}
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="descript">Description</label>
              {description && (
                <textarea
                  className="w-96 border border-black mb-6 p-2 rounded-md resize-y"
                  rows={3}
                  placeholder="description of the genre"
                  id="descript"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              )}
            </div>
            {FieldError.descript && (
              <div className="text-red-600 flex justify-end">
                {FieldError.descript}
              </div>
            )}

            <div className="flex justify-end gap-2 pb-4">
              <Button type="submit" disabled={loading}>
                Save
              </Button>
              <Button
                variant="secondary"
                className="border rounded p-4"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
