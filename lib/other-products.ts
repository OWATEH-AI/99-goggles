export const otherProductCategories = ['Caps', 'Belts', 'Perfumes'] as const
export type OtherProductCategory = typeof otherProductCategories[number]

export type OtherProduct = {
  id: string
  sku: string
  name: string
  category: OtherProductCategory
  description: string
  price: number
  stock: number
  status: 'active' | 'hidden'
  source: 'catalog' | 'admin'
  image?: string
}

export const initialOtherProducts: OtherProduct[] = [
  {
    id: 'accessory-cap-001',
    sku: '99G-CAP-001',
    name: 'Sports Dad Cap',
    category: 'Caps',
    description: 'Unisex washed cotton cap with adjustable brass buckle · Charcoal',
    price: 199,
    stock: 6,
    status: 'active',
    source: 'catalog',
    image: '/images/accessories/cap-charcoal.jpg',
  },
  {
    id: 'accessory-cap-002',
    sku: '99G-CAP-002',
    name: 'Classic Sports',
    category: 'Caps',
    description: 'Breathable structured cotton baseball cap · Navy Blue',
    price: 249,
    stock: 8,
    status: 'active',
    source: 'catalog',
    image: '/images/accessories/cap-navy.jpg',
  },
  {
    id: 'accessory-cap-003',
    sku: '99G-CAP-003',
    name: 'Minimalist Cotton',
    category: 'Caps',
    description: 'Clean structured cotton cap with curved brim · Crisp White',
    price: 299,
    stock: 5,
    status: 'active',
    source: 'catalog',
    image: '/images/accessories/cap-white.jpg',
  },
  {
    id: 'accessory-belt-001',
    sku: '99G-BELT-001',
    name: 'Classic Black',
    category: 'Belts',
    description: 'Genuine full-grain leather belt with brushed silver buckle',
    price: 399,
    stock: 5,
    status: 'active',
    source: 'catalog',
    image: '/images/accessories/belt-black.jpg',
  },
  {
    id: 'accessory-belt-002',
    sku: '99G-BELT-002',
    name: 'Cognac Saddle',
    category: 'Belts',
    description: 'Handcrafted rich tan leather belt with double metallic loops',
    price: 499,
    stock: 4,
    status: 'active',
    source: 'catalog',
    image: '/images/accessories/belt-brown.jpg',
  },
  {
    id: 'accessory-perfume-001',
    sku: '99G-PER-001',
    name: 'Amber Muse',
    category: 'Perfumes',
    description: 'Warm amber, cedarwood & soft musk · 50 ml Eau de Parfum',
    price: 799,
    stock: 4,
    status: 'active',
    source: 'catalog',
    image: '/images/accessories/perfume-amber.jpg',
  },
  {
    id: 'accessory-perfume-002',
    sku: '99G-PER-002',
    name: 'Evening Oud',
    category: 'Perfumes',
    description: 'Cambodian oud, smoky woods, and rich spices · 50 ml Eau de Parfum',
    price: 1199,
    stock: 3,
    status: 'active',
    source: 'catalog',
    image: '/images/accessories/perfume-oud.jpg',
  },
]