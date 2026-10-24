export type ProductCategory = 'Sunglasses' | 'Eyeglasses'
export type FrameShape = 'Aviator' | 'Cat-eye' | 'Round' | 'Square' | 'Rectangle' | 'Oversized' | 'Sport' | 'Classic'
export type FrameGender = 'Women' | 'Men' | 'Unisex' | 'Kids'

export type ColorVariant = {
  id: string
  color: string
  hex: string
  images: string[]
  stock: number
}

export type Product = {
  id: string
  sku: string
  name: string
  slug: string
  description: string
  price: number
  compareAtPrice: number
  currency: 'INR'
  images: string[]
  thumbnail: string
  variants: { id: string; color: string; size: string; stock: number }[]
  colorVariants: ColorVariant[]
  colors: string[]
  sizes: string[]
  category: ProductCategory
  gender: FrameGender
  frameShape: FrameShape
  frameColor: string
  lensColor: string
  stock: number
  status: 'active' | 'out_of_stock' | 'hidden'
  rating: number
  reviewCount: number
  tags: string[]
  featured: boolean
  bestSeller: boolean
  newArrival: boolean
}

type RawProductSeed = {
  name: string
  price: number
  compareAtPrice: number
  frameShape: FrameShape
  category: ProductCategory
  gender: FrameGender
  lensColor: string
  colors: { color: string; hex: string; images: string[] }[]
  description: string
  featured?: boolean
  bestSeller?: boolean
  newArrival?: boolean
}

/* -------------------------------------------------------------------------- */
/*  IMAGE ASSETS                                                              */
/*  • Square / angular studio shots:  frame-black-front, frame-black-side     */
/*  • Round / classic studio shots:   frame-tortoise-front, frame-tortoise-side*/
/*  • Real on-face lifestyle photos:  women, men, kids, couple, senior        */
/*  • Flatlay detail:                 glasses-flatlay                         */
/*                                                                            */
/*  CONSISTENCY RULE:                                                         */
/*  All color variants of a given product share the same frame shape family   */
/*  so switching color never displays a mismatched or different frame model.  */
/* -------------------------------------------------------------------------- */

const SQ_FRONT  = '/images/frame-black-front.jpg'
const SQ_SIDE   = '/images/frame-black-side.jpg'
const RND_FRONT = '/images/frame-tortoise-front.jpg'
const RND_SIDE  = '/images/frame-tortoise-side.jpg'
const FLAT      = '/images/glasses-flatlay.png'

const LIFE_M1   = '/images/indian-man-eyewear.png'
const LIFE_M2   = '/images/indian-man-eyewear-2.png'
const LIFE_W1   = '/images/indian-woman-sunglasses.png'
const LIFE_W2   = '/images/indian-woman-sunglasses-2.png'
const LIFE_W3   = '/images/indian-woman-sunglasses-3.png'
const LIFE_WO   = '/images/indian-woman-eyewear.png'
const LIFE_C    = '/images/indian-couple-eyewear.png'
const LIFE_SR   = '/images/indian-senior-eyewear.png'
const LIFE_K    = '/images/indian-kids-eyewear.png'

