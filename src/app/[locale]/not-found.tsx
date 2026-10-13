import Link from "next/link"

export default async function LocaleNotFound() {
  // Note: not-found.tsx does not receive params in App Router,
  // so render locale-agnostic content instead of using params.

  return (
    <div className="container py-20 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page non trouvée</h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Link
        href="/fr"
        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Retour à l'accueil
      </Link>
    </div>
  )
}
