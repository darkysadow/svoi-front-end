'use client'

import { useFilterStore } from '@/lib/stores/filter-store'
import { useState, useEffect, useMemo } from 'react'
import useDebounce from './use-debounce'
import { graphqlFetch } from '@/lib/graphql-client'
import { ProductResponse } from './use-season'

interface FilteredProductsResponse {
  products_connection: {
    nodes: ProductResponse[]
    pageInfo: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export function useFilteredProducts() {
  const { seasons, series, colors, sizes, tags, priceRange, searchQuery, viewMode, sortBy } =
    useFilterStore()

  const [products, setProducts] = useState<ProductResponse[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // debounce пошуку
  const debouncedSearch = useDebounce(searchQuery, 500)

  const { filters, sort } = useMemo(() => {
    const f: any = {}

    if (seasons.length > 0) {
      f.drops = {
        season: {
          shortName: { in: seasons },
        },
      }
    }

    // Drops (серії)
    if (series.length > 0) {
      f.drops = { ...f.drops, name: { in: series } }
    }

    // Tags
    if (tags.length > 0) {
      f.tags = { name: { in: tags } }
    }

    // Variants: size + color
    if (sizes.length > 0 || colors.length > 0) {
      f.variant = {}

      if (sizes.length > 0) {
        f.variant.size = { size: { in: sizes } }
      }

      if (colors.length > 0) {
        f.variant.color = { color: { in: colors } }
      }
    }

    // Price filter
    f.and = [
      {
        or: [
          { discountedPrice: { between: priceRange } },
          { discountedPrice: { null: true }, price: { between: priceRange } },
        ],
      },
    ]

    // Search filter
    if (debouncedSearch) {
      f.and.push({
        or: [
          { name: { containsi: debouncedSearch } },
          { description: { containsi: debouncedSearch } },
        ],
      })
    }

    let sortValue: string[] = []
    switch (sortBy) {
      case 'newest':
        sortValue = ['createdAt:desc']
        break
      case 'price-low':
        sortValue = ['price:asc']
        break
      case 'price-high':
        sortValue = ['price:desc']
        break
      case 'popular':
        sortValue = ['popularity:desc']
        break
      default:
        sortValue = []
    }

    return { filters: f, sort: sortValue }
  }, [sizes, colors, seasons, series, priceRange, tags, sortBy, debouncedSearch])

  useEffect(() => {
    async function loadProducts() {
      setLoading(true)
      const query = `
            query GetProducts($filters: ProductFiltersInput, $pagination: PaginationArg, $sort: [String]) {
                products_connection(filters: $filters, pagination: $pagination, sort: $sort) {
                  nodes {
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
                  pageInfo {
                    page
                    pageSize
                    pageCount
                    total
                  }
                }
            }
        `

      const { data, errors } = await graphqlFetch<FilteredProductsResponse>(query, {
        filters,
        pagination: { page: currentPage, pageSize: 12 },
        sort,
      })

      if (errors) {
        console.error(errors)
      } else if (data?.products_connection) {
        setProducts(data.products_connection.nodes)
        setTotalPages(data.products_connection.pageInfo?.pageCount || 1)
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
    viewMode,
  }
}
