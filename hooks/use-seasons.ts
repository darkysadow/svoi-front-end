"use client"

import { useState, useEffect } from "react"
import { graphqlFetch } from "@/lib/graphql-client"
import { GET_SEASONS_QUERY, Season, SeasonsResponse } from "@/lib/graphql/queries/seasons"
import { print } from "graphql"

export function useSeasons() {
  const [data, setData] = useState<Season[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchSeasons() {
      setLoading(true)
      setError(null)

      const response = await graphqlFetch<SeasonsResponse>(print(GET_SEASONS_QUERY))

      if (response.errors) {
        setError(new Error(response.errors[0].message))
      } else if (response.data) {
        setData(response.data.seasons)
      }

      setLoading(false)
    }

    fetchSeasons()
  }, [])

  return {
    seasons: data,
    loading,
    error,
  }
}
