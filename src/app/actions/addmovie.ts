"use server"

import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();


export  async function addMovie( formData: FormData) {
    const title = formData.get("title") as string ;
    const descript = formData.get("descript") as string;
    const imageurl = formData.get("imageurl") as string;
    const prices = formData.get("price") as string;
    const price = parseFloat(prices);
    const stock = Number(formData.get("stock") );
    const released =  Number(formData.get("released"));
    const runtime = formData.get("price") as string;
  
    if (!title || !descript || !imageurl || !price || !stock || !released || !runtime) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }
  
  
  
    try {
      const movie = await prisma.movie.create({
        data: {
          title,
          description: descript,
          imageUrl: imageurl,
          price,
          stock,
          releaseDate: released,
          runtime
        },
      });
      revalidatePath("/");
      return {
        id: movie.id,
        success: true,
        message: "Movie added successfully!",
      };
    } catch (error) {
      console.error("Error adding book:", error);
      return {
        success: false,
        message: "Failed to add book.",
      };
    }
  
  }
  