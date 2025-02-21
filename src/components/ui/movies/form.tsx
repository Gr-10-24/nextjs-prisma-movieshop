"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { addMovie } from "@/app/actions/addmovie";
import { GetGenres } from "../genre/add-genre";

const FormSchema = z.object({
  title: z
    .string({ required_error: "This field is required" })
    .min(2, { message: "Title must be at least 2 characters." }),
  descript: z
    .string()
    .min(5, { message: "Description Should have atleast 5 characters" })
    .max(500, { message: "Not Exceed 100 characters" }),
  genres: z.string({
    required_error: "This field must contain atleast one genre",
  }),
  directors: z.string({
    required_error: "This field must contain atleast one director",
  }),
  actors: z.string({
    required_error: "This field must contain atleast one actor",
  }),
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
});

export default function MovieForm() {
  const [message, setMessage] = useState<string | null>(null);
  //usestate use
  const [count, setCount] = useState(0);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      descript: "",
      imageurl: "",
      genres: "",
      directors: "",
      actors: "",
      price: "",
      stock: "",
      released: "",
      runtime: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("descript", data.descript);
    formData.append("imageurl", data.imageurl);
    formData.append("genres", data.genres);
    formData.append("directors", data.directors);
    formData.append("actors", data.actors);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("released", data.released);
    formData.append("runtime", data.runtime);

    try {
      const response = await addMovie(formData);
      if (response.success) {
        setMessage("Form submitted successfully!");
        form.reset(); // Reset the form fields
      } else {
        setMessage(
          "There was an issue with your submission. Please try again."
        );
      }
    } catch (error) {
      console.error("Form submission error", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to add movie",
        error: error instanceof Error ? error.stack : undefined
      };
    }
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
                <Input
                  className="border border-black mb-6"
                  placeholder="Movie Title..."
                  {...field}
                />
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
                  <textarea
                    className="border border-black mb-6 p-2 w-full rounded-md resize-y"
                    rows={4}
                    placeholder="description of the movie"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setCount(e.target.value.length);
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
                <Input
                  className="border border-black mb-6"
                  placeholder="URL for Movie Cover..."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genres"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Genres</FormLabel>
              <FormControl>
                <GetGenres field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="directors"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Directors</FormLabel>
              <FormControl>
                <Input
                  className="border border-black mb-6"
                  placeholder="Type directors' names with seperated by commas..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="actors"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Actors</FormLabel>
              <FormControl>
                <Input
                  className="border border-black mb-6"
                  placeholder="Type actors' names with seperated by commas..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="genres"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Genres</FormLabel>
              <FormControl>
                <GetGenres field={field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/* <FormField
          control={form.control}
          name="genres"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Genres</FormLabel>
              <FormControl>
                <Input
                  className="border border-black mb-6"
                  placeholder="Type genres' names with seperated by commas..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        
       
        {/* <FormField
          control={form.control}
          name="directors"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Directors</FormLabel>
              <FormControl>
                <Input
                  className="border border-black mb-6"
                  placeholder="Type directors' names with seperated by commas..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         
        <FormField
          control={form.control}
          name="actors"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Actors</FormLabel>
              <FormControl>
                <Input
                  className="border border-black mb-6"
                  placeholder="Type actors' names with seperated by commas..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />  */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Price</FormLabel>
              <FormControl>
                <Input
                  className="border border-black mb-6"
                  placeholder="Price in SEK"
                  {...field}
                />
              </FormControl>
              <FormDescription>Price must be in kr.</FormDescription>
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
                <Input
                  className="border border-black mb-6"
                  placeholder="No of Copies..."
                  {...field}
                />
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
                <Input
                  className="border border-black mb-6"
                  placeholder="Movie Released Year-YYYY"
                  {...field}
                />
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
                <Input
                  className="border border-black mb-6"
                  placeholder="Run time in min"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
        {message && <p className="text-black">{message}</p>}
      </form>
    </Form>
  );
}
