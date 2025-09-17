import { gql } from "@apollo/client"

export const GET_SEASON_BY_SLUG_QUERY = gql`
  query GetSeasonBySlug($slug: String!) {
    seasons(filters: { slug: { eq: $slug } }) {
      name
      slug
      description
      banner {
        url
        alternativeText
      }
      expiresOn
      isActive
      productCode
      shortName
      tags {
        name
      }
      drops {
        name
        description
        tags {
          name
        }
        products {
          name
          price
          discountedPrice
          sliderPosition
          tags {
            name
          }
        }
      }
      localizations {
        locale
        name
        description
        slug
      }
    }
  }
`
