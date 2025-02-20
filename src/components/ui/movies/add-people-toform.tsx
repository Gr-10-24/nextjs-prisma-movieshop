"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Person } from "@prisma/client";

interface getActorsProps {
  field: {
    value: string;
    onChange: (value: string) => void;
  };
}

export function GetActors({ field }: getActorsProps) {
  const [actors, setActors] = React.useState<Person[]>([]);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function getActors() {
      try {
        const res = await fetch("/api/people", { method: "GET" });

        if (!res.ok) {
          throw new Error(`Failed to fetch, ${res.statusText}`);
        }
        const data = await res.json();

        if (data.sucess) {
          setActors(data.data);
        }
      } catch (error) {
        console.error("Error in fetching actors", error);
      } finally {
        setLoading(false);
      }
    }
    getActors();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {/* gather different types of relevant genres  */}
      <div className="flex items-center space-x-4 mb-2">
        <input
          placeholder="Genre Name (Comma Seperated)"
          className="w-96 px-4 py-2 border border-black"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            field.onChange(e.target.value);
          }}
        />
      </div>
      {/* get access and select existing genres */}
      <div className="flex items-center space-x-4">
        <p className="text-sm text-muted-foreground"></p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="w-[150px] justify-start border border-black bg-gray-300"
            >
              {<>+ Select an actor</>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" side="right" align="start">
            <Command>
              <CommandInput/>
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {actors.map((actor) => (
                    <CommandItem
                      key={actor.name}
                      value={actor.name}
                      onSelect={(name: string) => {
                        const selectedGenre =
                          actors.find((a) => a.name === name) || null;
                        //   setSelectedStatus( selectedGenre)
                        //   field.onChange(selectedGenre? selectedGenre.name : "")
                        if (selectedGenre) {
                          const newValue = inputValue
                            ? `${inputValue},${selectedGenre.name}`
                            : selectedGenre.name;

                          setInputValue(newValue);
                          field.onChange(newValue);
                        }
                        setOpen(false);
                      }}
                    >
                      {actor.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
