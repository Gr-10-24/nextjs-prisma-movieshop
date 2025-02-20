"use server"

import { z } from "zod";

// From components/ui/movies/form.tsx
const movieSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(2, { message: "Title must be at least 2 characters." }),
  description: z
    .string({ required_error: "Description is required" })
    .min(5, { message: "Description must be at least 5 characters." })
    .max(500, { message: "Not Exceed 100 characters" }),
  genres: z.string({
    required_error: "This field must contain atleast one genre",
  }),
  actors: z
    .string({ required_error: "Genres are required" })
    .min(1, { message: "At least one genre is required" }),
  directors: z
    .string({ required_error: "Genres are required" })
    .min(1, { message: "At least one genre is required" }),
  imageurl: z.string().url("Invalid URL").nullable().or(z.literal("")),
  price: z
    .number({ required_error: "Price is required" })
    .positive({ message: "Price must be a positive number" })
    .min(1, { message: "Price must be at least 1." }) ,
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
    .number({ required_error: "Runtime must be a valid number" })
    .min(1, { message: "Runtime must be a positive number" }),
});
