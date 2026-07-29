"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { useTransition } from "react"
import { Globe } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const languages = [
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية" },
  { code: "en", label: "English" },
]

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  function onSelectChange(newLocale: string) {
    startTransition(() => {
      const segments = pathname.split("/")
      if (segments[1] && ["fr", "ar", "en"].includes(segments[1])) {
        segments[1] = newLocale
        router.push(segments.join("/"))
      } else {
        router.push(`/${newLocale}${pathname}`)
      }
    })
  }

  return (
    <Select defaultValue={locale} onValueChange={onSelectChange} disabled={isPending}>
      <SelectTrigger className="w-[130px]">
        <Globe className="h-4 w-4 mr-2" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
