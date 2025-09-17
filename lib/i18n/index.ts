import enTranslations from "./en.json"
import ruTranslations from "./ru.json"

export type Language = "en" | "ru"

export const translations = {
  en: enTranslations,
  ru: ruTranslations,
}

export function getTranslation(key: string, language: Language = "en"): string {
  const keys = key.split(".")
  let value: any = translations[language]

  for (const k of keys) {
    value = value?.[k]
  }

  if (typeof value === "string") {
    return value
  }

  // Fallback to English if not found in current language
  if (language !== "en") {
    let fallbackValue: any = translations.en
    for (const k of keys) {
      fallbackValue = fallbackValue?.[k]
    }
    if (typeof fallbackValue === "string") {
      return fallbackValue
    }
  }

  // Return key if translation not found
  return key
}
