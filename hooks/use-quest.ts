"use client"

import { useState, useEffect } from "react"
import { graphqlFetch } from "@/lib/graphql-client"

const GET_QUEST_QUERY = `
  query GetQuest {
    quest {
        answer
        cardNumber
        cardOwner
        cardExpires
        hint
        note
        bank
        placeholder
        question
        errorMessage
        successMessage
        redirectMessage
    }
  }
`

interface Quest {
    answer: string
    cardNumber: string
    cardOwner: string
    cardExpires: string
    hint: string
    note: string
    bank: string
    placeholder: string
    question: string
    errorMessage: string
    successMessage: string
    redirectMessage: string
}

interface QuestResponse {
  quest: Quest
}

export function useServerQuest() {
  const [questData, setQuestData] = useState<Quest | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchSeason() {
      setLoading(true)
      setError(null)

      const response = await graphqlFetch<QuestResponse>(GET_QUEST_QUERY)

      if (response.errors) {
        setError(new Error(response.errors[0].message))
      } else if (response.data) {
        setQuestData(response.data.quest || null)
      }

      setLoading(false)
    }

    fetchSeason()
  }, [])

  return {
    questData,
    loading,
    error,
  }
}
