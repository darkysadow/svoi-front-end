import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  color: string
  size: string
  quantity: number
  season: string
  series: string
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

interface CartActions {
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void
  removeItem: (id: string, color: string, size: string) => void
  updateQuantity: (id: string, color: string, size: string, quantity: number) => void
  clearCart: () => void
  getItemKey: (id: string, color: string, size: string) => string
}

type CartStore = CartState & CartActions

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      total: 0,
      itemCount: 0,

      // Helper function
      getItemKey: (id: string, color: string, size: string) => `${id}-${color}-${size}`,

      // Actions
      addItem: (item) => {
        const { quantity = 1, ...itemData } = item
        const itemKey = get().getItemKey(itemData.id, itemData.color, itemData.size)

        set((state) => {
          const existingItemIndex = state.items.findIndex((i) => get().getItemKey(i.id, i.color, i.size) === itemKey)

          let newItems: CartItem[]
          if (existingItemIndex >= 0) {
            newItems = state.items.map((i, index) =>
              index === existingItemIndex ? { ...i, quantity: i.quantity + quantity } : i,
            )
          } else {
            newItems = [...state.items, { ...itemData, quantity }]
          }

          const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
          const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

          return { items: newItems, total, itemCount }
        })
      },

      removeItem: (id, color, size) => {
        const itemKey = get().getItemKey(id, color, size)

        set((state) => {
          const newItems = state.items.filter((i) => get().getItemKey(i.id, i.color, i.size) !== itemKey)
          const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
          const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

          return { items: newItems, total, itemCount }
        })
      },

      updateQuantity: (id, color, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id, color, size)
          return
        }

        const itemKey = get().getItemKey(id, color, size)

        set((state) => {
          const newItems = state.items.map((item) =>
            get().getItemKey(item.id, item.color, item.size) === itemKey ? { ...item, quantity } : item,
          )
          const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
          const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

          return { items: newItems, total, itemCount }
        })
      },

      clearCart: () => set({ items: [], total: 0, itemCount: 0 }),
    }),
    {
      name: "svoi-cart-storage",
    },
  ),
)
