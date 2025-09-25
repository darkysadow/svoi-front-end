"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { X, Filter } from "lucide-react"
import { useFilterStore } from "@/lib/stores/filter-store"
import { filtersToURLParams, urlParamsToFilters } from "@/lib/utils/url-filters"
import { graphqlFetch } from "@/lib/graphql-client"
import useDebounce from "@/hooks/use-debounce"


const FILTERS_QUERY = `
  query GetFilters {
    seasons {
      shortName
    }
    drops {
      name
    }
    tags {
      name
    }
    sizes {
      size
    }
    colors {
      color
    }
  }
`

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isInitialMount = useRef(true)
  const isUpdatingFromURL = useRef(false)

  const {
    seasons,
    series,
    sizes,
    colors,
    tags,
    priceRange,
    setPriceRange,
    toggleFilter,
    clearAllFilters,
    setFiltersFromURL,
  } = useFilterStore()

  const [seasonOptions, setSeasonOptions] = useState<string[]>([])
  const [seriesOptions, setSeriesOptions] = useState<string[]>([])
  const [sizeOptions, setSizeOptions] = useState<string[]>([])
  const [colorOptions, setColorOptions] = useState<string[]>([])
  const [tagOptions, setTagOptions] = useState<string[]>([])

  useEffect(() => {
    async function fetchFilters() {
      const { data, errors } = await graphqlFetch<{
        seasons: { shortName: string }[]
        drops: { name: string }[]
        tags: { name: string }[]
        sizes: { size: string }[]
        colors: { color: string }[]
      }>(FILTERS_QUERY)

      if (errors) {
        console.error("GraphQL errors:", errors)
        return
      }

      if (data) {
        setSeasonOptions(data.seasons.map((s) => s.shortName))
        setSeriesOptions(data.drops.map((d) => d.name))
        setSizeOptions(data.sizes.map((s) => s.size))
        setColorOptions(data.colors.map((c) => c.color))
        setTagOptions(data.tags.map((t) => t.name))
      }
    }

    fetchFilters()
  }, [])

  useEffect(() => {
    if (isInitialMount.current) {
      isUpdatingFromURL.current = true
      const urlFilters = urlParamsToFilters(searchParams)
      setFiltersFromURL(urlFilters)
      isInitialMount.current = false
      isUpdatingFromURL.current = false
    }
  }, [searchParams, setFiltersFromURL])

  useEffect(() => {
    if (!isInitialMount.current && !isUpdatingFromURL.current) {
      const filters = { seasons, series, sizes, colors, tags, priceRange }
      const params = filtersToURLParams(filters)
      const newURL = params.toString() ? `/catalog?${params.toString()}` : "/catalog"
      router.replace(newURL, { scroll: false })
    }
  }, [seasons, series, sizes, colors, tags, priceRange, router])

  const getAllActiveFilters = () => [...seasons, ...series, ...sizes, ...colors, ...tags]
  const activeFilters = getAllActiveFilters()

  const handleClearAllFilters = () => {
    clearAllFilters()
    router.replace("/catalog", { scroll: false })
  }

  const [min, max] = priceRange
  const minGap = 10
  const minValue = 0
  const maxValue = 500

  const [localMin, setLocalMin] = useState(priceRange[0])
  const [localMax, setLocalMax] = useState(priceRange[1])

  const debouncedMin = useDebounce(localMin, 300);
  const debouncedMax = useDebounce(localMax, 300);

  useEffect(() => {
    setPriceRange([debouncedMin, debouncedMax]);
  }, [debouncedMin, debouncedMax, setPriceRange]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), localMax - minGap)
    setLocalMin(value)
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), localMin + minGap)
    setLocalMax(value)
  }

  const handleDeleteBadge = (filter: string) => {
    console.log("filter", filter);
    
    if (seasonOptions.includes(filter)) toggleFilter("seasons", filter)
    else if (seriesOptions.includes(filter)) toggleFilter("series", filter)
    else if (sizeOptions.includes(filter)) toggleFilter("sizes", filter)
    else if (colorOptions.includes(filter)) toggleFilter("colors", filter)
    else if (tagOptions.includes(filter)) toggleFilter("tags", filter)
  }

  return (
    <div className="space-y-6 bg-card p-6 rounded-lg border border-border">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
        </h3>
        {activeFilters.length > 0 && (
          <Button variant="ghost" size="sm" onClick={handleClearAllFilters}>
            Clear All
          </Button>
        )}
      </div>

      {activeFilters.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Active Filters</Label>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <Badge key={filter} variant="secondary" className="flex cursor-pointer items-center gap-1" onClick={() => handleDeleteBadge(filter)}>
                {filter}
                <X className="h-3 w-3" />
              </Badge>
            ))}
          </div>
        </div>
      )}

      <Separator />

      <div className="space-y-3">
        <Label className="text-sm font-medium">Price Range</Label>
        <div className="px-2">
          <div className="relative w-full h-2 bg-white/10 rounded-[4px]">
          <div
            className="absolute top-1/2 h-2 bg-red-600 rounded-lg -translate-y-1/2"
            style={{
              left: `${(localMin / maxValue) * 100}%`,
              right: `${100 - (localMax / maxValue) * 100}%`,
            }}
          />
          <input
            type="range"
            min={minValue}
            max={maxValue}
            value={localMin}
            onChange={handleMinChange}
            className="absolute w-full top-0 h-2 bg-transparent appearance-none pointer-events-none
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:border-2
              [&::-webkit-slider-thumb]:border-black
              [&::-webkit-slider-thumb]:pointer-events-auto
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-moz-range-thumb]:h-5
              [&::-moz-range-thumb]:w-5
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-white
              [&::-moz-range-thumb]:border-2
              [&::-moz-range-thumb]:border-black
              [&::-moz-range-thumb]:cursor-pointer"
          />
          <input
            type="range"
            min={minValue}
            max={maxValue}
            value={localMax}
            onChange={handleMaxChange}
            className="absolute w-full top-0 h-2 bg-transparent appearance-none pointer-events-none
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:border-2
              [&::-webkit-slider-thumb]:border-black
              [&::-webkit-slider-thumb]:pointer-events-auto
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-moz-range-thumb]:h-5
              [&::-moz-range-thumb]:w-5
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-white
              [&::-moz-range-thumb]:border-2
              [&::-moz-range-thumb]:border-black
              [&::-moz-range-thumb]:cursor-pointer"
          />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground mt-4">
            <span>${localMin}</span>
            <span>${localMax}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Seasons */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Season</Label>
        <div className="space-y-2">
          {seasonOptions.map((season) => (
            <div key={season} className="flex items-center space-x-2">
              <Checkbox
                id={season}
                checked={seasons.includes(season)}
                onCheckedChange={() => toggleFilter("seasons", season)}
                className={!seasons.includes(season) ? "border border-white/15" : ""}
              />
              <Label htmlFor={season} className="text-sm cursor-pointer">
                {season}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-sm font-medium">Series</Label>
        <div className="space-y-2">
          {seriesOptions.map((serie) => (
            <div key={serie} className="flex items-center space-x-2">
              <Checkbox
                id={serie}
                checked={series.includes(serie)}
                onCheckedChange={() => toggleFilter("series", serie)}
                className={!series.includes(serie) ? "border border-white/15" : ""}
              />
              <Label htmlFor={serie} className="text-sm cursor-pointer">
                {serie}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Sizes */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Size</Label>
        <div className="grid grid-cols-3 gap-2">
          {sizeOptions.map((size) => (
            <Button
              key={size}
              variant={sizes.includes(size) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleFilter("sizes", size)}
              className="h-8"
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Colors */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Color</Label>
        <div className="space-y-2">
          {colorOptions.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={color}
                checked={colors.includes(color)}
                onCheckedChange={() => toggleFilter("colors", color)}
                className={!colors.includes(color) ? "border border-white/15" : ""}
              />
              <Label htmlFor={color} className="text-sm cursor-pointer">
                {color}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Tags */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Tags</Label>
        <div className="space-y-2">
          {tagOptions.map((tag) => (
            <div key={tag} className="flex items-center space-x-2">
              <Checkbox
                id={tag}
                checked={tags.includes(tag)}
                onCheckedChange={() => toggleFilter("tags", tag)}
                className={!tags.includes(tag) ? "border border-white/15" : ""}
              />
              <Label htmlFor={tag} className="text-sm cursor-pointer">
                {tag}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
