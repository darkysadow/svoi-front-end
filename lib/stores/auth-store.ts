import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  address?: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  createdAt: string
}

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
}

interface AuthActions {
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  setLoading: (loading: boolean) => void
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  resetPassword: (email: string) => Promise<boolean>
}

type AuthStore = AuthState & AuthActions

// Mock user database - replace with GraphQL mutations
const mockUsers: (User & { password: string })[] = [
  {
    id: "1",
    email: "demo@svoi.com",
    password: "demo123",
    name: "Demo User",
    phone: "+1234567890",
    address: {
      street: "123 Street St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "US",
    },
    createdAt: "2024-01-01T00:00:00Z",
  },
]

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      setLoading: (isLoading) => set({ isLoading }),

      login: async (email: string, password: string) => {
        set({ isLoading: true })

        // Simulate API call - replace with GraphQL mutation
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const user = mockUsers.find((u) => u.email === email && u.password === password)

        if (user) {
          const { password: _, ...userWithoutPassword } = user
          const mockToken = `mock-jwt-token-${Date.now()}`

          set({
            user: userWithoutPassword,
            token: mockToken,
            isLoading: false,
            isAuthenticated: true,
          })

          // Store token in localStorage for Apollo Client
          localStorage.setItem("svoi-auth-token", mockToken)
          return true
        } else {
          set({ user: null, token: null, isLoading: false, isAuthenticated: false })
          return false
        }
      },

      register: async (email: string, password: string, name: string) => {
        set({ isLoading: true })

        // Simulate API call - replace with GraphQL mutation
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const existingUser = mockUsers.find((u) => u.email === email)
        if (existingUser) {
          set({ isLoading: false })
          return false
        }

        const newUser: User = {
          id: Date.now().toString(),
          email,
          name,
          createdAt: new Date().toISOString(),
        }

        mockUsers.push({ ...newUser, password })
        const mockToken = `mock-jwt-token-${Date.now()}`

        set({
          user: newUser,
          token: mockToken,
          isLoading: false,
          isAuthenticated: true,
        })

        localStorage.setItem("svoi-auth-token", mockToken)
        return true
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
        localStorage.removeItem("svoi-auth-token")
      },

      updateUser: (userData) => {
        const currentUser = get().user
        if (currentUser) {
          set({ user: { ...currentUser, ...userData } })
        }
      },

      resetPassword: async (email: string) => {
        // Simulate API call - replace with GraphQL mutation
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const user = mockUsers.find((u) => u.email === email)
        return !!user
      },
    }),
    {
      name: "svoi-auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
