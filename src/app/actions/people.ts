"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getPeople() {
  return await prisma.person.findMany();
}

export async function getPeopleWstarring() {
    return await prisma.person.findMany({
        include: {
            movies: true,
        }
    });
}

export async function getPerson(id: string) {
  return await prisma.person.findUnique({
    where: {
      id,
    },
  });
}

export async function getPersonWstarring(id: string) {
    return await prisma.person.findUnique({
      where: {
        id,
      },
      include: {
        movies: true,
      }
    });
  }

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: "Name needs to be longer" }),
  description: z.string().min(3, "Too short").max(250, "Too long"),
});

const stringSchema = z.string().min(2, { message: "Name needs to be longer" }).max(30,{message: "name too long"});

export async function CreatePerson(previousState: unknown, formData: FormData) {
  //allows you to create a person with description using a form
  const result = formSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  }

  const check = await prisma.person.findFirst({
    where: {
      name: result.data.name,
    },
  });
  //console.log(check);
  if (check !== null) {
    return {
      fieldErrors: {
        name: ["Person already exists in DB"],
        description: [""],
      },
    };
  }

  const person = await prisma.person.create({
    data: {
      name: result.data.name,
      description: result.data.description,
    },
  });

  revalidatePath("/");
  console.log(person.name);
}

export async function addPerson(name: string) {
  //takes a single string and creates a person out of it, excluding desc.
  const result = stringSchema.safeParse(name);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  }

  const check = await prisma.person.findFirst({
    where: {
      name: result.data,
      description: "",
    },
  });
  //console.log(check);
  if (check !== null) {
    return {
      fieldErrors: {
        name: ["Person already exists in DB"],
      },
    };
  }

  const person = await prisma.person.create({
    data: {
      name: result.data,
      description: "",
    },
  });

  revalidatePath("/");
  console.log(person.name);
}

export async function UpdatePerson(previousState: unknown, formData: FormData) {
    const result = formSchema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      console.log(result.error.flatten());
      return result.error.flatten();
    }

    const member = await prisma.person.update({
        where: {
            id: result.data.id,
        },
        data: {
          name: result.data.name,
          description: result.data.description,
        },
      });
      revalidatePath("/");
      console.log(member.name);
      console.log(result.data);
}

export async function deletePerson(id: string) {
    await prisma.person.delete({
        where: 
        {
            id
        },
    })
    revalidatePath("/");
}
