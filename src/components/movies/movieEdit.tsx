"use client"
import { toast } from "react-toastify"; 
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MovieData, UpdateTodo } from "@/app/actions/viewmovie";
import { Movie, Prisma } from "@prisma/client";
import { useState } from "react";
import { release } from "os";




    export function EditDialog({ data }: { data: MovieData }) {

        const [editedData, setEditedData] = useState({
          title: data.title,
          description: data.description,
          imageurl: data.imageUrl ?? null,
          price: data.price,
          stock: data.stock,
          release: data.releaseDate,
          runtime: data.runtime
        });
      
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          if (name === "price") {
            
            setEditedData((prev) => ({
                ...prev,
                price: parseFloat(value), // Convert to float 
            }));
        } else {
              setEditedData((prev) => ({ ...prev, [name]: value === "" ? null : value }));
            }
        };
      
        const handleSave = async () => {
          try {
              const updatedData = {
                  title: editedData.title,
                  description: editedData.description,
                  imageurl: editedData.imageurl,
                  price: editedData.price,
                  stock: editedData.stock,
                  release: editedData.release,
                  runtime: editedData.runtime
                };
            await UpdateTodo(data.id, updatedData);
            toast.success(`Updated book: ${editedData.title}`);
          } catch (error) {
            toast.error("Could not update the book");
          }
        };
      

    return(
        <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 border hover:text-white border-blue-700 rounded">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={editedData.title}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1"
          />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
          <label className="block text-sm font-medium">Description</label>
          <input
            type="text"
            name="description"
            value={editedData.description}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1"
          />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
          <label className="block text-sm font-medium">ImageUrl</label>
          <input
            type="text"
            name="imageurl"
            value={editedData.imageurl ?? ""}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1"
          />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={editedData.price.toString()}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1"
          />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
          <label className="block text-sm font-medium">Stock</label>
          <input
            type="number"
            name="stock"
            value={editedData.stock}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1"
          />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
          <label className="block text-sm font-medium">Release year</label>
          <input
            type="number"
            name="release"
            value={editedData.release}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1"
          />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
          <label className="block text-sm font-medium">Runtime</label>
          <input
            type="number"
            name="runtime"
            value={editedData.runtime}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1"
          />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit"onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    )
    }