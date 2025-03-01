"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect, useState } from "react";
import AddGenre from "@/app/actions/genre";

const FormSchema = z.object({
  name: z
    .string({ required_error: "This field is required" })
    .min(2, { message: "Name must be at least 2 characters." }),
  descript: z
    .string()
    .min(5, { message: "Description Should have atleast 5 characters" })
    .max(500, { message: "Not Exceed 500 characters" }),
});

export default function GenreForm() {
  const [count, setCount] = useState(0);
  const [state, action, isPending] = useActionState(AddGenre, null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      descript: "",
    },
  });

  useEffect(() => {
    if (state?.success) form.reset();
    setCount(0);
  }, [state, form]);

  return (
    <Form {...form}>
      <form action={action} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Genre Name</FormLabel>
              <FormControl>
                <Input
                  className="border border-black mb-6"
                  placeholder="Genre Name..."
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <div className="flex justify-end text-red-700" key={"name"}>
                {state?.FieldError && state?.FieldError.name && (
                  <p>{state.FieldError.name.join(",")}</p>
                )}
              </div>
              {/* <FormMessage /> */}
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
                    className="border border-black mb-6 p-2 w-full rounded-md resize-y bg-transparent"
                    rows={4}
                    placeholder="description of the genre"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setCount(e.target.value.length);
                    }}
                    disabled={isPending}
                  />
                  <p>{count}/500 max characters</p>
                </div>
              </FormControl>
              <div className="flex justify-end text-red-700" key={"descript"}>
                {state?.FieldError && state?.FieldError.descript && (
                  <p>{state.FieldError.descript.join(",")}</p>
                )}
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
