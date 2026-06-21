async function getSingleSneaker(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    next: { tags: ["sneakers-data", `sneaker-${id}`] },
  });

  if (!res.ok) throw new Error(`Item not found`);

  return res.json();
}

export async function HotRelease({ id }: { id: string }) {
  const item = await getSingleSneaker(id);

  return (
    <section style={{ border: `1px solid #000`, padding: `15px` }}>
      <h3>Item of the day</h3>
      <p>Model: {item.title}</p>
      <p>Price: {item.price}</p>
      <p>Items left: {item.stock}</p>
    </section>
  );
}
