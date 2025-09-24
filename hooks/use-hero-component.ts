"use client"

import { useState, useEffect } from "react"
import { graphqlFetch } from "@/lib/graphql-client"
import { print } from "graphql"
import { GET_HERO_COMPONENT_QUERY, HeroComponent, HeroComponentResponse } from "@/lib/graphql/queries/hero-component"

export function useHeroComponent() {
  const [data, setData] = useState<HeroComponent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchHeroComponent() {
      setLoading(true)
      setError(null)

      const response = await graphqlFetch<HeroComponentResponse>(print(GET_HERO_COMPONENT_QUERY))

      if (response.errors) {
        setError(new Error(response.errors[0].message))
      } else if (response.data?.hero) {
        setData(response.data.hero)
      }
      
      setLoading(false)
    }

    fetchHeroComponent()
  }, [])

  return {
    hero: data,
    loading,
    error,
  }
}
