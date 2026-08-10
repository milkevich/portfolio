import { useEffect } from "react"
import { useLocation } from "react-router-dom"

type RouteMetadata = {
    title: string
    description: string
    indexable: boolean
}

const defaultMetadata: RouteMetadata = {
    title: "Gleb Milkevich — Design Engineer",
    description:
        "Design engineering and frontend work by Gleb Milkevich, focused on thoughtful product interfaces, Routeveil, and Plainframe UI.",
    indexable: true,
}

const routeMetadata: Record<string, RouteMetadata> = {
    "/": defaultMetadata,
    "/projects/routeveil": {
        title: "Routeveil — React Router Transitions Engine | Gleb Milkevich",
        description:
            "Routeveil is a React Router transitions engine for building coordinated route and shared-element transitions in React.",
        indexable: true,
    },
    "/projects/plainframe-ui": {
        title: "Plainframe UI — React Component System | Gleb Milkevich",
        description:
            "Plainframe UI is a flexible React component system for building distinct product interfaces with adaptable visual foundations.",
        indexable: true,
    },
    "/gallery": {
        title: "Personal Gallery | Gleb Milkevich",
        description:
            "A personal gallery of photographs and moments collected by Gleb Milkevich.",
        indexable: true,
    },
}

const notFoundMetadata: RouteMetadata = {
    title: "Page Not Found | Gleb Milkevich",
    description: "The requested page could not be found.",
    indexable: false,
}

function normalizePathname(pathname: string) {
    if (pathname === "/") {
        return pathname
    }

    return pathname.replace(/\/+$/, "")
}

function setMeta(selector: string, attribute: "name" | "property", value: string) {
    let element = document.head.querySelector<HTMLMetaElement>(selector)

    if (!element) {
        element = document.createElement("meta")
        element.setAttribute(attribute, selector.match(/\[.+?="(.+?)"\]/)?.[1] ?? "")
        document.head.appendChild(element)
    }

    element.content = value
}

function Seo() {
    const { pathname } = useLocation()

    useEffect(() => {
        const normalizedPathname = normalizePathname(pathname)
        const metadata = routeMetadata[normalizedPathname] ?? notFoundMetadata
        const configuredOrigin = import.meta.env.VITE_SITE_URL?.trim().replace(/\/+$/, "")
        const origin = configuredOrigin || window.location.origin
        const canonicalUrl = new URL(normalizedPathname, `${origin}/`).href
        document.title = metadata.title

        setMeta('meta[name="description"]', "name", metadata.description)
        setMeta(
            'meta[name="robots"]',
            "name",
            metadata.indexable ? "index, follow" : "noindex, nofollow",
        )
        setMeta('meta[property="og:title"]', "property", metadata.title)
        setMeta('meta[property="og:description"]', "property", metadata.description)
        setMeta('meta[property="og:type"]', "property", "website")
        setMeta('meta[property="og:url"]', "property", canonicalUrl)
        setMeta('meta[name="twitter:card"]', "name", "summary")
        setMeta('meta[name="twitter:title"]', "name", metadata.title)
        setMeta('meta[name="twitter:description"]', "name", metadata.description)

        let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')

        if (!canonical) {
            canonical = document.createElement("link")
            canonical.rel = "canonical"
            document.head.appendChild(canonical)
        }

        canonical.href = canonicalUrl

        let structuredData = document.head.querySelector<HTMLScriptElement>(
            '#portfolio-structured-data',
        )

        if (!structuredData) {
            structuredData = document.createElement("script")
            structuredData.id = "portfolio-structured-data"
            structuredData.type = "application/ld+json"
            document.head.appendChild(structuredData)
        }

        structuredData.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "Person",
                    "@id": `${origin}/#person`,
                    name: "Gleb Milkevich",
                    jobTitle: "Design Engineer",
                    url: `${origin}/`,
                    sameAs: [
                        "https://www.linkedin.com/in/milkevich",
                        "https://github.com/milkevich",
                    ],
                },
                {
                    "@type": "WebSite",
                    "@id": `${origin}/#website`,
                    name: "Gleb Milkevich Portfolio",
                    url: `${origin}/`,
                    author: {
                        "@id": `${origin}/#person`,
                    },
                },
            ],
        })
    }, [pathname])

    return null
}

export default Seo
