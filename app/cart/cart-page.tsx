'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { StorefrontHeader } from '@/components/storefront/header'
import { formatPrice, products } from '@/lib/products'
import { cartTotal, readCart, STOREFRONT_UPDATED, writeCart, type CartLine } from '@/lib/storefront'

export function CartPage() {
  const [lines, setLines] = useState<CartLine[]>([])

  useEffect(() => {
    const refresh = () => setLines(readCart())
    refresh()
    window.addEventListener(STOREFRONT_UPDATED, refresh)
    return () => window.removeEventListener(STOREFRONT_UPDATED, refresh)
  }, [])

  function update(next: CartLine[]) {
    setLines(next)
    writeCart(next)
  }

  const total = cartTotal(lines, products)
  const validLines = lines.flatMap((line) => {
    const product = products.find((item) => item.id === line.productId)
    return product ? [{ ...line, product }] : []
  })

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#201e1b]">
      <StorefrontHeader />
      <div className="mx-auto max-w-[1120px] px-5 py-10 md:px-10 md:py-16">
        <Link className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#716b62]" href="/"><ArrowLeft size={14} /> Continue browsing</Link>
        <div className="mt-6 flex items-end justify-between border-b border-[#ded7cc] pb-5"><div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a65b27]">Your selection</p><h1 className="mt-2 font-serif text-4xl">Shopping bag</h1></div><span className="text-[11px] text-[#716b62]">{validLines.reduce((sum, line) => sum + line.quantity, 0)} items</span></div>
        {validLines.length === 0 ? <div className="py-20 text-center"><p className="font-serif text-3xl">Your bag is waiting</p><p className="mt-3 text-sm text-[#716b62]">Find a frame you love and reserve it for collection.</p><Link className="mt-7 inline-flex min-h-12 items-center bg-[#a65b27] px-6 text-[10px] font-semibold uppercase tracking-[0.12em] text-white" href="/#shop">Browse eyewear</Link></div> : <div className="grid gap-10 py-7 lg:grid-cols-[1fr_330px]">
          <div className="divide-y divide-[#ded7cc]">{validLines.map(({ product, quantity, size }) => {
            const selectedSize = size ?? product.variants[0]?.size ?? 'Medium'
            return <article className="grid grid-cols-[100px_1fr_auto] gap-4 py-5 first:pt-0 sm:grid-cols-[140px_1fr_auto] sm:gap-6" key={`${product.id}-${selectedSize}`}>
            <div className="relative aspect-[.9] overflow-hidden bg-[#e9e2d8]">
              <Image src={product.thumbnail || product.images[0]} alt={product.name} fill sizes="(max-width: 640px) 100px, 140px" className="object-cover object-center" />
            </div>
            <div className="flex min-w-0 flex-col justify-between py-1"><div><h2 className="text-[13px] font-semibold">{product.name}</h2><p className="mt-1 text-[11px] text-[#716b62]">{product.frameColor} · {product.frameShape} · {selectedSize}</p><p className="mt-3 text-[12px] font-semibold">{formatPrice(product.price)}</p></div><div className="mt-4 flex items-center gap-3"><div className="flex h-9 items-center border border-[#c9c1b6]"><button className="grid size-9 place-items-center" aria-label={`Decrease ${product.name} quantity`} onClick={() => update(lines.map((line) => line.productId === product.id && (line.size ?? selectedSize) === selectedSize ? { ...line, quantity: line.quantity - 1 } : line))}><Minus size={13} /></button><span className="w-7 text-center text-[11px]">{quantity}</span><button className="grid size-9 place-items-center" aria-label={`Increase ${product.name} quantity`} onClick={() => update(lines.map((line) => line.productId === product.id && (line.size ?? selectedSize) === selectedSize ? { ...line, quantity: line.quantity + 1 } : line))}><Plus size={13} /></button></div><button className="grid size-9 place-items-center text-[#716b62]" aria-label={`Remove ${product.name}`} onClick={() => update(lines.filter((line) => !(line.productId === product.id && (line.size ?? selectedSize) === selectedSize)))}><Trash2 size={15} /></button></div></div>
            <p className="pt-1 text-[12px] font-semibold">{formatPrice(product.price * quantity)}</p>
          </article>
          })}</div>
          <aside className="h-fit border-t border-[#ded7cc] pt-5 lg:border-t-0 lg:bg-[#eee9e1] lg:p-6"><h2 className="font-serif text-2xl">Collection summary</h2><p className="mt-3 text-[12px] leading-5 text-[#716b62]">Choose a collection date and payment option at checkout. Your items will be held for in-store collection in Vadodara.</p><div className="mt-6 flex justify-between border-t border-[#d4ccc0] pt-4 text-[13px]"><span>Order total</span><strong>{formatPrice(total)}</strong></div><p className="mt-2 text-[10px] leading-4 text-[#716b62]">No delivery service or payment provider is connected in this prototype.</p><Link className="mt-6 flex min-h-12 w-full items-center justify-center bg-[#a65b27] text-[10px] font-semibold uppercase tracking-[0.13em] text-white hover:bg-[#81431d]" href="/checkout">Continue to checkout</Link></aside>
        </div>}
      </div>
    </main>
  )
}