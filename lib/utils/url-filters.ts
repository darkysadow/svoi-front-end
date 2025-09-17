import type { FilterState } from "@/lib/stores/filter-store"

// Convert filter state to URL search params
export const filtersToURLParams = (filters: Partial<FilterState>): URLSearchParams => {
  const params = new URLSearchParams()

  if (filters.seasons?.length) {
    params.set("seasons", filters.seasons.join(","))
  }
  if (filters.series?.length) {
    params.set("series", filters.series.join(","))
  }
  if (filters.sizes?.length) {
    params.set("sizes", filters.sizes.join(","))
  }
  if (filters.colors?.length) {
    params.set("colors", filters.colors.join(","))
  }
  if (filters.tags?.length) {
    params.set("tags", filters.tags.join(","))
  }
  if (filters.priceRange && (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 500)) {
    params.set("price", `${filters.priceRange[0]}-${filters.priceRange[1]}`)
  }
  if (filters.searchQuery) {
    params.set("q", filters.searchQuery)
  }
  if (filters.sortBy && filters.sortBy !== "newest") {
    params.set("sort", filters.sortBy)
  }
  if (filters.viewMode && filters.viewMode !== "grid") {
    params.set("view", filters.viewMode)
  }

  return params
}

// Convert URL search params to filter state
export const urlParamsToFilters = (searchParams: URLSearchParams): Partial<FilterState> => {
  const filters: Partial<FilterState> = {}

  const seasons = searchParams.get("seasons")
  if (seasons) {
    filters.seasons = seasons.split(",").filter(Boolean)
  }

  const series = searchParams.get("series")
  if (series) {
    filters.series = series.split(",").filter(Boolean)
  }

  const sizes = searchParams.get("sizes")
  if (sizes) {
    filters.sizes = sizes.split(",").filter(Boolean)
  }

  const colors = searchParams.get("colors")
  if (colors) {
    filters.colors = colors.split(",").filter(Boolean)
  }

  const tags = searchParams.get("tags")
  if (tags) {
    filters.tags = tags.split(",").filter(Boolean)
  }

  const price = searchParams.get("price")
  if (price) {
    const [min, max] = price.split("-").map(Number)
    if (!isNaN(min) && !isNaN(max)) {
      filters.priceRange = [min, max]
    }
  }

  const searchQuery = searchParams.get("q")
  if (searchQuery) {
    filters.searchQuery = searchQuery
  }

  const sortBy = searchParams.get("sort")
  if (sortBy) {
    filters.sortBy = sortBy
  }

  const viewMode = searchParams.get("view")
  if (viewMode === "list" || viewMode === "grid") {
    filters.viewMode = viewMode
  }

  return filters
}

// Create filter slugs for SEO-friendly URLs
export const createFilterSlug = (filters: Partial<FilterState>): string => {
  const slugParts: string[] = []

  if (filters.seasons?.length === 1) {
    slugParts.push(filters.seasons[0].toLowerCase().replace(/\s+/g, "-"))
  }
  if (filters.series?.length === 1) {
    slugParts.push(filters.series[0].toLowerCase().replace(/\s+/g, "-"))
  }
  if (filters.colors?.length === 1) {
    slugParts.push(filters.colors[0].toLowerCase().replace(/\s+/g, "-"))
  }

  return slugParts.join("-") || "all"
}

// Parse filter slug back to filters
export const parseFilterSlug = (slug: string): Partial<FilterState> => {
  if (!slug || slug === "all") return {}

  const filters: Partial<FilterState> = {}
  const parts = slug.split("-")

  // Map common slug patterns to filters
  const seasonMap: Record<string, string> = {
    "season-1": "Season 1",
    "season-2": "Season 2",
    "season-3": "Season 3",
  }

  const seriesMap: Record<string, string> = {
    genesis: "Genesis",
    "neon-dreams": "Neon Dreams",
    "urban-decay": "Urban Decay",
    "digital-void": "Digital Void",
    noise: "NOISE",
    decay: "DECAY",
    void: "VOID",
    strike: "STRIKE",
    foundation: "FOUNDATION",
  }

  const colorMap: Record<string, string> = {
    black: "Black",
    white: "White",
    "neon-green": "Neon Green",
    orange: "Orange",
    gray: "Gray",
  }

  parts.forEach((part) => {
    if (seasonMap[part]) {
      filters.seasons = [seasonMap[part]]
    } else if (seriesMap[part]) {
      filters.series = [seriesMap[part]]
    } else if (colorMap[part]) {
      filters.colors = [colorMap[part]]
    }
  })

  return filters
}
