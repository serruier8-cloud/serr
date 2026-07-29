"use client"

import { useMemo } from "react"

interface SchemaOrgProps {
  schema: Record<string, any>
}

export function SchemaOrg({ schema }: SchemaOrgProps) {
  const json = useMemo(() => JSON.stringify(schema), [schema])

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
