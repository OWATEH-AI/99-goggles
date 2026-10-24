'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CalendarCheck,
  Check,
  Clock,
  CreditCard,
  Heart,
  MapPin,
  Search,
  ShoppingBag,
  Smile,
  Sun,
} from 'lucide-react'
import { products, formatPrice, type Product } from '@/lib/products'
import { readCart, readFavorites, writeCart, writeFavorites } from '@/lib/storefront'
import { StorefrontHeader } from './header'

const filters = ['All frames', 'Sunglasses', 'Eyeglasses', 'Women', 'Men', 'Kids', 'New arrivals'] as const
type Filter = typeof filters[number]

const heroSlides = [
  {
    image: '/images/indian-woman-sunglasses-2.png',
    alt: 'Indian woman wearing stylish sunglasses outdoors',
    eyebrow: "Women's Collection · City light, clear style",
    product: products.find((p) => p.gender === 'Women') ?? products[0],
  },
  {
    image: '/images/indian-man-eyewear-2.png',
    alt: 'Indian man wearing modern eyewear',
    eyebrow: "Men's Collection · Sharp & everyday",
    product: products.find((p) => p.gender === 'Men') ?? products[0],
  },
  {
    image: '/images/indian-kids-eyewear.png',
    alt: 'Indian child wearing lightweight flexible eyewear',
    eyebrow: "Kids' Collection · Flexible & shatterproof",
    product: products.find((p) => p.gender === 'Kids') ?? products[0],
  },
  {
    image: '/images/indian-woman-sunglasses.png',
    alt: 'Indian woman wearing glamorous oversized sunglasses',
    eyebrow: 'Fashion Sunglasses · Iconic statements',
    product: products.find((p) => p.name.includes('Glamour')) ?? products[0],
  },
  {
    image: '/images/indian-couple-eyewear.png',
    alt: 'Indian couple in contemporary eyewear',
    eyebrow: 'Universal Fit · Find a frame that feels like you',
    product: products.find((p) => p.gender === 'Unisex') ?? products[0],
  },
]

const marqueeItems = [
  '100% UV400 Protection',
  'Try & Collect in Vadodara',
  'Trendy Fashion Sunglasses',
  'Starting at Just ₹99',
  'Crafted for Indian Faces',
  'Flexible & Shatterproof Kids Frames',
  'Near Mandvi Bus Stand',
  'Reserve Online · Zero Delivery Delays',
]

