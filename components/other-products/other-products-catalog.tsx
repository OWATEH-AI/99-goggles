'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CircleDot, MessageCircle, Shirt, Sparkles } from 'lucide-react'
import { formatPrice } from '@/lib/products'
import { otherProductCategories, type OtherProduct, type OtherProductCategory } from '@/lib/other-products'
import { readOtherProducts, STOREFRONT_UPDATED } from '@/lib/storefront'
import { STORE_WHATSAPP_URL, WHATSAPP_NUMBER } from '@/lib/store-info'
import { StorefrontHeader } from '@/components/storefront/header'

const categoryIcons = { Caps: Shirt, Belts: CircleDot, Perfumes: Sparkles }

function AccessoryArtwork({ item }: { item: OtherProduct }) {
  if (item.image) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#e9e2d8] dark:bg-[#24201c]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    )
  }

  const Icon = categoryIcons[item.category]
  if (item.category !== 'Perfumes') {
    return (
      <div className="grid h-full w-full place-items-center bg-[#eee9e1] dark:bg-[#24201c] text-[#837465] dark:text-[#b8afa4]">
        <Icon size={48} strokeWidth={1.2} aria-hidden="true" />
      </div>
    )
  }

  const bottleColor = item.name.toLowerCase().includes('oud') ? '#68503d' : '#ae8051'

  return (
    <div className="grid h-full w-full place-items-center bg-[#eee9e1] dark:bg-[#24201c]">
      <svg aria-hidden="true" viewBox="0 0 160 160" className="h-28 w-28">
        <path d="M66 20h28v18H66z" fill="#3b3731" />
        <path d="M71 38h18v16l17 12v64c0 7-5 12-12 12H66c-7 0-12-5-12-12V66l17-12z" fill={bottleColor} />
        <path d="M66 82h28v34H66z" fill="#eee4d5" />
        <path d="M72 93h16M72 100h16M72 107h11" stroke="#70533b" strokeLinecap="round" strokeWidth="2" />
        <path d="M59 69h42" stroke="#d9c4a8" strokeWidth="2" />
      </svg>
    </div>
  )
}

