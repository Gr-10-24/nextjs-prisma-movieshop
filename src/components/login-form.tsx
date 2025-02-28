"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  return (
    <div>
      <form>
        <h1 className="text-center">Login</h1>
        <div className="flex container flex-col content-center justify-center mx-auto">
          <div className="flex flex-col container p-2">
            <div className="flex">
              <div className="flex my-auto container justify-end">
                <p>Email:</p>
              </div>
              <div className="flex min-w-52">
                <Input
                  disabled={isLoading}
                  type="email"
                  placeholder="Enter Email"
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
                  type="password"
                  placeholder="Enter password"
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

          {/* <Input
          disabled={isLoading}
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        /> */}
          {/* <Input
          disabled={isLoading}
          placeholder="Enter Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        /> */}
          <div className="flex content-center justify-center">
            <Button
              disabled={isLoading}
              onClick={async () =>
                await authClient.signIn.email({
                  email,
                  password,
                  fetchOptions: {
                    onRequest: () => {
                      setIsLoading(true);
                    },
                    onResponse: () => {
                      setIsLoading(false);
                    },
                    onError: () => {alert("You are banned")},
                    onSuccess: () => {
                      router.refresh(); //router.push("/");
                    },
                  },
                })
              }
            >
              {isLoading ? "Loading..." : "Sign in"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
