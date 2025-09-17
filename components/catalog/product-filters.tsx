"use client"

import { useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { X, Filter } from "lucide-react"
import { useFilterStore } from "@/lib/stores/filter-store"
import { filtersToURLParams, urlParamsToFilters } from "@/lib/utils/url-filters"

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
    setSeasons,
    setSeries,
    setSizes,
    setColors,
    setTags,
    setPriceRange,
    toggleFilter,
    clearAllFilters,
    setFiltersFromURL,
  } = useFilterStore()

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

  const seasonOptions = ["Season 1", "Season 2", "Season 3"]
  const seriesOptions = [
    "Genesis",
    "Neon Dreams",
    "Urban Decay",
    "Digital Void",
    "NOISE",
    "DECAY",
    "VOID",
    "STRIKE",
    "FOUNDATION",
  ]
  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"]
  const colorOptions = ["Black", "White", "Neon Green", "Orange", "Gray"]
  const tagOptions = ["Limited Drop", "New", "Exclusive", "Bestseller"]

  const getAllActiveFilters = () => {
    return [...seasons, ...series, ...sizes, ...colors, ...tags]
  }

  const activeFilters = getAllActiveFilters()

  const handleClearAllFilters = () => {
    clearAllFilters()
    router.replace("/catalog", { scroll: false })
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
              <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                {filter}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => {
                    if (seasonOptions.includes(filter)) toggleFilter("seasons", filter)
                    else if (seriesOptions.includes(filter)) toggleFilter("series", filter)
                    else if (sizeOptions.includes(filter)) toggleFilter("sizes", filter)
                    else if (colorOptions.includes(filter)) toggleFilter("colors", filter)
                    else if (tagOptions.includes(filter)) toggleFilter("tags", filter)
                  }}
                />
              </Badge>
            ))}
          </div>
        </div>
      )}

      <Separator />

      <div className="space-y-3">
        <Label className="text-sm font-medium">Price Range</Label>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            max={500}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-sm font-medium">Season</Label>
        <div className="space-y-2">
          {seasonOptions.map((season) => (
            <div key={season} className="flex items-center space-x-2">
              <Checkbox
                id={season}
                checked={seasons.includes(season)}
                onCheckedChange={() => toggleFilter("seasons", season)}
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
              />
              <Label htmlFor={serie} className="text-sm cursor-pointer">
                {serie}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

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

      <div className="space-y-3">
        <Label className="text-sm font-medium">Color</Label>
        <div className="space-y-2">
          {colorOptions.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={color}
                checked={colors.includes(color)}
                onCheckedChange={() => toggleFilter("colors", color)}
              />
              <Label htmlFor={color} className="text-sm cursor-pointer">
                {color}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-sm font-medium">Tags</Label>
        <div className="space-y-2">
          {tagOptions.map((tag) => (
            <div key={tag} className="flex items-center space-x-2">
              <Checkbox id={tag} checked={tags.includes(tag)} onCheckedChange={() => toggleFilter("tags", tag)} />
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