// Real dedicated photos by frame shape, tint, and lens type
const AVIATOR_GREEN   = '/images/frames/aviator-metal-green.jpg'
const WAYFARER_BLACK  = '/images/frames/wayfarer-black-studio.jpg'
const ROUND_GOLD      = '/images/frames/round-gold-amber.jpg'
const OVERSIZED_CHAMP = '/images/frames/oversized-champagne-gradient.jpg'
const TORTOISE_WOOD   = '/images/frames/tortoise-wood-green.jpg'
const ROUND_KEYHOLE   = '/images/frames/round-keyhole-beach.jpg'
const ROUND_WIRE      = '/images/frames/round-wire-marble.jpg'
const CATEYE_AMBER    = '/images/frames/cateye-amber-crystal.jpg'
const CLUBMASTER_BOOK = '/images/frames/clubmaster-book.jpg'
const BROWLINE_WOOD   = '/images/frames/browline-wood.jpg'
const ROUND_TORT_DESK = '/images/frames/round-tortoise-desk.jpg'
const CRYSTAL_CLEAR   = '/images/frames/optical-crystal-clear.jpg'
const KIDS_GLASSES    = '/images/frames/kids-cheerful-glasses.jpg'
const SPORT_WRAP      = '/images/frames/sport-wrap-active.jpg'
const ANGULAR_METAL   = '/images/frames/angular-metal-tint.jpg'
const PILOT_GOLD      = '/images/frames/pilot-gold-classic.jpg'
const CLUBROUND_TORT  = '/images/frames/clubround-tortoise.jpg'
const RECT_ACETATE    = '/images/frames/rectangle-acetate-slate.jpg'
const TITANIUM_BLACK  = '/images/frames/titanium-sleek-black.jpg'
const ROUND_OUTDOOR   = '/images/frames/round-outdoorsman-gold.jpg'
const PINK_FASHION    = '/images/frames/pink-fashion-sport.jpg'
const DESIGNER_RECT   = '/images/frames/designer-rectangle-black.jpg'
const KIDS_COLORFUL   = '/images/frames/kids-colorful-frames.jpg'
const ROUND_BLACK_OPT = '/images/frames/round-black-optical.jpg'

