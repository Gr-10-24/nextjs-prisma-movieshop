"use client";
import { useForm } from "react-hook-form";
import { Button } from "../button";
import { useEffect } from "react";
import { UpdateUser } from "@/app/actions/userOrders";
import { toast } from "react-toastify";

interface User {
  id: string;
  name: string;
  email: string;
  address: string | null;
}

export default function UserMovieForm({ user }: { user: User }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User>({
    defaultValues: {
      ...user,
      address: user.address ?? "",
    },
  });

  // Reset form when user data changes
  useEffect(() => {
    reset({
      ...user,
      address: user.address ?? "",
    });
  }, [user, reset]);

  const onSubmit = async (formData: User) => {
    try {
      // Convert empty string back to null
      const updatedData = {
        ...formData,
        address: formData.address ? formData.address.trim() : null,
      };

      const result = await UpdateUser(user.id, updatedData);

      if (result.success) {
        toast.success(`Updated user: ${formData.name}`);
      } else {
        toast.error(result.message || "Could not update the user");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Could not update the user");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
        {/* Name Field */}
        <div className="grid grid-cols-4 items-center gap-4">
          <label className="block text-sm font-medium col-span-1">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full border rounded px-2 py-1 col-span-3"
          />
          {errors.name && (
            <p className="text-red-500 text-sm col-span-3 col-start-2">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="grid grid-cols-4 items-center gap-4">
          <label className="block text-sm font-medium col-span-1">Email</label>
          <input
            {...register("email", { required: "Email is required" })}
            className="w-full border rounded px-2 py-1 col-span-3"
          />
          {errors.email && (
            <p className="text-red-500 text-sm col-span-3 col-start-2">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Address Field */}
        <div className="grid grid-cols-4 items-center gap-4">
          <label className="block text-sm font-medium col-span-1">
            Address
          </label>
          <input
            {...register("address")}
            className="w-full border rounded px-2 py-1 col-span-3"
          />
        </div>

        <Button type="submit">Save changes</Button>
      </form>
    </div>
  );
}
