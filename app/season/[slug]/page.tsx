import { SeasonHeader } from "@/components/season/season-header"
import { SeriesSliders } from "@/components/season/series-sliders"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface SeasonPageProps {
  params: {
    slug: string
  }
}

export default function SeasonPage({ params }: SeasonPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SeasonHeader slug={params.slug} />
        <SeriesSliders seasonSlug={params.slug} />
      </main>
      <Footer />
    </div>
  )
}
