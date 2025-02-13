"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Define Zod schema for validation
const movieSchema = z.object({
  title: z
    .string({ required_error: "This field is required" })
    .min(2, { message: "Title must be at least 2 characters." }),
  descript: z
    .string()
    .min(5, { message: "Description Should have atleast 5 characters" })
    .max(500, { message: "Not Exceed 100 characters" }),
  imageurl: z.string().url({ message: "Please Enter a valid URL" }),
  price: z
    .string({ required_error: "This field is required" })
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: "Price must have up to 2 decimal places",
    })
    .min(0, { message: "Price must be atleast 0" })
    .max(500, { message: "Price can't be above 500" }),
  // .refine((value)=>(/^\d+(\.\d{1,2})?$/).test(value.toString()),{message: "Price must have up to 2 decimal places"}),
  stock: z.string().refine(
    (value) => {
      const parsedVal = parseInt(value, 10);
      return parsedVal >= 1;
    },
    { message: "Stock should be a positive number" }
  ),
  released: z.string().refine(
    (value) => {
      const parsedValue = parseInt(value);
      return parsedValue < new Date().getFullYear();
    },
    { message: "Published date should be a past year" }
  ),
  runtime: z
    .string()
    .refine(
      (value) => {
        const parsedValue = parseInt(value, 10);
        return !isNaN(parsedValue) && Number.isInteger(parsedValue);
      },
      { message: "run time must be a whole number" }
    )
    .refine(
      (value) => {
        const parsedValue = parseInt(value, 10);
        return parsedValue >= 1;
      },
      { message: "Runtime must be least 1min" }
    )
    .refine(
      (value) => {
        const parsedValue = parseInt(value, 10);
        return parsedValue < 300;
      },
      { message: "run time must be less than 300min" }
    ),
  genres: z.string({
    required_error: "This field must contain atleast one data",
  }),
});

export async function addMovie(formData: FormData) {
  const inputData = {
    title: formData.get("title"),
    descript: formData.get("descript"),
    imageurl: formData.get("imageurl"),
    genres : formData.get("genres"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    released: formData.get("released"),
    runtime: formData.get("runtime"),
  };

  const result = movieSchema.safeParse(inputData);
  if (!result.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: result.error.format(),
    };
  }

  const { title, descript, imageurl, price, stock, released, runtime, genres } =
    result.data;
  // Added below to check whether the genre is already exists or not.
    const genreExists = await prisma.genre.findFirst({
      where:{name:genres},
      select : {id:true}
    })

  try {
    const movie = await prisma.movie.create({
      data: {
        title,
        description: descript,
        imageUrl: imageurl,
        price: parseFloat(price),
        stock: Number(stock),
        releaseDate: Number(released),
        runtime,
        // I added below 2 lines to connect if the genre already exists else create.
        genre : genreExists
        ? {connect: {id: genreExists.id}}
        : {create: {name: genres, description:""}}
      },
    });

    revalidatePath("/");
    return {
      id: movie.id,
      success: true,
      message: "Movie added successfully!",
    };
  } catch (error) {
    console.error("Error adding movie:", error);
    return {
      success: false,
      message: "Failed to add movie.",
    };
  }
}
