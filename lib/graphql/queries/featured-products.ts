import { gql } from '@apollo/client'

export const GET_FEATURED_PRODUCTS_QUERY = gql`
  query GetFeaturedProducts {
    featuredProduct {
      documentId
      locale
      title
      description
      products {
        documentId
        slug
        discountedPrice
        price
        name
        photo {
            url
        }
        drops {
          season {
            shortName
          }
        }
        variant {
          size {
            size
          }
          color {
            color
          }
        }
        tags {
          name
        }
      }
    }
  }
`

interface Photo {
    url: string
}

interface DropsItem {
    season: {
        shortName: string
    }
}

interface TagsItem {
    name: string
}

interface VariantItem {
  size: {
    size: string
  }
  color: {
    color: string
  }
}

export interface FeaturedProductsItem {
    documentId: string
    discountedPrice?: number
    price: number
    slug: string
    name: string
    photo?: Photo
    drops: DropsItem[]
    tags: TagsItem[]
    variant: VariantItem[]
}

export interface FeaturedProduct {
    locale: string
    documentId: string
    title: string
    description: string
    products: FeaturedProductsItem[]
}

export interface FeaturedProductsResponse {
    featuredProduct: FeaturedProduct
}
