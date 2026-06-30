import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieStore = await cookies();

  const sessionToken = cookieStore.get("session_token")?.value;
  if (!sessionToken) redirect("/login");

  return <div className="p-10">Your token: {sessionToken}</div>;
}
