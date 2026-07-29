import Link from "next/link"

export default function GlobalNotFound() {
  return (
    <div className="container py-20 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page non trouvée</h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  )
}
