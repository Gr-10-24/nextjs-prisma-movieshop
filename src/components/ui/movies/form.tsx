"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { useState } from "react"

const FormSchema = z.object({
  title: z.string({required_error:"This field is required"}).min(2, {message: "Title must be at least 2 characters."}),
  descript: z.string().min(5,{message : "Description Should have atleast 5 characters"})
            .max(500,{message: "Not Exceed 100 characters"}),
  imageurl : z.string().url({message:"Please Enter a valid URL"}),
  price : z.string({required_error:"This field is required"}).regex(/^\d+(\.\d{1,2})?$/,{message: "Price must have up to 2 decimal places"})
            .min(0 ,{message : "Price must be atleast 0"}).max(500,{message : "Price can't be above 500"}),
            // .refine((value)=>(/^\d+(\.\d{1,2})?$/).test(value.toString()),{message: "Price must have up to 2 decimal places"}),
  stock : z.string().refine((value)=>{const parsedVal = parseInt(value,10)
            return parsedVal >=1},{message : "Stock should be a positive number"}),
  released : z.string().refine((value)=>{
           const parsedValue = parseInt(value)
           return parsedValue < (new Date()).getFullYear()},{message: "Published date should be a past year"}),
  runtime : z.string().refine((value)=>{
            const parsedValue = parseInt(value,10)
            return !isNaN(parsedValue)&&Number.isInteger(parsedValue)},{message:"run time must be a whole number"}).
            refine((value)=>{
                const parsedValue = parseInt(value,10)
                return parsedValue >=1},{message:"Runtime must be least 1min"}).
                refine((value)=>{
                    const parsedValue = parseInt(value,10)
                    return parsedValue <300},{message:"run time must be less than 300min"}),})

export default function MovieForm() {

  
  const [count,setCount] =useState(0)


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      descript : "",
      imageurl:"",
      price:"",
      stock:"", 
      released : "",
      runtime : "",
    },
  })



  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Title</FormLabel>
              <FormControl>
                <Input className="border border-black mb-6" placeholder="Movie Title..." {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
          
        <FormField
          control={form.control}
          name="descript"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Description</FormLabel>
              <FormControl>
                <div>
                <textarea className="border border-black mb-6 p-2 w-full rounded-md resize-y" 
                rows={4}
                placeholder="description of the movie" {...field} 
                onChange= {(e)=>{
                  field.onChange(e); 
                  setCount(e.target.value.length)
                }}
                />
                <p>{count}/500 max characters</p>
               </div>   
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageurl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Movie Cover photo</FormLabel>
              <FormControl>
                <Input className="border border-black mb-6" placeholder="URL for Movie Cover..." {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Price</FormLabel>
              <FormControl>
                <Input  className="border border-black mb-6" placeholder="Price in SEK" {...field} />
              </FormControl>
              <FormDescription>
                Price must be in kr.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">No of Copies</FormLabel>
              <FormControl>
                <Input className="border border-black mb-6" placeholder="No of Copies..." {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="released"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Released Year</FormLabel>
              <FormControl>
                <Input className="border border-black mb-6" placeholder="Movie Released Year-YYYY" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="runtime"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Run time</FormLabel>
              <FormControl>
                <Input className="border border-black mb-6" placeholder="Run time in min" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}


