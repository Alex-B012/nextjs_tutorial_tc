import { handlePurchaseNotification } from "@/actions";
import { useRouter } from "next/navigation";

async function getSpecsCatalog() {
  const res = await fetch(
    "https://dummyjson.com/products/category/mens-shoes",
    { next: { tags: ["sneakers-data"] } },
  );

  if (!res.ok) throw new Error("Network error");
  const data = await res.json();

  return data.products;
}

export async function SneakerCatalog() {
  const products = await getSpecsCatalog();

  return (
    <section>
      <h2>Shoes catalog</h2>
      <ul>
        {products.map((item: any) => (
          <li key={item.id}>
            {item.title} - <strong>Items left: {item.stock}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}

const item_id = "1";

function BuyBtn() {
  const router = useRouter();

  const handleBuy = async () => {
    await handlePurchaseNotification(item_id);

    router.refresh();
  };
}
