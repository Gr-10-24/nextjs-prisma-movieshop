"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"


const genreFormSchema = z.object({
  name: z.string({required_error:"This field is required"}).min(2, {message: "Name must be at least 2 characters."}),
  descript: z.string().min(5,{message : "Description Should have atleast 5 characters"})
            .max(500,{message: "Not Exceed 500 characters"}),
})

export default async function AddGenre(previousState:unknown,formdata:FormData){

    const result = genreFormSchema.safeParse(Object.fromEntries(formdata))

    if(!result.success){
        return {
            success : false,
            FieldError : result.error.flatten().fieldErrors
        }
    }
    else{
    
    try    {

        const existsGenre = await prisma.genre.findFirst({
            where : {name: result.data.name.toLocaleLowerCase()}
        })

        if (existsGenre) {
            return {
                success : false,
                FieldError : {name : ["Genre is Already Exists"]}
            }
        }
            await prisma.genre.create({
                data : {
                    name : result.data.name.toLocaleLowerCase(),
                    description : result.data.descript,
                },
            })            
                      
            revalidatePath("/")
            return {success : true}
    
        }
         catch{
        //   return  {success : false, message : "an error occurred"}
        }
    }
                   
}
            
        
export async function GetGenre(){
    await prisma.genre.findMany()
}    

export async function DeleteGenre(id:string){
   try{
    await prisma.genre.delete({
        where:{
            id,
        }
    })
    revalidatePath("/")

}  catch(error) {
    return error;
}
    
}

export async function EditGenre(id:string,name:string,descript:string){

    const rawData = {
        name ,
        descript
    }
    const result = genreFormSchema.safeParse(rawData)

    if(!result.success){
        return {
            success : false,
            FieldError : result.error.flatten().fieldErrors
        }
    }
    else 
    try {
    await prisma.genre.update({
        where:{
            id : id
        },
        data : {
            name : result.data.name,
            description : result.data.descript
        }
    })
    
    revalidatePath("/")
    return {success : true}
} catch {}
}