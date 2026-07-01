import { Suspense } from "react";
import DashboardContent from "./DashboardContent";

interface DashboardPageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent searchParams={searchParams} />
    </Suspense>
  );
}