export function OtherProductsCatalog() {
  const [items, setItems] = useState<OtherProduct[]>([])
  const [category, setCategory] = useState<OtherProductCategory>('Caps')

  useEffect(() => {
    const refresh = () => setItems(readOtherProducts())
    refresh()
    window.addEventListener(STOREFRONT_UPDATED, refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener(STOREFRONT_UPDATED, refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [])

  const visibleItems = items.filter((item) => item.category === category && item.status === 'active')
  const Icon = categoryIcons[category]
  const messageLink = (item: OtherProduct) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      `Hi 99 Goggles, is the ${item.name} (${item.sku}) available for collection at the Vadodara store?`
    )}`

  return (
    <main className="min-h-screen bg-[#f7f4ef] dark:bg-[#171514] text-[#201e1b] dark:text-[#f4eee5]">
      <StorefrontHeader />
      <div className="mx-auto max-w-[1260px] px-5 py-9 md:px-10 md:py-14">
        <div className="flex flex-col justify-between gap-5 border-b border-[#ded7cc] dark:border-[#39322d] pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.19em] text-[#a65b27] dark:text-[#e09761]">
              More from 99 Goggles
            </p>
            <h1 className="mt-2 font-serif text-4xl sm:text-5xl text-[#201e1b] dark:text-[#f4eee5]">
              Other products
            </h1>
            <p className="mt-3 max-w-[520px] text-[12px] leading-5 text-[#716b62] dark:text-[#b8afa4]">
              Browse accessories alongside your eyewear. Ask us about an item and reserve it for collection from the Vadodara store.
            </p>
          </div>
          <Link
            className="inline-flex min-h-10 w-fit items-center border border-[#c9c1b6] dark:border-[#39322d] px-4 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#201e1b] dark:text-[#f4eee5] hover:border-[#201e1b] dark:hover:border-white transition-colors"
            href="/store"
          >
            Store details
          </Link>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Other product categories">
          {otherProductCategories.map((item) => (
            <button
              key={item}
              role="tab"
              aria-selected={category === item}
              className={`min-h-11 shrink-0 border px-5 text-[9px] font-semibold uppercase tracking-[0.12em] transition-colors ${
                category === item
                  ? 'border-[#201e1b] bg-[#201e1b] text-white dark:border-[#f4eee5] dark:bg-[#f4eee5] dark:text-[#171514]'
                  : 'border-[#c9c1b6] text-[#201e1b] hover:border-[#201e1b] dark:border-[#39322d] dark:text-[#f4eee5] dark:hover:border-white'
              }`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-b border-[#ded7cc] dark:border-[#39322d] pb-3">
          <div>
            <h2 className="font-serif text-2xl text-[#201e1b] dark:text-[#f4eee5]">{category}</h2>
            <p className="mt-1 text-[10px] text-[#817a70] dark:text-[#a89f94]">
              {visibleItems.length ? `${visibleItems.length} items · available in-store` : 'New additions will appear here'}
            </p>
          </div>
          <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#a65b27] dark:text-[#e09761]">
            In-store collection
          </span>
        </div>

        {visibleItems.length ? (
          <div className="grid grid-cols-2 gap-3.5 py-6 sm:grid-cols-3 lg:grid-cols-4">
            {visibleItems.map((item) => (
              <article
                className="group flex flex-col justify-between overflow-hidden border border-[#e0dacf] dark:border-[#39322d] bg-[#fbf9f5] dark:bg-[#1e1b19] transition-all duration-200 hover:shadow-lg dark:hover:border-[#524840]"
                key={item.id}
              >
                <div className="relative aspect-[1.08] w-full overflow-hidden bg-[#eee9e1] dark:bg-[#24201c]">
                  <AccessoryArtwork item={item} />
                  <span className="absolute left-2.5 top-2.5 bg-[#f7f4ef]/95 dark:bg-[#1e1b19]/95 px-2 py-0.5 text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.12em] text-[#a65b27] dark:text-[#f1c092] shadow-sm backdrop-blur-sm">
                    {category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-[13px] sm:text-[14px] font-semibold text-[#201e1b] dark:text-[#f4eee5] leading-snug">
                        {item.name}
                      </h3>
                      <span className="text-[13px] sm:text-[14px] font-semibold text-[#201e1b] dark:text-[#f4eee5] shrink-0">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                    <p className="mt-1.5 min-h-[34px] text-[10.5px] sm:text-[11px] leading-4 text-[#716b62] dark:text-[#b8afa4]">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#ded7cc]/70 dark:border-[#39322d]">
                    <div className="mb-2.5 flex items-center justify-between text-[9px] text-[#817a70] dark:text-[#a89f94]">
                      <span>SKU: {item.sku}</span>
                      <span className="flex items-center gap-1 font-medium text-[#437339] dark:text-[#88b97e]">
                        <span className="inline-block size-1.5 rounded-full bg-[#437339] dark:bg-[#88b97e]" />
                        In stock ({item.stock})
                      </span>
                    </div>

                    <a
                      href={messageLink(item)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex min-h-10 w-full items-center justify-center gap-2 border border-[#201e1b] bg-[#201e1b] text-white transition-all hover:bg-[#a65b27] hover:border-[#a65b27] dark:border-[#4a4239] dark:bg-[#2e2620] dark:text-[#f4eee5] dark:hover:bg-[#a65b27] dark:hover:border-[#a65b27] dark:hover:text-white px-3 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.1em] active:scale-[0.99]"
                    >
                      <MessageCircle size={14} /> Ask on WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="grid min-h-[250px] place-items-center border-b border-[#ded7cc] dark:border-[#39322d] text-center">
            <div className="py-8">
              <Icon className="mx-auto text-[#a65b27] dark:text-[#e09761]" size={34} strokeWidth={1.2} />
              <p className="mt-4 font-serif text-2xl text-[#201e1b] dark:text-[#f4eee5]">{category} are coming soon</p>
              <p className="mt-2 max-w-[330px] text-[11px] leading-5 text-[#716b62] dark:text-[#b8afa4]">
                The store team can add new {category.toLowerCase()} in the admin catalog when they are ready.
              </p>
              <a
                className="mt-5 inline-flex min-h-10 items-center border border-[#c9c1b6] dark:border-[#39322d] px-4 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#201e1b] dark:text-[#f4eee5] hover:border-[#201e1b] dark:hover:border-white transition-colors"
                href={STORE_WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
              >
                Ask the store
              </a>
            </div>
          </div>
        )}

        <p className="mt-6 text-[9px] leading-4 text-[#817a70] dark:text-[#a89f94]">
          Product selection and stock shown here are available at our Vadodara store. Message us on WhatsApp to confirm immediate availability before visiting.
        </p>
      </div>
    </main>
  )
}