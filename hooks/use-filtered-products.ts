"use client"

import { useFilterStore } from "@/lib/stores/filter-store"
import { useState, useEffect, useMemo } from "react"
import useDebounce from "./use-debounce"
import { graphqlFetch } from "@/lib/graphql-client"
import { ProductResponse } from "./use-season"

interface FilteredProductsResponse {
    products: ProductResponse[]
}

export function useFilteredProducts() {
  const {
    seasons,
    series,
    colors,
    sizes,
    tags,
    priceRange,
    searchQuery,
    viewMode
  } = useFilterStore()

  const [products, setProducts] = useState<ProductResponse[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // debounce пошуку
  const [debouncedSearch] = useDebounce(searchQuery, 500)

  // побудова filters
  const filters = useMemo(() => {
    const f: any = {}
    if (seasons.length > 0) f.drops = { season: { shortName: { in: seasons } } }
    if (series.length > 0) f.series = { in: series }
    if (colors.length > 0) f.variants = { colors: { name: { in: colors } } }
    if (sizes.length > 0) f.variants = { ...f.variants, sizes: { in: sizes } }
    if (tags.length > 0) f.badges = { in: tags }
    f.price = { between: priceRange }
    if (debouncedSearch) {
      f.or = [
        { name: { containsi: debouncedSearch } },
        { description: { containsi: debouncedSearch } },
        { category: { containsi: debouncedSearch } },
      ]
    }
    return f
  }, [seasons, series, colors, sizes, tags, priceRange, debouncedSearch])


  /* OLD
  
  {
    "filters": {
        "season": {
            "in": [
                "Season 1"
            ]
        },
        "price": {
            "between": [
                0,
                500
            ]
        }
    },
    "pagination": {
        "page": 1,
        "pageSize": 12
    }
}
  
  */

  useEffect(() => {
    async function loadProducts() {
      setLoading(true)
      const query = `
            query GetProducts($filters: ProductFiltersInput, $pagination: PaginationArg, $sort: [String]) {
                products(filters: $filters, pagination: $pagination, sort: $sort) {
                    documentId
                    name
                    price
                    slug
                    variant {
                        quantity
                        id
                        size {
                        size
                        }
                        color {
                        color
                        }
                    }
                    photo {
                        alternativeText
                        url
                    }
                    discountedPrice
                    sliderPosition
                    tags {
                        name
                    }
                }
            }
        `

      const { data, errors } = await graphqlFetch<FilteredProductsResponse>(query, {
        filters,
        pagination: { page: currentPage, pageSize: 12 },
      })

      if (errors) {
        console.error(errors)
      } else if (data) {
        setProducts(
          data.products
        )
        /* setTotalPages(data.products.meta.pagination.pageCount) */
        console.log("data.products", data.products);
        
      }
      setLoading(false)
    }

    loadProducts()
  }, [filters, currentPage])

  return {
    products,
    loading,
    currentPage,
    setCurrentPage,
    totalPages,
    viewMode
  }
}
