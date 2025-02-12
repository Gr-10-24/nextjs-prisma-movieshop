"use server";
// api routing file to fetch genre from db

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const genre = await prisma.genre.findMany({
      select: {
        name: true,
      },
    });
    return NextResponse.json({ sucess: true, data: genre });
  } catch (error) {
    return NextResponse.json({
      sucess: false,
      message: `failed to fetchbooks : ${error}`,
    });
  }
}
