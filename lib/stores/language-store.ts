import { create } from "zustand"
import { persist } from "zustand/middleware"
import { getTranslation, type Language } from "@/lib/i18n"

interface LanguageState {
  language: Language
}

interface LanguageActions {
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

type LanguageStore = LanguageState & LanguageActions

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      // Initial state
      language: "en",

      // Actions
      setLanguage: (language) => set({ language }),

      t: (key: string) => {
        const { language } = get()
        return getTranslation(key, language)
      },
    }),
    {
      name: "svoi-language-storage",
    },
  ),
)
