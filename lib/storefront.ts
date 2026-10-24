import type { Product } from './products'
import { initialOtherProducts, type OtherProduct } from './other-products'

export type CartLine = { productId: string; quantity: number; size?: string }
export type PaymentChoice = 'deposit' | 'full' | 'store'
export type OrderStatus = 'Pending' | 'Confirmed' | 'Preparing' | 'Ready for Collection' | 'Collected' | 'Cancelled'
export type PaymentStatus = 'Pending' | 'Partially Paid' | 'Paid' | 'Pay at Store' | 'Verification Required'
export type DemoProfile = { firstName: string; lastName: string; email: string; phone: string }

export type Reservation = {
  id: string
  customerName: string
  email: string
  phone: string
  items: { productId: string; name: string; variant: string; quantity: number; unitPrice: number }[]
  total: number
  amountDueAtCheckout: number
  amountPaid: number
  remainingBalance: number
  paymentChoice: PaymentChoice
  paymentStatus: PaymentStatus
  orderStatus: OrderStatus
  collectionDate: string
  collectionTime: string
  createdAt: string
  timeline: { status: OrderStatus; at: string; actor: string }[]
  collectedBy?: string
  collectedAt?: string
}

const CART_KEY = '99g-cart-v1'
const ORDERS_KEY = '99g-reservations-v1'
const FAVORITES_KEY = '99g-favorites-v1'
const PROFILE_KEY = '99g-demo-profile-v1'
const ACTIVE_PROFILE_KEY = '99g-active-profile-v1'
const OTHER_PRODUCTS_KEY = '99g-other-products-v1'
export const STOREFRONT_UPDATED = '99g-storefront-updated'

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) as T : fallback
  } catch {
    return fallback
  }
}

function writeJson<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value))
  window.dispatchEvent(new Event(STOREFRONT_UPDATED))
}

export const readCart = () => readJson<CartLine[]>(CART_KEY, [])
export const writeCart = (lines: CartLine[]) => writeJson(CART_KEY, lines.filter((line) => line.quantity > 0))
export const readReservations = () => readJson<Reservation[]>(ORDERS_KEY, [])
export const writeReservations = (orders: Reservation[]) => writeJson(ORDERS_KEY, orders)
export const readOtherProducts = () => {
  const saved = readJson<OtherProduct[] | null>(OTHER_PRODUCTS_KEY, null)
  if (!saved) return initialOtherProducts
  const initialMap = new Map(initialOtherProducts.map((item) => [item.id, item]))
  const mergedSaved = saved.map((item) => {
    const catalogDefault = initialMap.get(item.id)
    if (catalogDefault && item.source === 'catalog') {
      return {
        ...catalogDefault,
        ...item,
        name: catalogDefault.name,
        description: catalogDefault.description,
        image: catalogDefault.image,
      }
    }
    return item
  })
  const savedIds = new Set(mergedSaved.map((item) => item.id))
  return [...mergedSaved, ...initialOtherProducts.filter((item) => !savedIds.has(item.id))]
}
export const writeOtherProducts = (items: OtherProduct[]) => writeJson(OTHER_PRODUCTS_KEY, items)
export const readFavorites = () => readJson<string[]>(FAVORITES_KEY, [])
export const writeFavorites = (ids: string[]) => writeJson(FAVORITES_KEY, ids)
export const readDemoProfile = () => readJson<DemoProfile | null>(PROFILE_KEY, null)
export const readActiveProfile = () => readJson<DemoProfile | null>(ACTIVE_PROFILE_KEY, null)
export const writeDemoProfile = (profile: DemoProfile | null) => writeJson(PROFILE_KEY, profile)
export const writeActiveProfile = (profile: DemoProfile | null) => {
  if (profile) writeJson(ACTIVE_PROFILE_KEY, profile)
  else {
    window.localStorage.removeItem(ACTIVE_PROFILE_KEY)
    window.dispatchEvent(new Event(STOREFRONT_UPDATED))
  }
}

export function cartCount(lines: CartLine[]) {
  return lines.reduce((total, line) => total + line.quantity, 0)
}

export function cartTotal(lines: CartLine[], catalog: Product[]) {
  return lines.reduce((total, line) => {
    const product = catalog.find((item) => item.id === line.productId)
    return total + (product?.price ?? 0) * line.quantity
  }, 0)
}

export function getAmountDue(total: number, choice: PaymentChoice) {
  if (choice === 'deposit') return Math.ceil(total / 2)
  if (choice === 'full') return total
  return 0
}