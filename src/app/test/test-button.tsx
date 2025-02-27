"use client";

import { Button } from "@/components/ui/button";
import { testTony } from "../actions/tmdb/testa-tonys-tmdb";

export default function TonyButton() {
  //const session = authClient.useSession();
  //const router = useRouter();

  return (
    <Button
      // variant={"secondary"}
      // className="border-white border-2"
      onClick={() => console.log(testTony())}
    >
      test
    </Button>
  );
}
