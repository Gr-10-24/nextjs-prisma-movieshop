import Page from "@/app/customer-landing-page/page";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { FileStack } from "lucide-react";

export default function Welcome() {
  return (
    <>
      <div className="relative h-[600px]">
        <div className=" inset-0 -z-10 ">
          <Image
            src="/images/cover.png"
            alt="bg image"
            fill
            className="object-cover object-center transition-all duration-300 brightness-100 hover:brightness-50 hover:saturate-100 "
            quality={100}
          />
        </div>
        <div className="flex relative w-full justify-center items-center">
          <h1 className="text-5xl mt-40 pl-30 font-extrabold text-white">
            ABC MOVIE WEB HOUSE.
          </h1>
        </div>
          <div className="flex relative w-full justify-center items-center mt-20">
            <Link href="/customer-movies">
            <Button variant={"default"} className="text-xl border rounded-md"> <FileStack/> BROWS OUR ALL MOVIES</Button>
            </Link>
          </div>
      </div>
      <div>
        <Page />
      </div>
    </>
  );
}
