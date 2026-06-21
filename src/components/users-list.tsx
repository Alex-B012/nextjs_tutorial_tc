import { db } from "@/lib/db";

export async function ServiceUsersList() {
  const users = await db.query.users.findMany();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="border-b pb-2">
            <span className="'font-medium">{user.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
