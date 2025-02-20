'use client'
import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MovieData, UpdateTodo } from "@/app/actions/editupdateMovie";

const MovieSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(2, { message: "Title must be at least 2 characters." }),
  description: z
    .string({ required_error: "Description is required" })
    .min(5, { message: "Description must be at least 5 characters." }),
  imageurl: z
    .string().url("Invalid URL").nullable().or(z.literal("")),
  genres: z
    .string({ required_error: "Genres are required" })
    .min(1, { message: "At least one genre is required" }),
  actors: z
    .string({ required_error: "Genres are required" })
    .min(1, { message: "At least one genre is required" }),
  directors: z
    .string({ required_error: "Genres are required" })
    .min(1, { message: "At least one genre is required" }),
  price: z
    .number({ required_error: "Price is required" })
    .positive({ message: "Price must be a positive number" })
    .min(1, { message: "Price must be at least 1." }),
  stock: z
    .number({ required_error: "Stock is required" })
    .int({ message: "Stock must be an integer" })
    .min(0, { message: "Stock cannot be negative" }),
  release: z
    .number({ required_error: "Release year is required" })
    .int({ message: "Release year must be an integer" })
    .min(1900, { message: "Invalid release year" })
    .max(new Date().getFullYear(), { message: "Future years are not allowed" }),
  runtime: z
    .string({ required_error: "Runtime is required" })
    .min(1, { message: "Runtime is required and must be a valid duration" }),
});

type FormData = z.infer<typeof MovieSchema>;

export function EditDialog({ data }: { data: MovieData }) {
  const [open, setOpen] = useState(false);
  const initialGenres = data.genres ? data.genres.map(g => g.name).join(", ") : "";
  const initialActors = data.starring
  ? data.starring
      .filter(g => g.role === "ACTOR" && g.person?.name) // Ensure role is "ACTOR" (uppercase) and name exists
      .map(g => g.person.name)
      .join(", ")
  : "";
  const initialDirectors = data.starring
  ? data.starring
      .filter(g => g.role === "DIRECTOR" && g.person?.name) // Ensure role is "DIRECTOR" (uppercase) and name exists
      .map(g => g.person.name)
      .join(", ")
  : "";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(MovieSchema),
    defaultValues: {
      title: data.title,
      description: data.description,
      imageurl: data.imageUrl ?? "",
      genres: initialGenres,
      actors: initialActors,
      directors:initialDirectors,
      price: Number(data.price),
      stock: Number(data.stock),
      release: Number(data.releaseDate),
      runtime: data.runtime,
    },
  });

  

  // Watch all form values - this gives us access to current form values
  const formValues = watch();

  const onSubmit = async (formData: FormData) => {
    try {
      const result = await UpdateTodo(data.id, formData);
      
      if (result.success) {
        toast.success(`Updated movie: ${formData.title}`);
        setOpen(false);
      } else {
        toast.error(result.message || "Could not update the movie");
      }
    } catch (error) {
      toast.error("Could not update the movie");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      if (!newOpen) {
        // Reset form to initial values when dialog closes
        reset();
      }
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 border hover:text-white border-blue-700 rounded">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Movie</DialogTitle>
          <DialogDescription>Update the movie details below.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="block text-sm font-medium col-span-1">Title</label>
            <input
              {...register("title")}
              defaultValue={formValues.title}
              className="w-full border rounded px-2 py-1 col-span-3"
            />
            {errors.title && (
              <p className="text-red-500 text-sm col-span-3 col-start-2">{errors.title.message}</p>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label className="block text-sm font-medium col-span-1">Description</label>
            <input
              {...register("description")}
              defaultValue={formValues.description}
              className="w-full border rounded px-2 py-1 col-span-3"
            />
            {errors.description && (
              <p className="text-red-500 text-sm col-span-3 col-start-2">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label className="block text-sm font-medium col-span-1">Image URL</label>
            <input
              {...register("imageurl")}
              defaultValue={formValues.imageurl ?? ""}
              className="w-full border rounded px-2 py-1 col-span-3"
            />
            {errors.imageurl && (
              <p className="text-red-500 text-sm col-span-3 col-start-2">{errors.imageurl.message}</p>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label className="block text-sm font-medium col-span-1">Genres</label>
            <input
              {...register("genres")}
              defaultValue={formValues.genres}
              placeholder="Action, Drama, Comedy"
              className="w-full border rounded px-2 py-1 col-span-3"
            />
            {errors.genres && (
              <p className="text-red-500 text-sm col-span-3 col-start-2">{errors.genres.message}</p>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label className="block text-sm font-medium col-span-1">Actors</label>
            <input
              {...register("actors")}
              defaultValue={formValues.actors}
              placeholder="John, Sharuk, Karina"
              className="w-full border rounded px-2 py-1 col-span-3"
            />
            {errors.actors && (
              <p className="text-red-500 text-sm col-span-3 col-start-2">{errors.actors.message}</p>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label className="block text-sm font-medium col-span-1">Directors</label>
            <input
              {...register("directors")}
              defaultValue={formValues.directors}
              placeholder="John, Sharuk, Karina"
              className="w-full border rounded px-2 py-1 col-span-3"
            />
            {errors.directors && (
              <p className="text-red-500 text-sm col-span-3 col-start-2">{errors.directors.message}</p>
            )}
          </div>


          <div className="grid grid-cols-4 items-center gap-4">
            <label className="block text-sm font-medium col-span-1">Price</label>
            <input
              {...register("price", { valueAsNumber: true })}
              defaultValue={formValues.price}
              type="number"
              step="0.01"
              className="w-full border rounded px-2 py-1 col-span-3"
            />
            {errors.price && (
              <p className="text-red-500 text-sm col-span-3 col-start-2">{errors.price.message}</p>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label className="block text-sm font-medium col-span-1">Stock</label>
            <input
              {...register("stock", { valueAsNumber: true })}
              defaultValue={formValues.stock}
              type="number"
              className="w-full border rounded px-2 py-1 col-span-3"
            />
            {errors.stock && (
              <p className="text-red-500 text-sm col-span-3 col-start-2">{errors.stock.message}</p>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label className="block text-sm font-medium col-span-1">Release Year</label>
            <input
              {...register("release", { valueAsNumber: true })}
              defaultValue={formValues.release}
              type="number"
              className="w-full border rounded px-2 py-1 col-span-3"
            />
            {errors.release && (
              <p className="text-red-500 text-sm col-span-3 col-start-2">{errors.release.message}</p>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label className="block text-sm font-medium col-span-1">Runtime</label>
            <input
              {...register("runtime")}
              defaultValue={formValues.runtime}
              className="w-full border rounded px-2 py-1 col-span-3"
            />
            {errors.runtime && (
              <p className="text-red-500 text-sm col-span-3 col-start-2">{errors.runtime.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}