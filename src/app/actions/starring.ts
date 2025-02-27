"use server";

import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { addPersonQ } from "./people";

const formSchema = z.object({
  id: z.string().optional(),
  personId: z.string(),
  movieId: z.string(),
  role: z.enum(["DIRECTOR", "ACTOR"]),
});

export async function CreateStarring(
  previousState: unknown,
  formData: FormData
) {
  const result = formSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  }

  const starring = await prisma.starring.create({
    data: {
      personId: result.data.personId,
      movieId: result.data.movieId,
      role: result.data.role,
    },
  });

  revalidatePath("/");
  console.log(starring.id);
  console.log(result.data);
}

const stringSchema = z.string();
const enumSchema = z.enum(["DIRECTOR", "ACTOR"]);

export async function addStarring(
  personId: string,
  movieId: string,
  role: Role
) {
  const personResult = stringSchema.safeParse(personId);

  if (!personResult.success) {
    console.log(personResult.error.flatten());
    return personResult.error.flatten();
  }
  const movieResult = stringSchema.safeParse(movieId);

  if (!movieResult.success) {
    console.log(movieResult.error.flatten());
    return movieResult.error.flatten();
  }

  const roleResult = enumSchema.safeParse(role);

  if (!roleResult.success) {
    console.log(roleResult.error.flatten());
    return roleResult.error.flatten();
  }

  const starring = await prisma.starring.create({
    data: {
      personId,
      movieId,
      role,
    },
  });

  revalidatePath("/");
  console.log(starring.id);
}

export async function addStarringQ(movieId: string, name: string, role: Role) {
  const nameResult = stringSchema.safeParse(name);

  if (!nameResult.success) {
    console.log(nameResult.error.flatten());
    return nameResult.error.flatten();
  }
  const movieResult = stringSchema.safeParse(movieId);

  if (!movieResult.success) {
    console.log(movieResult.error.flatten());
    return movieResult.error.flatten();
  }

  const roleResult = enumSchema.safeParse(role);

  if (!roleResult.success) {
    console.log(roleResult.error.flatten());
    return roleResult.error.flatten();
  }

  const person = await addPersonQ(nameResult.data);
  if (person === "Errror") {
    return {
      fieldErrors: {
        movieId: [""],
        name: ["There was something wrong with the name: " + name],
        role: [""],
      },
    };
  }

  const starring = await prisma.starring.create({
    data: {
      personId: person,
      movieId: movieResult.data,
      role: roleResult.data,
    },
  });

  revalidatePath("/");
  console.log(starring.id);
}

// export async function addStarringQ2(movieId: string, name: string, role: Role) {
//   const nameResult = stringSchema.safeParse(name);

//   if (!nameResult.success) {
//     console.log(nameResult.error.flatten());
//     return nameResult.error.flatten();
//   }
//   const movieResult = stringSchema.safeParse(movieId);

//   if (!movieResult.success) {
//     console.log(movieResult.error.flatten());
//     return movieResult.error.flatten();
//   }

//   const roleResult = enumSchema.safeParse(role);

//   if (!roleResult.success) {
//     console.log(roleResult.error.flatten());
//     return roleResult.error.flatten();
//   }

//   // const person = await addPersonQ(nameResult.data);
//   // if (person === "Errror") {
//   //   return {
//   //     fieldErrors: {
//   //       movieId: [""],
//   //       name: ["There was something wrong with the name: " + name],
//   //       role: [""],
//   //     },
//   //   };
//   // }

//   const starring = await prisma.starring.create({
//     data: {
//       movieId: movieResult.data,
//       role: roleResult.data,
//       person: {
//         connectOrCreate: {
//           where: {
//             name: nameResult.data,
//           },
//           create: {
//             name: nameResult.data,
//           },
//         },
//       },
//     },
//     include: {
//       person: true,
//     },
//   });

//   revalidatePath("/");
//   console.log(starring.id);
// }

// const result = await prisma.post.create({
//     data: {
//       title: 'How to make croissants',
//       author: {
//         connectOrCreate: {
//           where: {
//             email: 'viola@prisma.io',
//           },
//           create: {
//             email: 'viola@prisma.io',
//             name: 'Viola',
//           },
//         },
//       },
//     },
//     include: {
//       author: true,
//     },
//   })

export async function editStarring(
  id: string,
  personId: string,
  movieId: string,
  role: Role
) {
  const idResult = stringSchema.safeParse(id);

  if (!idResult.success) {
    console.log(idResult.error.flatten());
    return idResult.error.flatten();
  }

  const personResult = stringSchema.safeParse(personId);

  if (!personResult.success) {
    console.log(personResult.error.flatten());
    return personResult.error.flatten();
  }
  const movieResult = stringSchema.safeParse(movieId);

  if (!movieResult.success) {
    console.log(movieResult.error.flatten());
    return movieResult.error.flatten();
  }

  const roleResult = enumSchema.safeParse(role);

  if (!roleResult.success) {
    console.log(roleResult.error.flatten());
    return roleResult.error.flatten();
  }

  const starring = await prisma.starring.update({
    where: { id: idResult.data },
    data: {
      personId: personResult.data,
      movieId: movieResult.data,
      role: roleResult.data,
    },
  });

  revalidatePath("/");
  console.log(starring.id);
}

export async function deleteStarring(id: string) {
  const idResult = stringSchema.safeParse(id);

  if (!idResult.success) {
    console.log(idResult.error.flatten());
    return idResult.error.flatten();
  }

  await prisma.starring.delete({
    where: { id: idResult.data },
  });
  revalidatePath("/");
  console.log("Entry with id: " + idResult.data + " has been deleted");
}
