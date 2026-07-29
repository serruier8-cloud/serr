export default function LocationLoading() {
  return (
    <div className="container py-20">
      <div className="animate-pulse space-y-6">
        <div className="h-4 w-48 bg-muted rounded" />
        <div className="h-8 w-96 bg-muted rounded" />
        <div className="h-4 w-full max-w-2xl bg-muted rounded" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-64 bg-muted rounded-lg" />
          <div className="lg:col-span-1 h-64 bg-muted rounded-lg" />
        </div>
      </div>
    </div>
  )
}
