export default function DashboardLoading() {
  return (
    <div className="w-full animate-pulse flex space-x-4 p-4 bg-zinc-100 rounded-lg ">
      <div className="flex-1 space-y-4 py-1">
        <div className="w-3/4 h4 bg-zinc-300 rounded " />
        <div className="space-y-2">
          <div className="h-4 bg-zinc-300 rounded" />
          <div className="w-5/6 h-4 bg-zinc-300 rounded" />
        </div>
      </div>
    </div>
  );
}
