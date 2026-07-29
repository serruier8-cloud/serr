import Link from "next/link"
import { getTranslations } from "next-intl/server"

export default async function LocaleNotFound({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "common" })
  const prefix = locale === "fr" ? "" : `/${locale}`

  return (
    <div className="container py-20 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">{t("notFound")}</h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        {locale === "ar"
          ? "عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها."
          : locale === "en"
          ? "Sorry, the page you are looking for does not exist or has been moved."
          : "Désolé, la page que vous recherchez n'existe pas ou a été déplacée."}
      </p>
      <Link
        href={`${prefix}`}
        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        {t("backHome")}
      </Link>
    </div>
  )
}
