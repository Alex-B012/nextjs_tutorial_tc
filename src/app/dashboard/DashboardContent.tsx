import { headers } from "next/headers";

interface DashboardContentProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

export default async function DashboardPage({
  searchParams,
}: DashboardContentProps) {
  const params = await searchParams;

  const currentPage = Number(params.page) || 1;
  const currentSort = params.sort === "desc" ? "desc" : "asc";

  return (
    <div className="p-10">
      Current Page: {currentPage}
      <br />
      Current Sort: {currentSort}
    </div>
  );
}
