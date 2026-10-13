"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function RegisterPage() {
  const t = useTranslations("auth")
  const locale = useLocale()
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const prefix = `/${locale}`

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })
    if (!res.ok) {
      const data = await res.json()
      setError(data.error || (locale === "ar" ? "خطأ أثناء التسجيل" : locale === "en" ? "Registration error" : "Erreur lors de l'inscription"))
      setLoading(false)
    } else {
      router.push(`${prefix}/login`)
    }
  }

  return (
    <div className="container py-20 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t("register")}</CardTitle>
          <CardDescription>{t("registerDesc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-sm text-destructive text-center">{error}</p>}
            <Input type="text" placeholder={t("name")} value={name} onChange={(e) => setName(e.target.value)} required />
            <Input type="email" placeholder={locale === "ar" ? "البريد الإلكتروني" : locale === "en" ? "Email" : "Email"} value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input type="password" placeholder={t("password")} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t("registering") : t("register")}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">{t("hasAccount")} </span>
            <Link href={`${prefix}/login`} className="text-primary hover:underline">{t("login")}</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
