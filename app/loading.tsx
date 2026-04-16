export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="animate-pulse rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="h-6 w-48 rounded bg-slate-200" />
        <div className="mt-4 h-4 w-full rounded bg-slate-200" />
        <div className="mt-2 h-4 w-3/4 rounded bg-slate-200" />
      </div>
    </div>
  );
}
