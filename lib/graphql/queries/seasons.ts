import { gql } from "@apollo/client"

export const GET_SEASONS_QUERY = gql`
  query GetSeasons {
    seasons(filters: { isActive: { eq: true } }, locale: "en") {
      name
      shortName
      slug
    }
  }
`

export interface Season {
  name: string
  shortName: string
  slug: string
}

export interface SeasonsResponse {
  seasons: Season[]
}
