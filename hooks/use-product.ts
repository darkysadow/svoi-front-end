'use client'

import { useState, useEffect } from 'react'
import { graphqlFetch } from '@/lib/graphql-client'

const GET_PRODUCT_BY_SLUG_QUERY = `
  query GetProductBySlug($slug: String!) {
    products(filters: { slug: { eq: $slug } }, locale: "en") {
      documentId
      name
      description
      price
      discountedPrice
      available
      sliderPosition
      slug
      photo {
        url
        alternativeText
        caption
      }
      variant {
        id
        size
        color
        quantity
      }
      supplier {
        name
      }
      size_chart {
        documentId
        name
      }
      Features {
        feature
        id 
      }
      specification {
        care
        fit
        material
        origin
      }
      tags {
        documentId
        name
      }
      upsell_products {
        documentId
        discountPercent
        source {
            documentId
        }
        target {
          documentId
          name
          price
          discountedPrice
          slug
        }
      }
    }
  }
`

interface Tag {
  documentId: string
  name: string
}

export interface ProductPhoto {
  url: string
  alternativeText: string
  caption: string
}

interface ProductVariant {
  id: string
  size: string
  color: string
  quantity: number
}

interface ProductFeature {
  feature: string
  id: string
}

interface ProductSpecification {
  care: string
  fit: string
  material: string
  origin: string
}

interface UpsellProductTarget {
  documentId: string
  name: string
  price: number
  discountedPrice: number
  slug: string
}

interface UpsellProduct {
  documentId: string
  discountPercent: number
  source: {
    documentId: string
  }
  target: UpsellProductTarget
}

export interface Product {
  documentId: string
  name: string
  description: string
  price: number
  discountedPrice: number
  available: boolean
  sliderPosition: number
  slug: string
  photo: ProductPhoto
  variant: ProductVariant[]
  supplier: {
    name: string
  }
  size_chart: Tag[]
  Features: ProductFeature[]
  specification: ProductSpecification[]
  tags: Tag[]
  upsell_products: UpsellProduct[]
}

interface ProductsResponse {
  products: Product[]
}

export function useProduct(slug: string) {
    
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    console.log('ping');
    if (!slug) {
      setLoading(false)
      return
    }

    async function fetchProduct() {
      setLoading(true)
      setError(null)
      const response = await graphqlFetch<ProductsResponse>(GET_PRODUCT_BY_SLUG_QUERY, { slug })

      if (response.errors) {
        setError(new Error(response.errors[0].message))
      } else if (response.data) {
        setProduct(response.data.products[0] || null)
      }

      setLoading(false)
    }

    fetchProduct()
  }, [slug])

  return {
    product,
    loading,
    error,
  }
}
