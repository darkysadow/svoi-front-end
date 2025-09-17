"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useQuest } from "@/contexts/quest-context"

export function OnboardingQuest() {
  const { questData, showQuest, completeQuest, validateAnswer, currentLanguage, setLanguage } = useQuest()
  const [answer, setAnswer] = useState("")
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    if (showQuest) {
      setIsAnimating(true)
    }
  }, [showQuest])

  if (!showQuest || !questData || !questData.is_active) {
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (validateAnswer(answer)) {
      setIsSuccess(true)
      setError("")
      setTimeout(() => {
        completeQuest()
      }, 2000)
    } else {
      const errorText = currentLanguage === "ru" ? "Не свой — не войдёшь" : "Not yours — no entry"
      setError(errorText)
      setAnswer("")
      const card = document.querySelector(".credit-card")
      card?.classList.add("animate-shake")
      setTimeout(() => card?.classList.remove("animate-shake"), 500)
    }
  }

  const successText = currentLanguage === "ru" ? "Добро пожаловать в SVOI™" : "Welcome to SVOI™"

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#1F1F1F] via-[#2B2B2B] to-[#1F1F1F]">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 text-6xl opacity-30">🏢</div>
        <div className="absolute top-40 right-20 text-4xl opacity-20">💰</div>
        <div className="absolute bottom-40 left-20 text-5xl opacity-25">🎤</div>
        <div className="absolute bottom-20 right-10 text-3xl opacity-30">📞</div>
      </div>

      <div className="flex min-h-screen items-center justify-center p-4">
        <div className={`transition-all duration-1000 ${isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          {/* Language Toggle */}
          <div className="flex justify-center space-x-2 mb-8">
            <Button
              variant={currentLanguage === "ru" ? "default" : "outline"}
              size="sm"
              onClick={() => setLanguage("ru")}
              className="text-xs bg-[#2B2B2B] border-[#7FFFD4]/30"
            >
              RU
            </Button>
            <Button
              variant={currentLanguage === "en" ? "default" : "outline"}
              size="sm"
              onClick={() => setLanguage("en")}
              className="text-xs bg-[#2B2B2B] border-[#7FFFD4]/30"
            >
              EN
            </Button>
          </div>

          {isSuccess ? (
            <div className="text-center space-y-4 animate-pulse">
              <div className="text-2xl font-bold text-[#7FFFD4] glitch-text">{successText}</div>
              <div className="text-sm text-gray-400">
                {currentLanguage === "ru" ? "Перенаправление..." : "Redirecting..."}
              </div>
            </div>
          ) : (
            <div className="perspective-1000">
              <div
                className={`credit-card relative w-96 h-60 transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                {/* Front of Card */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-gradient-to-br from-[#2B2B2B] via-[#1F1F1F] to-[#2B2B2B] border border-[#7FFFD4]/20 shadow-2xl">
                  {/* Card Texture Overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-noise opacity-20"></div>

                  {/* Holographic Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-[#7FFFD4]/10 to-transparent animate-pulse"></div>

                  {/* Chip */}
                  <div className="absolute top-6 left-6 w-12 h-9 bg-[#FFD700] rounded-md shadow-inner"></div>

                  {/* Bank Logo - Easter Egg */}
                  <div className="absolute top-4 right-6 text-right">
                    <div className="text-[#7FFFD4] font-bold text-lg">DNIEPER</div>
                    <div className="text-[#FFD700] text-xs">MAMMOTH BANK</div>
                  </div>

                  {/* Card Number with Easter Eggs */}
                  <div className="absolute top-20 left-6 right-6">
                    <div className="text-white font-mono text-xl tracking-wider">0056 0056 0056 0056</div>
                    <div className="text-[#7FFFD4]/60 text-xs mt-1">
                      {currentLanguage === "ru" ? "НОМЕР КАРТЫ" : "CARD NUMBER"}
                    </div>
                  </div>

                  {/* Expiry Date - Easter Egg */}
                  <div className="absolute bottom-16 left-6">
                    <div className="text-[#7FFFD4]/60 text-xs">
                      {currentLanguage === "ru" ? "ДЕЙСТВУЕТ ДО" : "VALID THRU"}
                    </div>
                    <div className="text-white font-mono text-sm">10/056</div>
                  </div>

                  {/* Cardholder Name */}
                  <div className="absolute bottom-6 left-6">
                    <div className="text-[#7FFFD4]/60 text-xs">
                      {currentLanguage === "ru" ? "ВЛАДЕЛЕЦ КАРТЫ" : "CARDHOLDER"}
                    </div>
                    <div className="text-white font-mono text-sm">MAMMOTH OWNER</div>
                  </div>

                  {/* Contactless Symbol */}
                  <div className="absolute bottom-6 right-6 text-[#7FFFD4] text-2xl">📶</div>
                </div>

                {/* Back of Card */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-gradient-to-br from-[#1F1F1F] via-[#2B2B2B] to-[#1F1F1F] border border-[#7FFFD4]/20 shadow-2xl">
                  {/* Magnetic Stripe */}
                  <div className="absolute top-6 left-0 right-0 h-12 bg-black"></div>

                  {/* Signature Strip */}
                  <div className="absolute top-24 left-6 right-6 h-8 bg-white rounded"></div>

                  {/* CVV Section */}
                  <div className="absolute top-36 left-6 right-6">
                    <div className="text-[#7FFFD4]/60 text-xs mb-2">
                      {currentLanguage === "ru" ? "КОД CVV" : "CVV CODE"}
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Input
                          type="text"
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value.slice(0, 3))}
                          placeholder="***"
                          className="w-16 text-center text-lg font-mono bg-white text-black border-none"
                          maxLength={3}
                          autoFocus
                        />
                        <Button
                          type="submit"
                          size="sm"
                          className="bg-[#7FFFD4] hover:bg-[#7FFFD4]/80 text-black font-semibold"
                          disabled={answer.length !== 3}
                        >
                          {currentLanguage === "ru" ? "ВОЙТИ" : "ENTER"}
                        </Button>
                      </div>
                      {error && <p className="text-sm text-red-400 animate-pulse font-bold">{error}</p>}
                    </form>
                  </div>

                  {/* Easter Egg Hints */}
                  <div className="absolute bottom-6 left-6 right-6 text-center">
                    <div className="text-[#FFD700]/40 text-xs">
                      {currentLanguage === "ru" ? "🐘 Мамонт помнит всё 🐘" : "🐘 Mammoth remembers all 🐘"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="text-center mt-6 space-y-2">
                <p className="text-[#7FFFD4] text-sm">
                  {currentLanguage === "ru" ? "Нажмите на карту, чтобы перевернуть" : "Click card to flip"}
                </p>
                <p className="text-gray-400 text-xs">
                  {currentLanguage === "ru" ? "Найдите код CVV и введите его" : "Find the CVV code and enter it"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
