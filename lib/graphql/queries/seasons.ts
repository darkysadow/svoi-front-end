import { graphqlFetch } from "@/lib/graphql-client"
import { gql } from "@apollo/client"

export const GET_SEASONS_QUERY = gql`
  query GetSeasons {
    seasons(filters: { isActive: { eq: true } }, locale: "en") {
      name
      shortName
      slug
      documentId
      isActive
      description
      startsOn
      expiresOn
      drops {
        products {
          documentId
          variant {
            quantity
          }
        }
      }
      banner {
        url
      }
      tags {
        name
      }
    }
  }
`

interface Variant {
  quantity: number
}

interface Product {
  documentId: string
  variant: Variant[]
}

interface Drop {
  products: Product[]
}

export interface Season {
  name: string
  shortName: string
  slug: string
  documentId: string
  isActive: boolean
  description: string
  startsOn: string
  expiresOn: string
  drops: Drop[]
  banner?: {
    url: string
  }
  tags: [] | {
    name: string
  }[]
}

export interface ProductQuantity {
  documentId: string
  drops: {
    documentId: string
    products: {
      documentId: string
      variant: {
        quantity: number
      }
    }
  }
}

export interface ProductsInSeasonResponse {
  season: ProductQuantity
}

export interface SeasonsResponse {
  seasons: Season[]
}

