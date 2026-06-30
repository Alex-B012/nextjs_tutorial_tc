import { connection } from "next/server";
import { db } from "@/lib/db";
import { products } from "@/db/schema";

export default async function ProductsList() {
  await connection();

  const items = await db.select().from(products).orderBy(products.createdAt);

  return (
    <div className="p-10 flex flex-col flex-wrap gap-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="w-60 p-4 flex flex-col gap-3 border border-gray-400"
        >
          <h2 className="font-semibold text-lg">{item.name}</h2>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  );
}
