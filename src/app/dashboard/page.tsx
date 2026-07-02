import { Suspense } from "react";
import DashboardContent from "./DashboardContent";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

interface DashboardPageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard page for the Next.js Practice App",
};

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent searchParams={searchParams} />
    </Suspense>
  );
}
