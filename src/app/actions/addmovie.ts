"use server";

import { PrismaClient, Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const prisma = new PrismaClient();

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
      return parsedValue <= new Date().getFullYear();
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
  genres:z.array(z.string()).min(1, { message: "At least one genre is required" }),
  directors:z.array(z.string()).min(1, { message: "At least one director is required" }),
  actors:z.array(z.string()).min(1, { message: "At least one director is required" }),
});

export async function addMovie(formData: FormData) {
  const genreValues = formData.getAll("genres");
  const directorvalues = formData.getAll("directors");
  const actorsvalues = formData.getAll("actors");
  const inputData = {
    title: formData.get("title"),
    descript: formData.get("descript"),
    imageurl: formData.get("imageurl"),
    genres : genreValues,
    directors: directorvalues,
    actors: actorsvalues,
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

  const { title, descript, imageurl, price, stock, released, runtime, genres,directors,actors } =
    result.data;


  try {
//for multiple genres

 const genreNames = genres.flatMap(g => g.split(',').map(name => name.trim()));

 // Find or create individual genres
 const genreConnections = await Promise.all(
   genreNames.map(async (genreName) => {
     const existingGenre = await prisma.genre.findFirst({
       where: {
         // Case insensitive search for existing genre
         name: {
           equals: genreName,
           mode: 'insensitive'
         }
       },
     });

     if (existingGenre) {
       return { id: existingGenre.id };
     } else {
       // Create new genre only if it doesn't exist
       const newGenre = await prisma.genre.create({
         data: {
           name: genreName,
           description: `${genreName} genre movies` // Default description
         },
       });
       return { id: newGenre.id };
     }
   })
 );

   // Process both directors and actors
   const directorsname = directors.flatMap(g => g.split(',').map(name => name.trim()));
   const actorsName = actors.flatMap(g => g.split(',').map(name => name.trim()));
 
   // Create connections for both directors and actors
   const starringConnections = await Promise.all([
     ...directorsname.map(async (directorName) => {
       const existingPerson = await prisma.person.findFirst({
         where: {
           name: {
             equals: directorName,
             mode: 'insensitive'
           }
         },
       });
 
       const personId = existingPerson ? existingPerson.id : 
         (await prisma.person.create({
           data: {
             name: directorName,
             description: `Director`
           },
         })).id;
 
       return {
         role: Role.DIRECTOR,
         person: {
           connect: {
             id: personId
           }
         }
       };
     }),
     ...actorsName.map(async (actorName) => {
       const existingPerson = await prisma.person.findFirst({
         where: {
           name: {
             equals: actorName,
             mode: 'insensitive'
           }
         },
       });
 
       const personId = existingPerson ? existingPerson.id : 
         (await prisma.person.create({
           data: {
             name: actorName,
             description: `Actor`
           },
         })).id;
 
       return {
         role: Role.ACTOR,
         person: {
           connect: {
             id: personId
           }
         }
       };
     })
   ]);

//create movie form......
    const movie = await prisma.movie.create({
      data: {
        title,
        description: descript,
        imageUrl: imageurl,
        price: parseFloat(price),
        stock: Number(stock),
        releaseDate: Number(released),
        runtime,
        genre: {
          connect: genreConnections,
        },
        starring: {
          
          create: starringConnections, 
        
        },
      },
      include: {
        genre: true, // Include genres in the response
        starring: {
          include: {
            person: true
          }
        },
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