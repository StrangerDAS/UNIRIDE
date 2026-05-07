/**
 * Skeleton loaders for different card types
 */
export function VehicleCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton h-48 rounded-none" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-4 w-3/4 rounded-lg" />
        <div className="skeleton h-3 w-1/2 rounded-lg" />
        <div className="flex justify-between mt-4">
          <div className="skeleton h-6 w-16 rounded-lg" />
          <div className="skeleton h-5 w-20 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function BookingCardSkeleton() {
  return (
    <div className="card p-4 space-y-3">
      <div className="flex gap-4">
        <div className="skeleton h-16 w-24 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-2/3 rounded-lg" />
          <div className="skeleton h-3 w-1/2 rounded-lg" />
          <div className="skeleton h-3 w-1/3 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div className="card p-5 space-y-2">
      <div className="skeleton h-3 w-24 rounded-lg" />
      <div className="skeleton h-7 w-16 rounded-lg" />
    </div>
  )
}
