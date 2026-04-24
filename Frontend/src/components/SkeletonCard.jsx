export default function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      <div className="aspect-[4/3] w-full animate-pulse bg-neutral-200" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-2/3 animate-pulse rounded bg-neutral-200" />
        <div className="h-3 w-full animate-pulse rounded bg-neutral-100" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-neutral-100" />
        <div className="mt-4 h-9 w-full animate-pulse rounded-lg bg-neutral-200" />
      </div>
    </div>
  )
}
