import { headers } from "next/headers";

export default async function DashboardPage() {
  const headersStore = await headers();
  const host = headersStore.get("host");

  return <div className="p-10">Your host: {host}</div>;
}