const rawProducts: RawProductSeed[] = [
  // ====================================================================
  //  MEN'S SUNGLASSES & FASHION EYEWEAR  (6 products)
  // ====================================================================
  {
    name: 'Alkapuri Aviator',
    price: 1199,
    compareAtPrice: 1699,
    frameShape: 'Aviator',
    category: 'Sunglasses',
    gender: 'Men',
    lensColor: 'Dark Green',
    featured: true,
    bestSeller: false,
    newArrival: true,
    description: 'Classic double-bridge aviator frame with precision gunmetal temples and anti-glare green lenses. Delivers a timeless masculine silhouette for sunny drives across Vadodara.',
    colors: [
      { color: 'Gunmetal', hex: '#4a4c4e', images: [AVIATOR_GREEN, LIFE_M1, SQ_SIDE, FLAT] },
      { color: 'Jet black', hex: '#111111', images: [ANGULAR_METAL, LIFE_M1, SQ_SIDE, FLAT] },
    ],
  },
  {
    name: 'Sayaji Bold Rectangle',
    price: 999,
    compareAtPrice: 1499,
    frameShape: 'Rectangle',
    category: 'Sunglasses',
    gender: 'Men',
    lensColor: 'Deep Smoke',
    featured: true,
    bestSeller: true,
    newArrival: false,
    description: 'Wide rectangular fashion shades in rich gloss-black acetate with dark tint UV400 lenses. Designed for sharp city profiles and confident outdoor styling.',
    colors: [
      { color: 'Gloss black', hex: '#111111', images: [RECT_ACETATE, DESIGNER_RECT, LIFE_M2, FLAT] },
      { color: 'Dark navy', hex: '#1e293b', images: [RECT_ACETATE, DESIGNER_RECT, LIFE_M2, FLAT] },
    ],
  },
  {
    name: 'Urban Edge Square',
    price: 799,
    compareAtPrice: 1199,
    frameShape: 'Square',
    category: 'Sunglasses',
    gender: 'Men',
    lensColor: 'Smoke Grey',
    featured: true,
    bestSeller: true,
    newArrival: true,
    description: 'Bold square fashion sunglasses with a sharp matte-black profile and UV400 smoke lenses. Built with reinforced barrel hinges for all-day street-style wear.',
    colors: [
      { color: 'Matte black', hex: '#1e1e1e', images: [ROUND_KEYHOLE, WAYFARER_BLACK, LIFE_M2, FLAT] },
      { color: 'Charcoal grey', hex: '#374151', images: [ROUND_KEYHOLE, WAYFARER_BLACK, LIFE_M1, FLAT] },
    ],
  },
  {
    name: 'Heritage Round Tortoise',
    price: 1099,
    compareAtPrice: 1499,
    frameShape: 'Round',
    category: 'Sunglasses',
    gender: 'Men',
    lensColor: 'Amber Brown',
    featured: false,
    bestSeller: true,
    newArrival: true,
    description: "Vintage-inspired round sunglasses in warm tortoise acetate with gradient amber lenses. A retro gentleman's silhouette with modern UV400 protection.",
    colors: [
      { color: 'Warm tortoise', hex: '#6a462f', images: [TORTOISE_WOOD, ROUND_GOLD, LIFE_M1, FLAT] },
      { color: 'Honey amber', hex: '#8c5930', images: [ROUND_GOLD, TORTOISE_WOOD, LIFE_M2, FLAT] },
    ],
  },
  {
    name: 'Baroda Sport Wrap',
    price: 1499,
    compareAtPrice: 1999,
    frameShape: 'Sport',
    category: 'Sunglasses',
    gender: 'Men',
    lensColor: 'Polarized Charcoal',
    featured: false,
    bestSeller: false,
    newArrival: true,
    description: 'Aerodynamic wraparound sport sunglasses with anti-slip temple grips and polarized UV400 lenses. Engineered for cycling, cricket, and active morning runs.',
    colors: [
      { color: 'Matte black', hex: '#1e1e1e', images: [SPORT_WRAP, WAYFARER_BLACK, LIFE_M2, FLAT] },
      { color: 'Storm grey', hex: '#4b5563', images: [SPORT_WRAP, WAYFARER_BLACK, LIFE_M1, FLAT] },
    ],
  },
  {
    name: 'Executive Slim Rectangle',
    price: 899,
    compareAtPrice: 1299,
    frameShape: 'Rectangle',
    category: 'Eyeglasses',
    gender: 'Men',
    lensColor: 'Clear Blue-Light',
    featured: false,
    bestSeller: false,
    newArrival: true,
    description: 'Slim rectangular optical frames with blue-light filtering lenses for long office hours and screen work. Lightweight spring hinges ensure zero-pressure comfort.',
    colors: [
      { color: 'Matte black', hex: '#1e1e1e', images: [DESIGNER_RECT, TITANIUM_BLACK, LIFE_M2, FLAT] },
      { color: 'Espresso', hex: '#3a2b22', images: [BROWLINE_WOOD, CLUBMASTER_BOOK, LIFE_M1, FLAT] },
    ],
  },

  // ====================================================================
  //  WOMEN'S SUNGLASSES & FASHION EYEWEAR  (6 products)
  // ====================================================================
  {
    name: 'Glamour Oversized',
    price: 1299,
    compareAtPrice: 1799,
    frameShape: 'Oversized',
    category: 'Sunglasses',
    gender: 'Women',
    lensColor: 'Smoke Black',
    featured: true,
    bestSeller: false,
    newArrival: true,
    description: 'Dramatically oversized fashion sunglasses with generous facial coverage and dark UV400 lenses. Makes a bold, confident style statement for brunches and festivals.',
    colors: [
      { color: 'Gloss black', hex: '#111111', images: [OVERSIZED_CHAMP, ROUND_OUTDOOR, LIFE_W1, FLAT] },
      { color: 'Midnight black', hex: '#0a0a0a', images: [OVERSIZED_CHAMP, ROUND_OUTDOOR, LIFE_W1, FLAT] },
    ],
  },
  {
    name: 'Saffron Cat-Eye',
    price: 1199,
    compareAtPrice: 1699,
    frameShape: 'Cat-eye',
    category: 'Sunglasses',
    gender: 'Women',
    lensColor: 'Brown Gradient',
    featured: true,
    bestSeller: true,
    newArrival: false,
    description: 'Statement cat-eye sunglasses featuring honey-hued tortoise acetate and dark gradient lenses. A bold, flattering silhouette for vibrant city outings.',
    colors: [
      { color: 'Honey tortoise', hex: '#8c5930', images: [CATEYE_AMBER, TORTOISE_WOOD, LIFE_W2, FLAT] },
      { color: 'Deep tortoise', hex: '#5a3820', images: [CATEYE_AMBER, TORTOISE_WOOD, LIFE_W2, FLAT] },
    ],
  },
  {
    name: 'Sunday Amber Oversized',
    price: 999,
    compareAtPrice: 1399,
    frameShape: 'Oversized',
    category: 'Sunglasses',
    gender: 'Women',
    lensColor: 'Warm Smoke',
    featured: false,
    bestSeller: false,
    newArrival: true,
    description: 'Generously proportioned oversized sunglasses in rich amber tortoise tones. Broad UV400 coverage with polished metallic hinges for sunny weekend outings.',
    colors: [
      { color: 'Amber brown', hex: '#8b5a2b', images: [ROUND_OUTDOOR, OVERSIZED_CHAMP, LIFE_W3, FLAT] },
      { color: 'Warm tortoise', hex: '#6a462f', images: [ROUND_OUTDOOR, OVERSIZED_CHAMP, LIFE_W3, FLAT] },
    ],
  },
  {
    name: 'Rose Crystal Cat-Eye',
    price: 899,
    compareAtPrice: 1299,
    frameShape: 'Cat-eye',
    category: 'Eyeglasses',
    gender: 'Women',
    lensColor: 'Clear Optical',
    featured: false,
    bestSeller: false,
    newArrival: true,
    description: 'Gracefully upswept cat-eye spectacles crafted in translucent blush rose acetate. Adds a luminous, flattering lift to cheekbones with featherlight comfort.',
    colors: [
      { color: 'Rose crystal', hex: '#c08497', images: [PINK_FASHION, CRYSTAL_CLEAR, LIFE_WO, FLAT] },
      { color: 'Amber tortoise', hex: '#6a462f', images: [CATEYE_AMBER, CRYSTAL_CLEAR, LIFE_WO, FLAT] },
    ],
  },
  {
    name: 'Aura Tortoise Round',
    price: 999,
    compareAtPrice: 1499,
    frameShape: 'Round',
    category: 'Sunglasses',
    gender: 'Women',
    lensColor: 'Warm Brown Gradient',
    featured: true,
    bestSeller: true,
    newArrival: true,
    description: 'Softly rounded feminine frame in luminous amber tortoise acetate. Complemented by gradient brown UV400 lenses that enhance warm skin tones with effortless elegance.',
    colors: [
      { color: 'Tortoise brown', hex: '#6a462f', images: [TORTOISE_WOOD, ROUND_GOLD, LIFE_W3, FLAT] },
      { color: 'Honey amber', hex: '#8c5930', images: [ROUND_GOLD, TORTOISE_WOOD, LIFE_W2, FLAT] },
    ],
  },
  {
    name: 'Morning Light Round',
    price: 899,
    compareAtPrice: 1299,
    frameShape: 'Round',
    category: 'Eyeglasses',
    gender: 'Women',
    lensColor: 'Clear Optical',
    featured: false,
    bestSeller: false,
    newArrival: true,
    description: 'Minimalist round spectacles in warm champagne tones with delicate temples. Balanced and lightweight for study, reading, and everyday workplace elegance.',
    colors: [
      { color: 'Champagne', hex: '#c5a059', images: [ROUND_TORT_DESK, CLUBMASTER_BOOK, LIFE_WO, FLAT] },
      { color: 'Warm tortoise', hex: '#6a462f', images: [ROUND_TORT_DESK, CLUBMASTER_BOOK, LIFE_WO, FLAT] },
    ],
  },

  // ====================================================================
  //  KIDS' EYEWEAR & SUNGLASSES  (4 products)
  // ====================================================================
  {
    name: 'Junior Flex Round',
    price: 599,
    compareAtPrice: 899,
    frameShape: 'Round',
    category: 'Eyeglasses',
    gender: 'Kids',
    lensColor: 'Clear Anti-Scratch',
    featured: true,
    bestSeller: true,
    newArrival: true,
    description: 'Ultra-flexible TR90 frame with soft rubber ear tips engineered for active children. Shatterproof, gentle on the bridge, and built to survive school and playtime.',
    colors: [
      { color: 'Royal blue', hex: '#2563eb', images: [KIDS_GLASSES, ROUND_BLACK_OPT, LIFE_K, FLAT] },
      { color: 'Warm tortoise', hex: '#6a462f', images: [KIDS_GLASSES, ROUND_BLACK_OPT, LIFE_K, FLAT] },
    ],
  },
  {
    name: 'Junior Sun Explorer',
    price: 549,
    compareAtPrice: 799,
    frameShape: 'Classic',
    category: 'Sunglasses',
    gender: 'Kids',
    lensColor: 'UV400 Smoke',
    featured: false,
    bestSeller: true,
    newArrival: true,
    description: 'Kids UV400 protection sunglasses with unbreakable silicone hinges and polarized scratch-resistant lenses for bright outdoor adventures in Gujarat.',
    colors: [
      { color: 'Cobalt blue', hex: '#1d4ed8', images: [KIDS_COLORFUL, KIDS_GLASSES, LIFE_K, FLAT] },
      { color: 'Matte black', hex: '#1e1e1e', images: [KIDS_COLORFUL, KIDS_GLASSES, LIFE_K, FLAT] },
    ],
  },
  {
    name: 'Little Explorer Square',
    price: 649,
    compareAtPrice: 949,
    frameShape: 'Square',
    category: 'Eyeglasses',
    gender: 'Kids',
    lensColor: 'Clear Blue-Light',
    featured: true,
    bestSeller: false,
    newArrival: true,
    description: 'Durable kids square optical frame with blue-light filtering lenses for digital learning and tablet screens. Soft-touch hypoallergenic bridge for growing noses.',
    colors: [
      { color: 'Matte black', hex: '#1e1e1e', images: [DESIGNER_RECT, KIDS_GLASSES, LIFE_K, FLAT] },
      { color: 'Dark navy', hex: '#1e293b', images: [DESIGNER_RECT, KIDS_GLASSES, LIFE_K, FLAT] },
    ],
  },
  {
    name: 'Bright Spark Oval',
    price: 599,
    compareAtPrice: 899,
    frameShape: 'Round',
    category: 'Eyeglasses',
    gender: 'Kids',
    lensColor: 'Clear Optical',
    featured: false,
    bestSeller: false,
    newArrival: true,
    description: 'Cheerful and durable kids optical frames featuring flexible temple tips and curved ear grippers to keep glasses comfortably in place throughout the day.',
    colors: [
      { color: 'Warm tortoise', hex: '#6a462f', images: [KIDS_COLORFUL, ROUND_TORT_DESK, LIFE_K, FLAT] },
      { color: 'Caramel brown', hex: '#a0522d', images: [KIDS_COLORFUL, ROUND_TORT_DESK, LIFE_K, FLAT] },
    ],
  },

  // ====================================================================
  //  UNISEX FASHION EYEWEAR & SUNGLASSES  (8 products)
  // ====================================================================
  {
    name: 'Vadodara Classic',
    price: 899,
    compareAtPrice: 1299,
    frameShape: 'Classic',
    category: 'Sunglasses',
    gender: 'Unisex',
    lensColor: 'Warm Amber',
    featured: true,
    bestSeller: true,
    newArrival: false,
    description: 'Our signature everyday frame crafted in rich warm tortoise acetate. Balanced bridge fit suits all face shapes with 100% UV protection for Vadodara sunshine.',
    colors: [
      { color: 'Warm tortoise', hex: '#6a462f', images: [CLUBROUND_TORT, TORTOISE_WOOD, LIFE_C, FLAT] },
      { color: 'Classic brown', hex: '#5a3820', images: [CLUBROUND_TORT, TORTOISE_WOOD, LIFE_C, FLAT] },
    ],
  },
  {
    name: 'Old City Pilot',
    price: 1299,
    compareAtPrice: 1799,
    frameShape: 'Aviator',
    category: 'Sunglasses',
    gender: 'Unisex',
    lensColor: 'Antique Bronze',
    featured: false,
    bestSeller: false,
    newArrival: true,
    description: 'Vintage-inspired aviator frame with bronze metal contours, delicate brow-bar, and rich sepia-toned lenses that filter harsh sunlight during midday commutes.',
    colors: [
      { color: 'Antique bronze', hex: '#82603f', images: [PILOT_GOLD, ROUND_WIRE, LIFE_SR, FLAT] },
      { color: 'Warm gold', hex: '#b8860b', images: [PILOT_GOLD, ROUND_WIRE, LIFE_SR, FLAT] },
    ],
  },
  {
    name: 'Metro Clear Optical',
    price: 799,
    compareAtPrice: 1199,
    frameShape: 'Rectangle',
    category: 'Eyeglasses',
    gender: 'Unisex',
    lensColor: 'Clear Optical',
    featured: true,
    bestSeller: false,
    newArrival: true,
    description: 'Contemporary crystal-clear optical spectacles with clean rectilinear geometry. Modern, transparent, and versatile enough to pair with any wardrobe.',
    colors: [
      { color: 'Crystal clear', hex: '#d1d5db', images: [CRYSTAL_CLEAR, FLAT, TITANIUM_BLACK, LIFE_C] },
      { color: 'Matte black', hex: '#1e1e1e', images: [TITANIUM_BLACK, DESIGNER_RECT, FLAT, LIFE_C] },
    ],
  },
  {
    name: 'Sabarmati Round',
    price: 899,
    compareAtPrice: 1299,
    frameShape: 'Round',
    category: 'Eyeglasses',
    gender: 'Unisex',
    lensColor: 'Clear Optical',
    featured: false,
    bestSeller: false,
    newArrival: true,
    description: 'Timeless circular silhouette with keyhole bridge and rich deep brown marbling. Effortless warmth for everyday reading and office work.',
    colors: [
      { color: 'Deep brown', hex: '#4a3525', images: [ROUND_BLACK_OPT, ROUND_TORT_DESK, LIFE_C, FLAT] },
      { color: 'Warm tortoise', hex: '#6a462f', images: [ROUND_TORT_DESK, ROUND_BLACK_OPT, LIFE_C, FLAT] },
    ],
  },
  {
    name: 'Narmada Sport Active',
    price: 1499,
    compareAtPrice: 1999,
    frameShape: 'Sport',
    category: 'Sunglasses',
    gender: 'Unisex',
    lensColor: 'Charcoal Polarized',
    featured: false,
    bestSeller: false,
    newArrival: true,
    description: 'Wraparound sporty sunglasses with curved aerodynamic rims, anti-slip temple grips, and polarized UV400 lenses for cycling, driving, and active outdoor days.',
    colors: [
      { color: 'Matte charcoal', hex: '#374151', images: [SPORT_WRAP, WAYFARER_BLACK, LIFE_C, FLAT] },
      { color: 'Matte black', hex: '#1e1e1e', images: [SPORT_WRAP, WAYFARER_BLACK, LIFE_C, FLAT] },
    ],
  },
  {
    name: 'Mandvi UV400 Essential',
    price: 99,
    compareAtPrice: 99,
    frameShape: 'Square',
    category: 'Sunglasses',
    gender: 'Unisex',
    lensColor: 'Green UV400',
    featured: true,
    bestSeller: true,
    newArrival: false,
    description: 'Our special ₹99 essential store frame. High-impact dark green UV400 protective lenses with durable lightweight polymer frame — unbeatable everyday sun defence.',
    colors: [
      { color: 'Full black', hex: '#0a0a0a', images: [WAYFARER_BLACK, RECT_ACETATE, LIFE_C, FLAT] },
      { color: 'Dark charcoal', hex: '#374151', images: [WAYFARER_BLACK, RECT_ACETATE, LIFE_C, FLAT] },
    ],
  },
  {
    name: 'Surya Sunset Tint Aviator',
    price: 1299,
    compareAtPrice: 1799,
    frameShape: 'Aviator',
    category: 'Sunglasses',
    gender: 'Unisex',
    lensColor: 'Amber Sunset Tint',
    featured: true,
    bestSeller: false,
    newArrival: true,
    description: 'Fashion-forward aviator spectacles with gleaming gold wire contouring and warm amber-yellow sunset lenses that elevate festival, cafe, and weekend styling.',
    colors: [
      { color: 'Gold amber', hex: '#d97706', images: [ANGULAR_METAL, ROUND_GOLD, LIFE_SR, FLAT] },
      { color: 'Honey wire', hex: '#b45309', images: [ROUND_WIRE, ROUND_GOLD, LIFE_SR, FLAT] },
    ],
  },
  {
    name: 'Kutch Desert Cat-Eye',
    price: 1199,
    compareAtPrice: 1599,
    frameShape: 'Cat-eye',
    category: 'Sunglasses',
    gender: 'Women',
    lensColor: 'Terracotta Gradient',
    featured: false,
    bestSeller: true,
    newArrival: true,
    description: 'Dramatic upswept cat-eye in translucent honey-crystal acetate with rich terracotta gradient UV400 lenses. Sculptural elegance tailored for bright Gujarat skies.',
    colors: [
      { color: 'Amber crystal', hex: '#b45309', images: [CATEYE_AMBER, OVERSIZED_CHAMP, LIFE_W2, FLAT] },
      { color: 'Desert sand', hex: '#d97706', images: [CATEYE_AMBER, OVERSIZED_CHAMP, LIFE_W1, FLAT] },
    ],
  },
  {
    name: 'Navrachana Titanium Slim',
    price: 1399,
    compareAtPrice: 1899,
    frameShape: 'Rectangle',
    category: 'Eyeglasses',
    gender: 'Unisex',
    lensColor: 'Blue-Cut Optical',
    featured: true,
    bestSeller: false,
    newArrival: true,
    description: 'Ultralight Japanese-engineered titanium optical frames in matte raven black. Exceptional tensile strength, anti-corrosive finish, and precision blue-cut lenses for all-day comfort.',
    colors: [
      { color: 'Matte titanium', hex: '#1c1917', images: [TITANIUM_BLACK, DESIGNER_RECT, RECT_ACETATE, FLAT] },
      { color: 'Gunmetal slate', hex: '#374151', images: [TITANIUM_BLACK, DESIGNER_RECT, RECT_ACETATE, FLAT] },
    ],
  },
  {
    name: 'Champaner Heritage Clubround',
    price: 1249,
    compareAtPrice: 1699,
    frameShape: 'Round',
    category: 'Sunglasses',
    gender: 'Unisex',
    lensColor: 'Emerald Green Polarized',
    featured: true,
    bestSeller: true,
    newArrival: true,
    description: 'Iconic browline clubround sunglasses featuring rich tortoiseshell acetate top rims, wire-rimmed gold lower eyewires, and polarized emerald green lenses.',
    colors: [
      { color: 'Tortoise gold', hex: '#78350f', images: [CLUBROUND_TORT, ROUND_OUTDOOR, LIFE_M1, FLAT] },
      { color: 'Ebony gold', hex: '#111827', images: [CLUBROUND_TORT, ROUND_OUTDOOR, LIFE_M2, FLAT] },
    ],
  },
  {
    name: 'Sayaji Rose Tint Fashion',
    price: 1099,
    compareAtPrice: 1499,
    frameShape: 'Square',
    category: 'Sunglasses',
    gender: 'Women',
    lensColor: 'Pastel Rose UV400',
    featured: true,
    bestSeller: false,
    newArrival: true,
    description: 'Chic modern festival fashion glasses with translucent berry pink frames and soothing rose-tinted UV400 lenses. Adds an artistic pop of color to any sunny outfit.',
    colors: [
      { color: 'Pastel rose', hex: '#f43f5e', images: [PINK_FASHION, OVERSIZED_CHAMP, LIFE_W3, FLAT] },
      { color: 'Blush crystal', hex: '#fb7185', images: [PINK_FASHION, OVERSIZED_CHAMP, LIFE_W1, FLAT] },
    ],
  },
  {
    name: 'Fatehgunj Outdoorsman Aviator',
    price: 1349,
    compareAtPrice: 1899,
    frameShape: 'Aviator',
    category: 'Sunglasses',
    gender: 'Men',
    lensColor: 'Amber High-Contrast',
    featured: false,
    bestSeller: true,
    newArrival: true,
    description: 'Vintage outdoorsman sunglasses featuring a sweat-bar gold bridge, circular pilot contouring, and warm amber high-contrast lenses crafted for low-glare clarity.',
    colors: [
      { color: 'Vintage gold', hex: '#d97706', images: [ROUND_OUTDOOR, PILOT_GOLD, LIFE_M2, FLAT] },
      { color: 'Warm bronze', hex: '#92400e', images: [ROUND_OUTDOOR, PILOT_GOLD, LIFE_M1, FLAT] },
    ],
  },
  {
    name: 'Junior Rainbow Splash',
    price: 499,
    compareAtPrice: 799,
    frameShape: 'Round',
    category: 'Sunglasses',
    gender: 'Kids',
    lensColor: 'Rainbow UV400 Shield',
    featured: true,
    bestSeller: true,
    newArrival: true,
    description: 'Playful, candy-bright junior sunglasses designed with ultra-durable flexible frames and 100% UV400 protective scratch-resistant lenses for sunny outdoor play.',
    colors: [
      { color: 'Rainbow candy', hex: '#ec4899', images: [KIDS_COLORFUL, KIDS_GLASSES, LIFE_K, FLAT] },
      { color: 'Sunny yellow', hex: '#eab308', images: [KIDS_COLORFUL, KIDS_GLASSES, LIFE_K, FLAT] },
    ],
  },
]

