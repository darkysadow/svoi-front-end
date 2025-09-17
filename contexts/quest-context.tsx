"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface QuestData {
  question_ru: string
  question_en: string
  placeholder_ru: string
  placeholder_en: string
  validation_rule: string
  success_text_ru: string
  success_text_en: string
  fail_text_ru: string
  fail_text_en: string
  is_active: boolean
}

interface QuestContextType {
  questData: QuestData | null
  isQuestCompleted: boolean
  showQuest: boolean
  completeQuest: () => void
  validateAnswer: (answer: string) => boolean
  currentLanguage: "ru" | "en"
  setLanguage: (lang: "ru" | "en") => void
}

const QuestContext = createContext<QuestContextType | undefined>(undefined)

// Mock quest data - in real app this would come from Strapi
const mockQuestData: QuestData = {
  question_ru: "Введите CVV код с вашей карты мамонта",
  question_en: "Enter the CVV code from your mammoth card",
  placeholder_ru: "CVV код",
  placeholder_en: "CVV code",
  validation_rule: "^056$",
  success_text_ru: "💳 Мамонтизация завершена",
  success_text_en: "💳 Mammonization completed",
  fail_text_ru: "Неверный код. Попробуйте еще раз.",
  fail_text_en: "Wrong code. Try again.",
  is_active: true,
}

export function QuestProvider({ children }: { children: React.ReactNode }) {
  const [questData] = useState<QuestData>(mockQuestData)
  const [isQuestCompleted, setIsQuestCompleted] = useState(false)
  const [showQuest, setShowQuest] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<"ru" | "en">("ru")

  useEffect(() => {
    // Check if quest was already completed
    const completed = localStorage.getItem("svoi-quest-completed")
    if (completed === "true") {
      setIsQuestCompleted(true)
      setShowQuest(false)
    } else {
      setShowQuest(true)
    }
  }, [])

  const completeQuest = () => {
    setIsQuestCompleted(true)
    setShowQuest(false)
    localStorage.setItem("svoi-quest-completed", "true")
  }

  const validateAnswer = (answer: string): boolean => {
    if (!questData) return false
    const regex = new RegExp(questData.validation_rule)
    return regex.test(answer)
  }

  const setLanguage = (lang: "ru" | "en") => {
    setCurrentLanguage(lang)
  }

  return (
    <QuestContext.Provider
      value={{
        questData,
        isQuestCompleted,
        showQuest,
        completeQuest,
        validateAnswer,
        currentLanguage,
        setLanguage,
      }}
    >
      {children}
    </QuestContext.Provider>
  )
}

export function useQuest() {
  const context = useContext(QuestContext)
  if (context === undefined) {
    throw new Error("useQuest must be used within a QuestProvider")
  }
  return context
}
