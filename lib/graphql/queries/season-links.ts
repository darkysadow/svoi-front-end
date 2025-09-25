import { gql } from "@apollo/client"

export const GET_SEASONS_LINKS_QUERY = gql`
  query GetSeasons {
    seasons(filters: { isActive: { eq: true } }, locale: "en") {
      name
      shortName
      slug
    }
  }
`

export interface SeasonLink {
  name: string
  shortName: string
  slug: string
}

export interface SeasonsLinksResponse {
  seasons: SeasonLink[]
}

