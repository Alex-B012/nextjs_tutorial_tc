import { Suspense } from "react";

export default async function DashboardPage() {
  //   const user = await db.users.findFirst({ where: { id: currentUserId } });

  //   const analytics = await db.analytics.findMany({
  //     where: { where: { userId: user.id } },
  //   });

  //   const systemStatus = await fetchSystemStatus();

  return (
    <main>
      <Suspense fallback={<div>Profile Skeleton</div>}>
        <UserProfile data={user} />
      </Suspense>

      <Suspense fallback={<div>Analytics Chart Skeleton</div>}>
        <AnalyticsChart />
      </Suspense>

      <Suspense fallback={<div>StatusPanel Chart Skeleton</div>}>
        <StatusPanel />
      </Suspense>
      {/* <StatusPanel /> */}
      {/* <AnalyticsChart data={analytics} />
      <StatusPanel data={systemStatus} /> */}
    </main>
  );
}
