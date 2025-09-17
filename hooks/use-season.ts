"use client"

import { useState, useEffect } from "react"
import { graphqlFetch } from "@/lib/graphql-client"

const GET_SEASON_BY_SLUG_QUERY = `
  query GetSeasonBySlug($slug: String!) {
    seasons(filters: { slug: { eq: $slug } }, locale: "en") {
      name
      slug
      description
      banner {
        url
        alternativeText
      }
      expiresOn
      isActive
      productCode
      shortName
      tags {
        name
      }
      drops {
        name
        description
        tags {
          name
        }
        products {
          name
          price
          discountedPrice
          sliderPosition
          tags {
            name
          }
        }
      }
      localizations {
        locale
        name
        description
        slug
      }
    }
  }
`

interface Tag {
  name: string
}

interface Product {
  name: string
  price: number
  discountedPrice?: number
  sliderPosition?: number
  tags: Tag[]
}

interface Drop {
  name: string
  description: string
  tags: Tag[]
  products: Product[]
}

interface Banner {
  url: string
  alternativeText?: string
}

interface Localization {
  locale: string
  name: string
  description: string
  slug: string
}

interface Season {
  name: string
  slug: string
  description: string
  banner?: Banner
  expiresOn?: string
  isActive: boolean
  productCode?: string
  shortName?: string
  tags: Tag[]
  drops: Drop[]
  localizations: Localization[]
}

interface SeasonsResponse {
  seasons: Season[]
}

export function useSeason(slug: string) {
  const [season, setSeason] = useState<Season | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      return
    }

    async function fetchSeason() {
      setLoading(true)
      setError(null)

      const response = await graphqlFetch<SeasonsResponse>(GET_SEASON_BY_SLUG_QUERY, { slug })

      if (response.errors) {
        setError(new Error(response.errors[0].message))
      } else if (response.data) {
        setSeason(response.data.seasons[0] || null)
      }

      setLoading(false)
    }

    fetchSeason()
  }, [slug])

  return {
    season,
    loading,
    error,
  }
}
