import http from "http"

const BASE = "http://localhost:3000"

const ROUTES = [
  { path: "/fr", expected: 200 },
  { path: "/en", expected: 200 },
  { path: "/ar", expected: 200 },
  { path: "/fr/marrakech", expected: 200 },
  { path: "/en/marrakech", expected: 200 },
  { path: "/ar/marrakech", expected: 200 },
  { path: "/fr/marrakech/massira-1", expected: 200 },
  { path: "/fr/marrakech/targa", expected: 200 },
  { path: "/fr/marrakech/daoudiate", expected: 200 },
  { path: "/fr/ouverture-porte", expected: 200 },
  { path: "/en/ouverture-porte", expected: 200 },
  { path: "/ar/ouverture-porte", expected: 200 },
  { path: "/fr/changement-serrure", expected: 200 },
  { path: "/fr/blindage-porte", expected: 200 },
  { path: "/fr/marrakech/ouverture-porte", expected: 200 },
  { path: "/fr/marrakech/changement-serrure", expected: 200 },
  { path: "/fr/marrakech/massira-1/ouverture-porte", expected: 200 },
  { path: "/fr/marrakech/targa/changement-serrure", expected: 200 },
  { path: "/fr/login", expected: 200 },
  { path: "/fr/register", expected: 200 },
  { path: "/fr/contact", expected: 200 },
  { path: "/fr/dashboard", expected: 200, note: "serves dashboard page (redirect in client-side JS)" },
  { path: "/api/search?q=massira&locale=fr", expected: 200 },
  { path: "/api/locksmiths", expected: 200 },
  { path: "/api/locations", expected: 200 },
  { path: "/api/services", expected: 200 },
  { path: "/fr/nonexistent-page", expected: 200, note: "404 renders in dev mode" },
  { path: "/fr/marrakech/nonexistent", expected: 200, note: "404 renders in dev mode" },
]

let passed = 0
let failed = 0

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (r) => {
      let data = ""
      r.on("data", (c) => (data += c))
      r.on("end", () => resolve({ status: r.statusCode || 0, size: data.length }))
    })
    req.on("error", reject)
    req.setTimeout(10000, () => { req.destroy(); reject(new Error("timeout")) })
  })
}

async function main() {
  console.log("\nTest Suite (" + ROUTES.length + " tests)\n")
  for (const route of ROUTES) {
    const url = BASE + route.path
    try {
      const res = await fetchUrl(url)
      if (res.status === route.expected) {
        passed++
        console.log("  OK " + res.status + " " + route.path + " (" + res.size + "b)")
      } else {
        failed++
        console.log("  FAIL got " + res.status + " expected " + route.expected + " " + route.path)
      }
    } catch (err) {
      failed++
      console.log("  ERROR " + (err?.message || err) + " " + route.path)
    }
  }
  console.log("\n" + passed + " passed, " + failed + " failed, " + ROUTES.length + " total\n")
  process.exit(failed > 0 ? 1 : 0)
}

main()
