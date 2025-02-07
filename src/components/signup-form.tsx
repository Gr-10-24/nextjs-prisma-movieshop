"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
//import { useForm } from "react-hook-form";
// import { z } from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
//import { FormField } from "./ui/form";

// const stringSchema = z.object({
//   name: z
//     .string()
//     .min(3, "needs to be at least 3 characters long")
//     .max(25, "needs to be less than 26 characters"),
//   email: z.string().email(),
//   password: z
//     .string()
//     .min(6, "needs to be at least 6 characters long")
//     .max(25, "needs to be less than 26 characters"),
// });

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  return (
    <div>
      <form className="flex flex-col">
        <h1 className="text-center">Register</h1>
        <div className="flex container flex-col content-center justify-center mx-auto">
          <div className="flex flex-col container p-2">
            <div className="flex">
              <div className="flex my-auto container justify-end">
                <p>Name:</p>
              </div>
              <div className="flex min-w-52">
                <Input
                  disabled={isLoading}
                  name="name"
                  type="text"
                  placeholder="Enter you name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="border-2 border-black rounded-md m-2"
                />
              </div>

              <div className="flex container">
                <p></p>
              </div>
            </div>
          </div>

          <div className="flex flex-col container p-2">
            <div className="flex">
              <div className="flex my-auto container justify-end">
                <p>Email:</p>
              </div>
              <div className="flex min-w-52">
                <Input
                  disabled={isLoading}
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="border-2 border-black rounded-md m-2"
                />
              </div>

              <div className="flex container">
                <p></p>
              </div>
            </div>
          </div>

          <div className="flex flex-col container p-2">
            <div className="flex">
              <div className="flex my-auto container justify-end">
                <p>Password:</p>
              </div>
              <div className="flex min-w-52">
                <Input
                  disabled={isLoading}
                  name="password"
                  type="password"
                  placeholder="Enter a password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="border-2 border-black rounded-md m-2"
                />
              </div>

              <div className="flex container">
                <p></p>
              </div>
            </div>
          </div>

          <div className="flex content-center justify-center">
            <Button
              disabled={isLoading}
              onClick={async () => {
                try {
                    
                    const {data, error} = await authClient.signUp.email({
                      name,
                      email,
                      password,
                      fetchOptions: {
                        onRequest: () => {
                          setIsLoading(true);
                        },
                        onResponse: () => {
                          setIsLoading(false);
                        },
                        onError: (ctx) => {
                          alert(ctx.error.message);
                        },
                        onSuccess: () => {
                          router.push("/");
                        },
                      },
                    }); 
                    console.log(data?.user);
                    console.log(error?.message);
                } catch (e) {
                    console.log(e);
                }
              }}
            >
              {isLoading ? "Loading..." : "Sign up"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
