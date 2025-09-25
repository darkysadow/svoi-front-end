import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface FilterState {
  seasons: string[]
  series: string[]
  sizes: string[]
  colors: string[]
  tags: string[]
  priceRange: [number, number]
  searchQuery: string
  sortBy: string
  viewMode: "grid" | "list"
}

interface FilterActions {
  setSeasons: (seasons: string[]) => void
  setSeries: (series: string[]) => void
  setSizes: (sizes: string[]) => void
  setColors: (colors: string[]) => void
  setTags: (tags: string[]) => void
  setPriceRange: (range: [number, number]) => void
  setSearchQuery: (query: string) => void
  setSortBy: (sortBy: string) => void
  setViewMode: (mode: "grid" | "list") => void
  toggleFilter: (type: keyof FilterState, value: string) => void
  clearAllFilters: () => void
  setFiltersFromURL: (filters: Partial<FilterState>) => void
}

type FilterStore = FilterState & FilterActions

const initialState: FilterState = {
  seasons: [],
  series: [],
  sizes: [],
  colors: [],
  tags: [],
  priceRange: [0, 500],
  searchQuery: "",
  sortBy: "newest",
  viewMode: "grid",
}

export const useFilterStore = create<FilterStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setSeasons: (seasons) => set({ seasons }),
      setSeries: (series) => set({ series }),
      setSizes: (sizes) => set({ sizes }),
      setColors: (colors) => set({ colors }),
      setTags: (tags) => set({ tags }),
      setPriceRange: (priceRange) => set({ priceRange }),
      setSearchQuery: (searchQuery) => {console.log("searchQuery", searchQuery)
       set({ searchQuery })},
      setSortBy: (sortBy) => set({ sortBy }),
      setViewMode: (viewMode) => set({ viewMode }),

      toggleFilter: (type, value) => {
        const currentFilters = get()[type] as string[]
        if (Array.isArray(currentFilters)) {
          const newFilters = currentFilters.includes(value)
            ? currentFilters.filter((f) => f !== value)
            : [...currentFilters, value]
          set({ [type]: newFilters })
        }
      },

      clearAllFilters: () => set(initialState),

      setFiltersFromURL: (filters) => set({ ...get(), ...filters }),
    }),
    {
      name: "svoi-filter-storage",
      partialize: (state) => ({
        priceRange: state.priceRange,
        sortBy: state.sortBy,
        viewMode: state.viewMode,
      }),
    },
  ),
)
