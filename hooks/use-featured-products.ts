"use client"

import { useState, useEffect } from "react"
import { graphqlFetch } from "@/lib/graphql-client"
import { print } from "graphql"
import { FeaturedProduct, FeaturedProductsResponse, GET_FEATURED_PRODUCTS_QUERY } from "@/lib/graphql/queries/featured-products"

export function useFeaturedProducts() {
  const [data, setData] = useState<FeaturedProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchFeaturedProducts() {
      setLoading(true)
      setError(null)

      const response = await graphqlFetch<FeaturedProductsResponse>(print(GET_FEATURED_PRODUCTS_QUERY))

      if (response.errors) {
        setError(new Error(response.errors[0].message))
      } else if (response.data?.featuredProduct) {
        setData(response.data.featuredProduct)
      }
      
      setLoading(false)
    }

    fetchFeaturedProducts()
  }, [])

  return {
    featuredProducts: data,
    loading,
    error,
  }
}
