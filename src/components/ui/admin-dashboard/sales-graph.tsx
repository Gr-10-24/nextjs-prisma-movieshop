"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { OrderProp } from "./order-stat";
import { useState } from "react";
import PopYear from "./popover-selectyear";

interface SALES {
  month: string;
  totalAmount: number;
}

const chartConfig = {
  totalAmount: {
    label: "totalAmount",
    color: " #6B21A8",
  },
} satisfies ChartConfig;

export default function SalesGraph({
  
  order,
}: {
  order: OrderProp[];
}) {


  const [year,setYear] =useState(2025)
  const yearOrder = order.filter(
    (order) => order.createdAt.getFullYear() === year
  );

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const chartData: SALES[] = months.map((month, index) => {
    const totalAmount = yearOrder
      .filter(({ createdAt }) => createdAt.getMonth() === index)
      .reduce((sum, { totalAmount }) => sum + totalAmount, 0);

    return { month, totalAmount };
  });
  yearOrder.map(({ createdAt, totalAmount }) => ({
    month: months[createdAt.getMonth()],
    totalAmount,
  }));

  return (
    <div>
        <PopYear selectedYear={year} setSelectedYear={setYear}/>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey="totalAmount"
            fill="rgb(107 33 168 / var(--tw-text-opacity, 1))"
            className="text-purple-800"
            radius={4}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
