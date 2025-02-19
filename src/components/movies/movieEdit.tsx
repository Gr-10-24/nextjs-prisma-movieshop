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

import { MovieData, UpdateTodo } from "@/app/actions/viewmovie";

const MovieSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(2, { message: "Title must be at least 2 characters." }),
  
  description: z
    .string({ required_error: "Description is required" })
    .min(5, { message: "Description must be at least 5 characters." }),
  
  imageurl: z
    .string().url("Invalid URL").nullable().or(z.literal("")),
  
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

    export function EditDialog({ data }: { data: MovieData }) {

      const [open, setOpen] = useState(false);

      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(MovieSchema),
        defaultValues: {
          title: data.title,
          description: data.description,
          imageurl: data.imageUrl ?? "",
          price: Number(data.price),
          stock: Number(data.stock),
          release: Number(data.releaseDate),
          runtime: data.runtime,
        },
      });
 
        const [editedData, setEditedData] = useState({
          title: data.title,
          description: data.description,
          imageurl: data.imageUrl ?? null,
          price: Number(data.price),
          stock: Number(data.stock),
          release: Number(data.releaseDate),
          runtime: data.runtime
        });
      
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value, type } = e.target;
          
          if (name === 'price' || name === 'stock' || name === 'release') {
            const numValue = value === '' ? 0 : Number(value);
            setEditedData(prev => ({
              ...prev,
              [name]: numValue
            }));
          } else {
            // Handle non-numeric fields
            setEditedData(prev => ({
              ...prev,
              [name]: value
            }));
          }
        };
        const handleSave = async () => {
          try {
            const dataToValidate = {
              ...editedData,
              price: Number(editedData.price),
              stock: Number(editedData.stock),
              release: Number(editedData.release)
            };
            const parsedData = MovieSchema.safeParse(dataToValidate);
        
            if (!parsedData.success) {
              parsedData.error.errors.forEach((err) => {
                toast.error(err.message);
              });
              return;
            }
            console.log("Parsed data:", parsedData.data); // Debugging log
            await UpdateTodo(data.id, parsedData.data);
            toast.success(`Updated movie: ${editedData.title}`);
            setOpen(false);
          } catch (error) {
            toast.error("Could not update the movie");
          }
        };

    return(
        <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 border hover:text-white border-blue-700 rounded">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
        <DialogTitle>Edit Movie</DialogTitle>
        <DialogDescription>Update the movie details below.</DialogDescription> 
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
          <label className="block text-sm font-medium col-span-1">Title</label>
          <input
            {...register("title")}
            type="text"
            name="title"
            value={editedData.title}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1 col-span-3"
          />
          {errors.title && (
            <h1 className="text-red-500 text-sm py-1 col-span-3">{errors.title.message}</h1>
          )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
          <label className="block text-sm font-medium col-span-1">Description</label>
          <input
            {...register("description")}
            type="text"
            name="description"
            value={editedData.description}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1 col-span-3"
          />
          {errors.description && (
            <h1 className="text-red-500 text-sm col-span-3">{errors.description.message}</h1>
          )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
          <label className="block text-sm font-medium col-span-1">ImageUrl</label>
          <input
            {...register("imageurl")}
            type="text"
            name="imageurl"
            value={editedData.imageurl ?? ""}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1 col-span-3"
          />
          {errors.imageurl && (
            <h1 className="text-red-500 text-sm">{errors.imageurl.message}</h1>
          )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
          <label className="block text-sm font-medium col-span-1">Price</label>
          <input
          {...register("price", { valueAsNumber: true })}
            type="number"
            name="price"
            value={editedData.price}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1 col-span-3"
            step="0.01"
          />
          {errors.price && (
            <h1 className="text-red-500 text-sm ">{errors.price.message}</h1>
          )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
          <label className="block text-sm font-medium col-span-1">Stock</label>
          <input
            {...register("stock", { valueAsNumber: true })}
            type="number"
            name="stock"
            value={editedData.stock}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1 col-span-3"
          />
          {errors.stock && (
            <h1 className="text-red-500 text-sm">{errors.stock.message}</h1>
          )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
          <label className="block text-sm font-medium col-span-1">Release year</label>
          <input
            {...register("release", { valueAsNumber: true })}
            type="number"
            name="release"
            value={editedData.release}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1 col-span-3"
          />
          {errors.release && (
            <h1 className="text-red-500 text-sm">{errors.release.message}</h1>
          )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
          <label className="block text-sm font-medium col-span-1">Runtime</label>
          <input
            {...register("runtime")}
            type="text"
            name="runtime"
            value={editedData.runtime}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1 col-span-3"
          />
          {errors.runtime && (
            <h1 className="text-red-500 text-sm">{errors.runtime.message}</h1>
          )}
          </div>
        </div>
        <DialogFooter>
          <Button type="submit"onClick={handleSubmit(handleSave)}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    )
    }