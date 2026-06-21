"use server";

import { revalidateTag } from "next/cache";

export async function handlePurchaseNotification(id: string) {
  revalidateTag(`sneaker-${id}`, { expire: 0 });
  revalidateTag(`sneaker-data`, { expire: 0 });
}
