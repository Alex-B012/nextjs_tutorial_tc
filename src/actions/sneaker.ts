"use server";

import { actionClient } from "@/app/lib/safe-action";
import z from "zod";

const CreateSneakerSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Name should be at least 3 characters" })
    .max(50, { message: "Name is to long" }),
  price: z.number().positive({ message: "Price should be more that 0" }),
  stock: z
    .number()
    .int({ message: "Quantity should be an integer" })
    .nonnegative({ message: "Quantity should not be less that 0" }),
});

export const createSneakerDrop = actionClient
  .inputSchema(CreateSneakerSchema)
  .action(async ({ parsedInput }) => {
    console.log("ParsedInput: ", parsedInput);

    try {
      const res = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...parsedInput,
          category: "men-shoes",
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to create product");

      return { success: true, product: data };
    } catch (error: any) {
      throw new Error(error.message || "Item was not created");
    }
  });
