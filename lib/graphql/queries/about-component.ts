import { gql } from '@apollo/client'

export const GET_ABOUT_COMPONENT_QUERY = gql`
  query GetAboutSection {
    aboutSection {
      title
      description
      link {
        title
        link
        variant
      }
      aboutGrid {
        title
        description
      }
    }
  }
`

interface Link {
    title: string
    link: string
    variant?: string
}

interface AboutGridItem {
    title: string
    description: string
}

export interface AboutComponent {
  title: string
  description: string
  link: Link
  aboutGrid: AboutGridItem[]
}

export interface AboutComponentResponse {
    aboutSection: AboutComponent
}
