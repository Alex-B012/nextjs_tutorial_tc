"use server";

import { updateTag } from "next/cache";

export async function updateProductInfo() {
  updateTag("all-products");
}
