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
import { Genre } from "@prisma/client";
import { GetGenre } from "@/app/actions/genre";

interface getGenresProps {
  field: {
    value: string;
    onChange: (value: string) => void;
  };
}

export function GetGenres({ field }: getGenresProps) {
  const [genres, setGenres] = React.useState<Genre[]>([]);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const genres = async () => {
      setLoading(true);
      try {
        const data = await GetGenre();
        setGenres(data);
      } catch (error) {
        return error;
      } finally {
        setLoading(false);
      }
    };

    genres();
  }, []);

  if (loading) return <>Loading...</>;

  return (
    <div className="flex border border-black rounded-md">
      {/* gather different types of relevant genres  */}
      <div className="flex items-center space-x-4">
        <input
          placeholder="Genre Name (Comma Seperated)"
          className="flex container h-full w-72 px-2 items-center rounded-lg "
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            field.onChange(e.target.value);
          }}
        />
      </div>
      {/* get access and select existing genres */}
      <div className="flex justify-end ">
        <p className="text-sm text-muted-foreground"></p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="default"
              className="h-12 pr-4"
            >
              {<>+Add</>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" side="right" align="start">
            <Command>
              <CommandInput />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {genres.map((genre) => (
                    <CommandItem
                      key={genre.name}
                      value={genre.name}
                      onSelect={(name: string) => {
                        const selectedGenre =
                          genres.find((g) => g.name === name) || null;
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
                      {genre.name}
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