export const products: Product[] = rawProducts.map((seed, index) => {
  const slug = seed.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  const id = `frame-${String(index + 1).padStart(3, '0')}`
  const primaryColor = seed.colors[0]
  const colorNames = seed.colors.map((c) => c.color)
  const allImages = primaryColor.images

  const colorVariants: ColorVariant[] = seed.colors.map((c, cIndex) => ({
    id: `${id}-color-${cIndex + 1}`,
    color: c.color,
    hex: c.hex,
    images: c.images,
    stock: 8 + ((index + cIndex) % 6),
  }))

  const variants = colorVariants.flatMap((cv) => [
    { id: `${cv.id}-s`, color: cv.color, size: 'Small', stock: Math.max(2, Math.floor(cv.stock / 3)) },
    { id: `${cv.id}-m`, color: cv.color, size: 'Medium', stock: Math.max(3, Math.floor(cv.stock / 2)) },
    { id: `${cv.id}-l`, color: cv.color, size: 'Large', stock: Math.max(2, Math.floor(cv.stock / 3)) },
  ])

  return {
    id,
    sku: `99G-${String(index + 1).padStart(4, '0')}`,
    name: seed.name,
    slug,
    description: seed.description,
    price: seed.price,
    compareAtPrice: seed.compareAtPrice,
    currency: 'INR',
    images: allImages,
    thumbnail: allImages[0],
    variants,
    colorVariants,
    colors: colorNames,
    sizes: ['Small', 'Medium', 'Large'],
    category: seed.category,
    gender: seed.gender,
    frameShape: seed.frameShape,
    frameColor: primaryColor.color,
    lensColor: seed.lensColor,
    stock: colorVariants.reduce((sum, cv) => sum + cv.stock, 0),
    status: 'active',
    rating: 4.8,
    reviewCount: 12 + (index * 3),
    tags: [seed.frameShape.toLowerCase(), seed.gender.toLowerCase(), seed.category.toLowerCase()],
    featured: seed.featured ?? false,
    bestSeller: seed.bestSeller ?? false,
    newArrival: seed.newArrival ?? false,
  }
})

export const formatPrice = (amount: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)

export const getProduct = (id: string) => products.find((product) => product.id === id)
export const getProductBySlug = (slug: string) => products.find((product) => product.slug === slug)