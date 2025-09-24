import { gql } from '@apollo/client'

export const GET_HERO_COMPONENT_QUERY = gql`
  query GetHeroSection {
    hero {
      title
      description
      tags {
        name
      }
      bg {
        url
      }
      links {
        link
        title
        variant
      }
      bullets {
        feature
      }
    }
  }
`

interface TagsItem {
  name: string
}

interface Link {
  title: string
  link: string
  variant?: string
}

interface Bg {
  url: string
}

interface BulletsItem {
  feature: string
}

export interface HeroComponent {
  title: string
  description: string
  tags: TagsItem[] | []
  bg?: Bg 
  links: Link[]
  bullets: BulletsItem[]
}

export interface HeroComponentResponse {
  hero: HeroComponent
}
