'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef, useTransition, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Check, ChevronLeft, ChevronRight, Heart, ShoppingBag, Store } from 'lucide-react'
import { formatPrice, type Product } from '@/lib/products'
import { readCart, readFavorites, writeCart, writeFavorites } from '@/lib/storefront'
import { StorefrontHeader } from './header'

function getOrientationLabel(img: string, idx: number): string {
  if (img.includes('front')) return 'Front View'
  if (img.includes('side')) return 'Side Profile (45°)'
  if (img.includes('flatlay')) return 'Frame Detail & Flatlay'
  if (img.includes('indian-') || img.includes('woman') || img.includes('man') || img.includes('kids') || img.includes('couple') || img.includes('senior')) {
    return 'On-Face Lifestyle'
  }
  return `View ${idx + 1}`
}

function getThumbTag(img: string): string {
  if (img.includes('front')) return 'Front'
  if (img.includes('side')) return 'Side'
  if (img.includes('flatlay')) return 'Detail'
  return 'Look'
}


export function ProductDetail({ product }: { product: Product }) {
  const router = useRouter()
  const [, startTransition] = useTransition()

  // Color selection
  const defaultColor = product.colorVariants?.[0]?.color ?? product.frameColor
  const [selectedColor, setSelectedColor] = useState<string>(defaultColor)

  // Sync with URL ?color= param from card click to guarantee exact pic
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const colorParam = params.get('color')
      if (colorParam) {
        const found = product.colorVariants?.find(
          (cv) => cv.color.toLowerCase() === colorParam.toLowerCase()
        )
        if (found) {
          setSelectedColor(found.color)
          setImageIndex(0)
        }
      }
    }
  }, [product])

  const activeColorVariant = product.colorVariants?.find((cv) => cv.color === selectedColor) ?? product.colorVariants?.[0]
  const images = activeColorVariant?.images && activeColorVariant.images.length > 0
    ? activeColorVariant.images
    : product.images

  const [imageIndex, setImageIndex] = useState(0)
  const [size, setSize] = useState(product.variants[0]?.size ?? 'Medium')
  const [added, setAdded] = useState(false)
  const [saved, setSaved] = useState(false)

  // Touch swipe support
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.targetTouches[0].clientX
    touchEndX.current = null
  }

  function handleTouchMove(e: React.TouchEvent) {
    touchEndX.current = e.targetTouches[0].clientX
  }

  function handleTouchEnd() {
    if (touchStartX.current === null || touchEndX.current === null) return
    const distance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 45

    if (distance > minSwipeDistance) {
      // Swiped left -> Next view
      setImageIndex((curr) => (curr + 1) % images.length)
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> Previous view
      setImageIndex((curr) => (curr - 1 + images.length) % images.length)
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  function nextImage() {
    setImageIndex((curr) => (curr + 1) % images.length)
  }

  function prevImage() {
    setImageIndex((curr) => (curr - 1 + images.length) % images.length)
  }

  function handleColorChange(colorName: string) {
    setSelectedColor(colorName)
    setImageIndex(0) // Reset to front orientation of selected color
  }

  function addToBag() {
    const current = readCart()
    const existing = current.find((line) => line.productId === product.id && line.size === size)
    writeCart(existing
      ? current.map((line) => line.productId === product.id && line.size === size ? { ...line, quantity: line.quantity + 1 } : line)
      : [...current, { productId: product.id, quantity: 1, size }])
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1500)
  }

  function reserve() {
    const current = readCart()
    const existing = current.find((line) => line.productId === product.id && line.size === size)
    writeCart(existing
      ? current.map((line) => line.productId === product.id && line.size === size ? { ...line, quantity: line.quantity + 1 } : line)
      : [...current, { productId: product.id, quantity: 1, size }])
    startTransition(() => {
      router.push('/checkout')
    })
  }

  function toggleFavorite() {
    const current = readFavorites()
    const next = current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id]
    writeFavorites(next)
    setSaved(next.includes(product.id))
  }

  const discount = Math.round((1 - product.price / product.compareAtPrice) * 100)
  const currentImage = images[imageIndex] ?? images[0]
  const currentLabel = getOrientationLabel(currentImage, imageIndex)
  const isProductShot = currentImage.includes('frame-') || currentImage.includes('glasses-flatlay')

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#201e1b]">
      <StorefrontHeader />
      <div className="mx-auto max-w-[1280px] px-5 py-7 md:px-10 md:py-10">
        <Link className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#716b62] hover:text-[#a65b27]" href="/#shop">
          <ArrowLeft size={14} /> Back to frames
        </Link>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:gap-14">
          {/* Gallery with swipe & orientation switching */}
          <div className="grid gap-3 sm:grid-cols-[76px_1fr]">
            {/* Thumbnails */}
            <div className="order-2 flex gap-2 overflow-x-auto pb-1 sm:order-1 sm:flex-col sm:overflow-visible sm:pb-0">
              {images.map((img, idx) => {
                const isThumbProduct = img.includes('frame-') || img.includes('glasses-flatlay')
                return (
                  <button
                    key={`${product.id}-thumb-${idx}`}
                    className={`group relative aspect-square w-[68px] shrink-0 overflow-hidden border-2 bg-[#e9e2d8] transition-all ${
                      imageIndex === idx ? 'border-[#a65b27] shadow-sm' : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                    aria-label={`View ${getOrientationLabel(img, idx)}`}
                    aria-pressed={imageIndex === idx}
                    onClick={() => setImageIndex(idx)}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      sizes="68px"
                      className={isThumbProduct ? 'object-contain p-1.5 object-center' : 'object-cover object-center'}
                    />
                    <span className="absolute bottom-0 inset-x-0 bg-black/60 px-1 py-0.5 text-[8px] font-medium text-white truncate text-center">
                      {getThumbTag(img)}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Main Interactive Swipable Viewer */}
            <div
              className="relative order-1 aspect-[.9] select-none overflow-hidden bg-[#e9e2d8] sm:order-2 sm:aspect-[.84]"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                src={currentImage}
                alt={`${product.name} in ${selectedColor} - ${currentLabel}`}
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, 60vw"
                className={
                  isProductShot
                    ? 'object-contain p-4 sm:p-7 object-center transition-opacity duration-300'
                    : 'object-cover object-center transition-opacity duration-300'
                }
              />

              {/* Orientation Tag */}
              <div className="absolute top-3 left-3 flex items-center gap-2 bg-[#f7f4ef]/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#201e1b] backdrop-blur-sm shadow-sm">
                <span>{currentLabel}</span>
                <span className="text-[#a65b27]">•</span>
                <span className="text-[#716b62]">{imageIndex + 1}/{images.length}</span>
              </div>

              {/* Prev / Next Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    aria-label="Previous view / orientation"
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 grid size-9 place-items-center rounded-full bg-[#f7f4ef]/90 text-[#201e1b] shadow-md backdrop-blur-sm transition-transform hover:scale-110 active:scale-95"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={nextImage}
                    aria-label="Next view / orientation"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 grid size-9 place-items-center rounded-full bg-[#f7f4ef]/90 text-[#201e1b] shadow-md backdrop-blur-sm transition-transform hover:scale-110 active:scale-95"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              {/* Swipe indicator dots */}
              {images.length > 1 && (
                <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-1.5">
                  {images.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      aria-label={`Go to view ${dotIdx + 1}`}
                      onClick={() => setImageIndex(dotIdx)}
                      className={`h-1.5 rounded-full transition-all ${
                        imageIndex === dotIdx ? 'w-6 bg-[#a65b27]' : 'w-1.5 bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product details & options */}
          <section className="lg:sticky lg:top-[110px] lg:h-fit">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#a65b27]">
                {product.category}
              </span>
              <span className="text-[9px] text-[#89837a]">/</span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#716b62]">
                {product.gender}
              </span>
              <span className="text-[9px] text-[#89837a]">/</span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#716b62]">
                {product.frameShape}
              </span>
            </div>

            <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">{product.name}</h1>
            <p className="mt-2 text-[12px] text-[#716b62]">
              {selectedColor} · {product.frameShape} profile · {product.lensColor}
            </p>

            <div className="mt-5 flex items-center gap-3">
              <span className="text-[22px] font-semibold">{formatPrice(product.price)}</span>
              {product.compareAtPrice > product.price && (
                <>
                  <span className="text-[13px] text-[#89837a] line-through">{formatPrice(product.compareAtPrice)}</span>
                  <span className="bg-[#e6d5c3] px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#81431d]">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            <p className="mt-6 max-w-[480px] text-[13px] leading-6 text-[#716b62]">{product.description}</p>

            {/* Frame Colours Switcher */}
            {product.colorVariants && product.colorVariants.length > 0 && (
              <div className="mt-7">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.13em]">
                    Select frame colour: <span className="font-normal normal-case text-[#716b62] dark:text-[#b8afa4]">{selectedColor}</span>
                  </p>
                  <span className="text-[9px] text-[#a65b27] font-medium">Click to switch views</span>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-2.5">
                  {product.colorVariants.map((cv) => {
                    const isSelected = cv.color === selectedColor
                    return (
                      <button
                        key={cv.color}
                        type="button"
                        onClick={() => handleColorChange(cv.color)}
                        className={`inline-flex items-center gap-2 border px-3 py-2 text-[11px] font-medium transition-all ${
                          isSelected
                            ? 'border-[#a65b27] bg-[#f2e9df] dark:bg-[#2e2620] text-[#201e1b] dark:text-[#f4eee5] ring-1 ring-[#a65b27]'
                            : 'border-[#c9c1b6] dark:border-[#39322d] bg-transparent text-[#5c564e] dark:text-[#b8afa4] hover:border-[#201e1b] dark:hover:border-white/60'
                        }`}
                        aria-pressed={isSelected}
                      >
                        <span
                          className="size-3.5 rounded-full border border-black/20 dark:border-white/50 shadow-inner"
                          style={{ backgroundColor: cv.hex }}
                        />
                        {cv.color}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Frame Size Selector */}
            <label className="mt-5 block max-w-[220px] text-[9px] font-semibold uppercase tracking-[0.13em]">
              Frame size
              <select
                className="mt-2 h-11 w-full border border-[#c9c1b6] bg-transparent px-3 text-[12px] normal-case tracking-normal"
                value={size}
                onChange={(event) => setSize(event.target.value)}
              >
                {product.sizes.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            {/* Action buttons */}
            <div className="mt-7 grid gap-3 sm:grid-cols-[1fr_auto]">
              <button
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#201e1b] px-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#3d3933]"
                onClick={addToBag}
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
              <button
                className="grid min-h-12 place-items-center border border-[#c9c1b6] px-4 hover:border-[#201e1b]"
                aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
                aria-pressed={saved}
                onClick={toggleFavorite}
              >
                <Heart size={18} fill={saved ? '#a65b27' : 'none'} className={saved ? 'text-[#a65b27]' : ''} />
              </button>
            </div>

            <button
              className="mt-3 min-h-12 w-full bg-[#a65b27] px-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#81431d]"
              onClick={reserve}
            >
              Reserve &amp; collect
            </button>

            {/* Vadodara store collection notice */}
            <div className="mt-6 flex gap-3 border-y border-[#ded7cc] py-4">
              <Store size={17} className="mt-0.5 shrink-0 text-[#a65b27]" />
              <div>
                <p className="text-[11px] font-semibold">Collect from our Vadodara store</p>
                <p className="mt-1 text-[10px] leading-4 text-[#716b62]">
                  Choose your collection date at checkout. Try this frame on in person before finalizing.
                </p>
              </div>
            </div>

            <p className="mt-4 text-[9px] leading-4 text-[#8b857c]">
              Real product images shown with front and orientation views. Visit the store near Mandvi Bus Stand for prescription lens fitting.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}