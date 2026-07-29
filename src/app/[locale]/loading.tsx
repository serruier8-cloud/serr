export default function Loading() {
  return (
    <div className="container py-20 flex justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Chargement...</p>
      </div>
    </div>
  )
}
