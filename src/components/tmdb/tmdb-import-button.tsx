"use client";

import { importTMDB } from "@/app/actions/tmdb/tmdb-import";
import { Button } from "../ui/button";

export default function PopulateDbWTMDBButton() {
  return (
    <Button
      variant={"green"}
      onClick={async () => {
        await importTMDB();
      }}
    >
      Populate the DB using TMDB
    </Button>
  );
}
