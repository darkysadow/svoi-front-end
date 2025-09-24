"use client"

import { useState, useEffect } from "react"
import { graphqlFetch } from "@/lib/graphql-client"
import { print } from "graphql"
import { AboutComponent, AboutComponentResponse, GET_ABOUT_COMPONENT_QUERY } from "@/lib/graphql/queries/about-component"

export function useAboutComponent() {
  const [data, setData] = useState<AboutComponent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchAboutComponent() {
      setLoading(true)
      setError(null)

      const response = await graphqlFetch<AboutComponentResponse>(print(GET_ABOUT_COMPONENT_QUERY))

      if (response.errors) {
        setError(new Error(response.errors[0].message))
      } else if (response.data?.aboutSection) {
        setData(response.data.aboutSection)
      }
      
      setLoading(false)
    }

    fetchAboutComponent()
  }, [])

  return {
    aboutSection: data,
    loading,
    error,
  }
}
