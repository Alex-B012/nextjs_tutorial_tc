"use server";

import { actionClient } from "@/app/lib/safe-action";
import z, { success } from "zod";

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

      return { success: true, productId: data.id };
    } catch (error: any) {
      throw new Error(error.message || "Item was not created");
    }
  });

const ToggleFavoriteSchema = z.object({
  id: z.number(),
});

export const toggleFavorite = actionClient
  .inputSchema(ToggleFavoriteSchema)
  .action(async ({ parsedInput }) => {
    console.log("ParsedInput: ", parsedInput);

    await new Promise((resolve) => setTimeout(resolve, 500));
    if (parsedInput.id === 2)
      throw new Error("Could not update the favorite status of this model");

    return { success: true, id: parsedInput.id };
  });
