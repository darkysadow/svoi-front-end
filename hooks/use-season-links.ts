"use client"

import { useState, useEffect } from "react"
import { graphqlFetch } from "@/lib/graphql-client"
import { print } from "graphql"
import { GET_SEASONS_LINKS_QUERY, SeasonLink, SeasonsLinksResponse } from "@/lib/graphql/queries/season-links"

export function useSeasonLinks() {
  const [data, setData] = useState<SeasonLink[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchSeasonLinks() {
      setLoading(true)
      setError(null)

      const response = await graphqlFetch<SeasonsLinksResponse>(print(GET_SEASONS_LINKS_QUERY))

      if (response.errors) {
        setError(new Error(response.errors[0].message))
      } else if (response.data) {
        setData(response.data.seasons)
      }

      setLoading(false)
    }

    fetchSeasonLinks()
  }, [])

  return {
    seasonsLinks: data,
    loading,
    error,
  }
}
