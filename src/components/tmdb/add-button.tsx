"use client";

import { Button } from "../ui/button";
import { ShoppingBasket } from "lucide-react";
//import { PopulateDbWTmdb } from "@/app/actions/tmdb/tmdb-front";
// import { populateDb } from "@/app/actions/populate-db";
// import App from "@/app/actions/tmdb/tmdb-front2";
import { testing } from "@/app/actions/tmdb/tmdb-front";

export default function AddMoviesButton() {
  return (
    <Button
      variant={"green"}
      onClick={async () =>
        //add movieId or whole movie to shopping cart
        {
          //await PopulateDbWTmdb();
          //await populateDb();
          //App();
          testing();
        }
      }
    >
      <ShoppingBasket />
    </Button>
  );
}