function ProductCard({
  product,
  onAdd,
  onFavorite,
  added,
  saved,
}: {
  product: Product
  onAdd: (product: Product) => void
  onFavorite: (product: Product) => void
  added: boolean
  saved: boolean
}) {
  const [activeColorIdx, setActiveColorIdx] = useState(0)
  const discount = Math.round((1 - product.price / product.compareAtPrice) * 100)

  const activeColor = product.colorVariants?.[activeColorIdx] ?? product.colorVariants?.[0]
  const colorImages = activeColor?.images && activeColor.images.length > 0 ? activeColor.images : product.images
  // No changing of image on hover - remains exact and stable
  const currentImage = colorImages[0]
  const isProductShot = currentImage.includes('frame-') || currentImage.includes('glasses-flatlay')

  return (
    <article className="group min-w-0">
      <div className="relative aspect-[.82] overflow-hidden bg-[#e9e2d8] dark:bg-[#24201c]">
        <Link
          className="absolute inset-0"
          href={`/product/${product.slug}${activeColor?.color ? `?color=${encodeURIComponent(activeColor.color)}` : ''}`}
          aria-label={`View ${product.name}`}
        >
          <Image
            src={currentImage}
            alt={`${product.name} - ${activeColor?.color ?? product.frameColor}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={
              isProductShot
                ? 'object-contain p-3 sm:p-3.5 object-center transition-transform duration-300'
                : 'object-cover object-center transition-transform duration-300'
            }
          />
        </Link>

        {/* Badges */}
        <div className="absolute left-2.5 top-2.5 sm:left-3 sm:top-3 flex flex-col gap-1 pointer-events-none">
          {discount > 0 && (
            <span className="bg-[#f7f4ef]/95 dark:bg-[#1e1b19]/95 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#81431d] dark:text-[#f1c092] shadow-sm">
              {discount}% off
            </span>
          )}
          {product.gender === 'Kids' && (
            <span className="bg-[#2563eb] text-white px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] shadow-sm">
              Kids
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          className="absolute right-2.5 top-2.5 sm:right-3 sm:top-3 grid size-10 place-items-center bg-[#f7f4ef]/90 dark:bg-[#1e1b19]/90 text-[#201e1b] dark:text-[#f4eee5] shadow-sm transition-transform hover:scale-110 active:scale-95"
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          aria-pressed={saved}
          onClick={() => onFavorite(product)}
        >
          <Heart
            size={17}
            strokeWidth={1.5}
            fill={saved ? '#a65b27' : 'none'}
            className={saved ? 'text-[#a65b27]' : ''}
          />
        </button>

        {/* Multi-view indicator */}
        {colorImages.length > 1 && (
          <span className="absolute left-2.5 sm:left-3 bottom-14 hidden text-[8px] font-medium uppercase tracking-[0.1em] text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm sm:inline-block pointer-events-none">
            {colorImages.length} views
          </span>
        )}

        {/* Add to bag button */}
        <button
          onClick={() => onAdd(product)}
          className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 flex min-h-11 items-center justify-center gap-2 bg-[#201e1b] dark:bg-[#2e2620] dark:border dark:border-[#39322d] px-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#a65b27] dark:hover:bg-[#a65b27] active:scale-[0.98]"
        >
          {added ? (
            <>
              <Check size={15} /> Added to bag
            </>
          ) : (
            <>
              <ShoppingBag size={15} /> Add to bag
            </>
          )}
        </button>
      </div>

      {/* Frame details & color swatches */}
      <div className="pt-3">
        {product.colorVariants && product.colorVariants.length > 1 && (
          <div className="mb-1.5 flex items-center gap-1.5" aria-label="Available frame colours">
            {product.colorVariants.map((cv, idx) => (
              <button
                key={cv.color}
                onClick={() => setActiveColorIdx(idx)}
                aria-label={`View in ${cv.color}`}
                className={`size-3 rounded-full border transition-transform ${
                  activeColorIdx === idx ? 'scale-125 border-[#201e1b] dark:border-white ring-1 ring-[#a65b27]' : 'border-black/30 dark:border-white/50 hover:scale-110'
                }`}
                style={{ backgroundColor: cv.hex }}
              />
            ))}
            <span className="ml-1 text-[9px] text-[#89837a] dark:text-[#b8afa4]">{product.colorVariants.length} cols</span>
          </div>
        )}

        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-[13px] font-semibold">
              <Link href={`/product/${product.slug}`} className="hover:text-[#a65b27]">
                {product.name}
              </Link>
            </h3>
            <p className="mt-0.5 text-[11px] text-[#777169]">
              {activeColor?.color ?? product.frameColor} · {product.frameShape}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[13px] font-semibold">{formatPrice(product.price)}</p>
            {product.compareAtPrice > product.price && (
              <p className="text-[10px] text-[#89837a] line-through">{formatPrice(product.compareAtPrice)}</p>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export function StorefrontHomepage() {
  const [filter, setFilter] = useState<Filter>('All frames')
  const [query, setQuery] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [addedId, setAddedId] = useState<string | null>(null)
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const [heroSlide, setHeroSlide] = useState(0)
  const [heroPaused, setHeroPaused] = useState(false)

  useEffect(() => setFavoriteIds(readFavorites()), [])

  useEffect(() => {
    const category = new URLSearchParams(window.location.search).get('category')
    const requestedFilter = filters.find((item) => item.toLowerCase() === category?.toLowerCase())
    if (requestedFilter) setFilter(requestedFilter)
  }, [])

  useEffect(() => {
    if (heroPaused) return
    const timer = window.setInterval(() => setHeroSlide((current) => (current + 1) % heroSlides.length), 5500)
    return () => window.clearInterval(timer)
  }, [heroPaused])

  const shownProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const filtered = products.filter((product) => {
      const matchesFilter =
        filter === 'All frames' ||
        product.category === filter ||
        product.gender === filter ||
        (filter === 'New arrivals' && product.newArrival)
      const matchesQuery =
        !normalizedQuery ||
        `${product.name} ${product.frameShape} ${product.frameColor} ${product.category} ${product.gender}`
          .toLowerCase()
          .includes(normalizedQuery)
      return matchesFilter && matchesQuery
    })
    return showAll || filter !== 'All frames' || normalizedQuery ? filtered : filtered.slice(0, 8)
  }, [filter, query, showAll])

  function addToBag(product: Product) {
    const current = readCart()
    const size = product.variants[0]?.size ?? 'Medium'
    const existing = current.find((line) => line.productId === product.id && (line.size ?? size) === size)
    writeCart(
      existing
        ? current.map((line) =>
            line.productId === product.id && (line.size ?? size) === size
              ? { ...line, quantity: line.quantity + 1 }
              : line
          )
        : [...current, { productId: product.id, quantity: 1, size }]
    )
    setAddedId(product.id)
    window.setTimeout(() => setAddedId((id) => (id === product.id ? null : id)), 1400)
  }

  function toggleFavorite(product: Product) {
    const next = favoriteIds.includes(product.id)
      ? favoriteIds.filter((id) => id !== product.id)
      : [...favoriteIds, product.id]
    setFavoriteIds(next)
    writeFavorites(next)
  }

  return (
    <main id="top" className="min-h-screen bg-[#f7f4ef] text-[#201e1b]">
      <div className="bg-[#a65b27] px-4 py-2 text-center text-[9px] font-semibold uppercase tracking-[0.18em] text-white sm:text-[10px]">
        Order online. Collect from our Vadodara store.
      </div>
      <StorefrontHeader />

      {/* Hero Showcase Slideshow */}
      <section
        className="relative isolate overflow-hidden bg-[#27231e] text-white flex flex-col justify-between min-h-[calc(100svh-102px)] md:min-h-[calc(100vh-110px)]"
        aria-roledescription="carousel"
        aria-label="Featured eyewear"
        onMouseEnter={() => setHeroPaused(true)}
        onMouseLeave={() => setHeroPaused(false)}
      >
        {/* Background slides */}
        {heroSlides.map((slide, index) => (
          <Image
            key={slide.image}
            src={slide.image}
            alt={slide.alt}
            fill
            loading={index === heroSlide ? 'eager' : 'lazy'}
            fetchPriority={index === heroSlide ? 'high' : 'low'}
            sizes="100vw"
            className={`absolute inset-0 -z-20 object-cover object-center transition-opacity duration-700 ${
              index === heroSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* Gradient — left strip on desktop, bottom-heavy on mobile */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/30 to-black/70 sm:bg-gradient-to-r sm:from-black/85 sm:via-black/60 sm:to-transparent" />

        {/* ── Main content column ── */}
        <div className="mx-auto flex flex-1 w-full max-w-[1360px] flex-col justify-center px-5 py-10 sm:px-8 sm:py-14 md:px-10 md:py-16 sm:max-w-[580px] sm:mr-auto sm:ml-0">

          {/* Eyebrow */}
          <p className="mb-4 flex items-center gap-2 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f1c092]">
            <span className="size-1.5 rounded-full bg-[#f1c092] shrink-0" />
            {heroSlides[heroSlide].eyebrow}
          </p>

          {/* Heading */}
          <h1 className="font-serif text-[clamp(2.4rem,6vw,5.4rem)] leading-[1.0] mb-5">
            Your perfect pair<br />
            <em className="text-[#f1c092]">starts here.</em>
          </h1>

          {/* Description */}
          <p className="mb-7 max-w-[440px] text-[13px] sm:text-[15px] leading-[1.8] text-white/80">
            Handpicked frames for every face and every occasion. From bold fashion sunglasses to lightweight kids&apos; optical — every pair is real, every price is honest, and every frame is yours to try in‑store.
          </p>

          {/* Product pill */}
          <p className="mb-6 flex items-center gap-2.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-2 text-[11px] sm:text-[12px] font-semibold text-white w-fit">
            <span className="size-1.5 rounded-full bg-[#f1c092] shrink-0" />
            {heroSlides[heroSlide].product.name}
            <span className="text-white/50 mx-1">·</span>
            {formatPrice(heroSlides[heroSlide].product.price)}
          </p>

          {/* CTA buttons — stacked, full width */}
          <div className="flex flex-col gap-3 w-full max-w-[440px]">
            <Link
              className="flex items-center justify-center gap-3 bg-[#a65b27] py-4 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-all hover:bg-[#81431d] active:scale-[0.98]"
              href={`/product/${heroSlides[heroSlide].product.slug}`}
            >
              Shop this pair <ArrowRight size={14} />
            </Link>
            <a
              className="flex items-center justify-center border border-white/55 bg-transparent py-4 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] text-white hover:bg-white/10 active:scale-[0.98] transition-all"
              href="#shop"
            >
              Explore all eyewear
            </a>
          </div>
        </div>

        {/* Discover + slide dots — pinned above marquee */}
        <div className="mx-auto w-full max-w-[1360px] px-5 pb-3 sm:px-8 sm:pb-4 md:px-10 flex flex-wrap items-center justify-between gap-3 pr-16 sm:pr-8">
          <a
            className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] text-white/85 hover:text-white"
            href="#shop"
          >
            Discover the collection <ArrowDown size={13} />
          </a>
          <div className="flex items-center gap-2">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setHeroSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  idx === heroSlide ? 'w-6 bg-[#f1c092]' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Marquee Ticker */}
        <div className="relative z-10 w-full overflow-hidden border-t border-white/15 bg-black/60 backdrop-blur-md py-2.5 sm:py-3 text-white">
          <div className="animate-marquee flex items-center">
            {[...marqueeItems, ...marqueeItems].map((item, idx) => (
              <div key={idx} className="flex shrink-0 items-center gap-2.5 sm:gap-3 px-3.5 sm:px-6">
                <span className="size-1.5 rounded-full bg-[#f1c092]" />
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.14em] uppercase text-white/90">
                  {item}
                </span>
                <span className="text-white/30 text-[10px]">·</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section id="shop" className="mx-auto max-w-[1360px] px-4 py-12 sm:px-6 sm:py-16 md:px-10 md:py-24">
        <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a65b27] dark:text-[#c77c43]">
              Real photography · Multi-view frames
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight">Find your frame</h2>
          </div>
          <label className="flex h-11 w-full items-center gap-2 border-b border-[#bdb5aa] dark:border-[#39322d] sm:max-w-[280px]">
            <Search size={18} className="shrink-0 text-[#716b62] dark:text-[#b8afa4]" />
            <span className="sr-only">Search eyewear</span>
            <input
              className="w-full bg-transparent text-[12px] sm:text-[13px] outline-none placeholder:text-[#8b857c] dark:placeholder:text-[#8c8378] focus-visible:ring-0"
              placeholder="Search men, women, kids, shapes"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>

        {/* Category Filters including Kids */}
        <div className="mb-7 flex flex-wrap gap-2" role="group" aria-label="Filter products">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`min-h-10 border px-4 text-[9px] font-semibold uppercase tracking-[0.12em] transition-colors ${
                filter === item
                  ? 'border-[#201e1b] dark:border-[#a65b27] bg-[#201e1b] dark:bg-[#a65b27] text-white'
                  : 'border-[#c9c1b6] dark:border-[#39322d] text-[#201e1b] dark:text-[#ded7cc] hover:border-[#201e1b] dark:hover:border-white/60'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {shownProducts.length ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 lg:gap-y-10">
            {shownProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={addToBag}
                onFavorite={toggleFavorite}
                saved={favoriteIds.includes(product.id)}
                added={addedId === product.id}
              />
            ))}
          </div>
        ) : (
          <div className="border-y border-[#ded7cc] py-16 text-center">
            <p className="font-serif text-2xl">No frames found</p>
            <p className="mt-2 text-sm text-[#716b62]">Try a different category, shape, or search term.</p>
            <button
              className="mt-5 text-[10px] font-semibold uppercase tracking-[0.12em] underline underline-offset-4"
              onClick={() => {
                setFilter('All frames')
                setQuery('')
              }}
            >
              Clear filters
            </button>
          </div>
        )}

        {!showAll && filter === 'All frames' && !query && (
          <div className="mt-10 text-center">
            <button
              className="inline-flex min-h-11 items-center gap-3 border border-[#bdb5aa] px-5 text-[10px] font-semibold uppercase tracking-[0.12em] hover:border-[#201e1b]"
              onClick={() => setShowAll(true)}
            >
              See all {products.length} frames <ArrowRight size={14} />
            </button>
          </div>
        )}
      </section>

      {/* Store Collection Info */}
      <section id="collection" className="bg-[#eae3d9] dark:bg-[#1a1716] px-4 py-12 sm:px-6 sm:py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1360px] gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-20">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a65b27] dark:text-[#c77c43]">
              A better way to shop locally
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.05]">
              Shop online.
              <br />
              <em className="text-[#a65b27] dark:text-[#c77c43]">Collect in store.</em>
            </h2>
            <p className="mt-4 sm:mt-5 max-w-[420px] text-[13px] leading-6 text-[#716b62] dark:text-[#b8afa4]">
              Reserve your favourite frames online and choose when to pick them up at our Vadodara store. Your order will be prepared and ready for your visit.
            </p>
            <Link
              className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold text-[#716b62] dark:text-[#ded7cc] underline underline-offset-4 hover:text-[#a65b27] dark:hover:text-[#c77c43]"
              href="/store"
            >
              Visit us near Mandvi Bus Stand <ArrowRight size={14} />
            </Link>
          </div>
          <ol className="grid gap-0 sm:grid-cols-2">
            {[
              ['01', 'Browse', 'Find a frame that fits your style and facial proportions.'],
              ['02', 'Reserve', 'Choose a collection date and pay in full, deposit, or at store.'],
              ['03', 'Visit', 'Come to the 99 Goggles store in Vadodara.'],
              ['04', 'Collect', 'Staff will verify your reference, fit your frame, and hand it over.'],
            ].map(([number, title, text]) => (
              <li
                className="border-t border-[#cfc6ba] dark:border-[#312b26] py-5 sm:px-5 first:sm:pl-0 sm:odd:border-r sm:odd:border-[#cfc6ba] sm:odd:dark:border-[#312b26] sm:odd:pl-0 sm:even:pr-0"
                key={number}
              >
                <p className="text-[10px] font-semibold tracking-[0.12em] text-[#a65b27] dark:text-[#c77c43]">{number}</p>
                <h3 className="mt-2 font-serif text-[22px] sm:text-[25px] text-[#201e1b] dark:text-[#f4eee5]">{title}</h3>
                <p className="mt-1 max-w-[280px] text-[12px] leading-5 text-[#716b62] dark:text-[#b8afa4]">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Trust & Assurance Bar (Moved down to standard pre-footer position) */}
      <section className="border-t border-[#ded7cc] dark:border-[#312b26] bg-[#eee8df] dark:bg-[#1a1716] py-10 sm:py-12">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            <div className="flex items-start gap-3.5">
              <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[#a65b27]/10 dark:bg-[#a65b27]/25 text-[#a65b27] dark:text-[#f1c092]">
                <CalendarCheck size={20} strokeWidth={1.75} />
              </div>
              <div>
                <h4 className="text-[13px] font-semibold text-[#201e1b] dark:text-[#f4eee5]">Reserve online</h4>
                <p className="mt-1 text-[11px] leading-relaxed text-[#777169] dark:text-[#b8afa4]">
                  Pick your collection date and time without waiting in queues.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[#a65b27]/10 dark:bg-[#a65b27]/25 text-[#a65b27] dark:text-[#f1c092]">
                <CreditCard size={20} strokeWidth={1.75} />
              </div>
              <div>
                <h4 className="text-[13px] font-semibold text-[#201e1b] dark:text-[#f4eee5]">Pay your way</h4>
                <p className="mt-1 text-[11px] leading-relaxed text-[#777169] dark:text-[#b8afa4]">
                  Flexible options: small deposit, full online, or pay at our store.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[#a65b27]/10 dark:bg-[#a65b27]/25 text-[#a65b27] dark:text-[#f1c092]">
                <MapPin size={20} strokeWidth={1.75} />
              </div>
              <div>
                <h4 className="text-[13px] font-semibold text-[#201e1b] dark:text-[#f4eee5]">Try in person</h4>
                <p className="mt-1 text-[11px] leading-relaxed text-[#777169] dark:text-[#b8afa4]">
                  Visit our store near Mandvi Bus Stand in Vadodara for free fit adjustments.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[#a65b27]/10 dark:bg-[#a65b27]/25 text-[#a65b27] dark:text-[#f1c092]">
                <Smile size={20} strokeWidth={1.75} />
              </div>
              <div>
                <h4 className="text-[13px] font-semibold text-[#201e1b] dark:text-[#f4eee5]">Kids & adults</h4>
                <p className="mt-1 text-[11px] leading-relaxed text-[#777169] dark:text-[#b8afa4]">
                  Dedicated fits for all ages — from fashion sunglasses to flexible kids frames.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#312b26] bg-[#201e1b] dark:bg-[#12100f] text-[#ded7cc] px-4 pt-8 pb-6 sm:px-6 sm:pb-6 md:px-10">
        <div className="mx-auto max-w-[1360px]">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 pb-8 border-b border-[#312b26]">
            {/* Col 1: Brand & Store Location */}
            <div className="space-y-4">
              <a className="inline-block font-serif text-[28px] tracking-[-0.07em] text-[#f7f4ef]" href="#top">
                99<span className="text-[#c77c43]">.</span>goggles
              </a>
              <p className="text-[12px] leading-relaxed text-[#bbb4aa] max-w-[280px]">
                Real eyewear photography, transparent prices starting at ₹99, and local store collection in Vadodara.
              </p>
              <div className="space-y-2 pt-2 text-[11px] text-[#bbb4aa]">
                <p className="flex items-start gap-2">
                  <MapPin size={15} className="shrink-0 text-[#c77c43] mt-0.5" />
                  <span>Near Mandvi Bus Stand, Vadodara, Gujarat</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock size={15} className="shrink-0 text-[#c77c43]" />
                  <span>Mon – Sat: 10:00 AM – 9:00 PM</span>
                </p>
              </div>
            </div>

            {/* Col 2: Eyewear Collections */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f1c092]">Eyewear</p>
              <ul className="mt-4 space-y-2.5 text-[12px]">
                <li><a className="transition-colors hover:text-white" href="/#shop">All frames</a></li>
                <li><a className="transition-colors hover:text-white" href="/?category=Sunglasses#shop">Fashion Sunglasses</a></li>
                <li><a className="transition-colors hover:text-white" href="/?category=Eyeglasses#shop">Eyeglasses</a></li>
                <li><a className="transition-colors hover:text-white" href="/?category=Women#shop">Women's Collection</a></li>
                <li><a className="transition-colors hover:text-white" href="/?category=Men#shop">Men's Collection</a></li>
                <li><a className="transition-colors hover:text-white" href="/?category=Kids#shop">Kids' Shatterproof Frames</a></li>
                <li><a className="transition-colors hover:text-white" href="/?category=New%20arrivals#shop">New Arrivals</a></li>
              </ul>
            </div>

            {/* Col 3: Services & Store */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f1c092]">Store & Services</p>
              <ul className="mt-4 space-y-2.5 text-[12px]">
                <li><a className="transition-colors hover:text-white" href="/store">Visit our Vadodara store</a></li>
                <li><a className="transition-colors hover:text-white" href="/#collection">How online reservation works</a></li>
                <li><a className="transition-colors hover:text-white" href="/other-products">Cleaning kits & cases</a></li>
                <li><a className="transition-colors hover:text-white" href="/journal">Eyewear Care Journal</a></li>
                <li><a className="transition-colors hover:text-white" href="/admin">Staff desk & Orders</a></li>
              </ul>
            </div>

            {/* Col 4: Customer Care & Quick Order */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f1c092]">Customer Care</p>
              <ul className="mt-4 space-y-2.5 text-[12px]">
                <li><a className="transition-colors hover:text-white" href="/cart">Your shopping bag</a></li>
                <li><a className="transition-colors hover:text-white" href="/account">Account & order history</a></li>
                <li><a className="transition-colors hover:text-white" href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer">Order via WhatsApp</a></li>
                <li><span className="text-[#888177]">Free in-person fitting & alignment</span></li>
                <li><span className="text-[#888177]">Same-day reserve & pickup</span></li>
              </ul>
            </div>
          </div>

          {/* Sub-bar */}
          <div className="flex flex-col gap-2 pt-3 sm:flex-row sm:items-center sm:justify-between text-[9px] text-[#6e6860]">
            <p>© 2026 99 Goggles · Vadodara, Gujarat · Real eyewear collection</p>
            <div className="flex items-center gap-4">
              <span>Cash · UPI · Cards · Pay at Store</span>
              <a
                href="#top"
                className="inline-flex items-center gap-1 text-white/60 hover:text-white transition-colors"
                aria-label="Back to top"
              >
                <span>Back to top</span>
                <ArrowUp size={11} />
              </a>
            </div>
          </div>

          {/* Powered-by tag */}
          <div className="mt-4 border-t border-white/5 pt-4 flex flex-col items-center gap-1 text-center">
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#f1c092]">
              Powered by{' '}
              <a
                href="https://www.owatech-ai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-white transition-colors"
              >
                OWA Technologies
              </a>
            </p>
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/80">
              [
              <a
                href="https://wa.me/918141198389"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#f1c092] transition-colors"
              >
                Samuel T Samoyo-(LYKART06)
              </a>
              ]
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}