'use client'

import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'
import { ArrowLeft, Eye, EyeOff, Plus, Store, Trash2 } from 'lucide-react'
import { formatPrice } from '@/lib/products'
import { otherProductCategories, type OtherProduct, type OtherProductCategory } from '@/lib/other-products'
import { readOtherProducts, STOREFRONT_UPDATED, writeOtherProducts } from '@/lib/storefront'

export default function Page() {
  const [items, setItems] = useState<OtherProduct[]>([])
  const [message, setMessage] = useState('')

  useEffect(() => setItems(readOtherProducts()), [])

  function persist(next: OtherProduct[]) {
    setItems(next)
    writeOtherProducts(next)
  }

  function addItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const category = String(form.get('category')) as OtherProductCategory
    const name = String(form.get('name')).trim()
    const item: OtherProduct = {
      id: `accessory-${Date.now()}`,
      sku: `99G-${category.slice(0, -1).toUpperCase()}-${String(Date.now()).slice(-5)}`,
      name,
      category,
      description: String(form.get('description')).trim(),
      price: Number(form.get('price')),
      stock: Number(form.get('stock')),
      status: 'active',
      source: 'admin',
      image: String(form.get('image') || '').trim() || undefined,
    }
    persist([item, ...items])
    event.currentTarget.reset()
    setMessage(`${name} was added to the ${category} catalog.`)
  }

  function updateItem(id: string, changes: Partial<OtherProduct>) {
    persist(items.map((item) => item.id === id ? { ...item, ...changes } : item))
  }

  function removeItem(item: OtherProduct) {
    if (item.source !== 'admin') return
    persist(items.filter((current) => current.id !== item.id))
  }

  return (
    <main className="min-h-screen bg-[#f4f2ed] dark:bg-[#171514] text-[#201e1b] dark:text-[#f4eee5]">
      <header className="border-b border-[#dedbd3] dark:border-[#39322d] bg-white dark:bg-[#1e1b19]">
        <div className="mx-auto flex min-h-[70px] max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-7">
          <Link className="flex items-center gap-3" href="/admin">
            <span className="grid size-9 place-items-center bg-[#eee9e1] dark:bg-[#24201c] text-[#a65b27] dark:text-[#f1c092]">
              <Store size={18} />
            </span>
            <span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.14em]">99 Goggles</span>
              <span className="mt-1 block text-[9px] text-[#777169] dark:text-[#b8afa4]">Other products · admin</span>
            </span>
          </Link>
          <Link
            className="inline-flex min-h-10 items-center gap-2 border border-[#d8d4cb] dark:border-[#39322d] px-3 text-[9px] font-semibold uppercase tracking-[0.1em] hover:border-[#201e1b] dark:hover:border-white transition-colors"
            href="/admin"
          >
            <ArrowLeft size={14} /> Collection desk
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1200px] px-4 py-7 sm:px-7 sm:py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#a65b27] dark:text-[#e09761]">
              Catalog management · prototype
            </p>
            <h1 className="mt-2 font-serif text-4xl">Other products</h1>
            <p className="mt-2 text-[11px] text-[#777169] dark:text-[#b8afa4]">
              Manage Caps, Belts, and Perfumes shown in the customer catalog.
            </p>
          </div>
          <Link
            className="inline-flex min-h-10 items-center border border-[#c9c1b6] dark:border-[#39322d] px-4 text-[9px] font-semibold uppercase tracking-[0.1em] hover:border-[#201e1b] dark:hover:border-white transition-colors"
            href="/other-products"
          >
            View customer page
          </Link>
        </div>

        <form
          className="mt-7 grid gap-4 bg-white dark:bg-[#1e1b19] border border-[#dedbd3] dark:border-[#39322d] p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-[140px_1fr_1.3fr_110px_90px_1.2fr_auto] lg:items-end"
          onSubmit={addItem}
        >
          <label className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#777169] dark:text-[#b8afa4]">
            Category
            <select
              className="mt-2 h-11 w-full border border-[#dedbd3] dark:border-[#39322d] bg-white dark:bg-[#221e1b] px-3 text-[11px] text-[#201e1b] dark:text-[#f4eee5]"
              name="category"
            >
              {otherProductCategories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </label>
          <label className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#777169] dark:text-[#b8afa4]">
            Product name
            <input
              className="mt-2 h-11 w-full border border-[#dedbd3] dark:border-[#39322d] bg-white dark:bg-[#221e1b] px-3 text-[11px] text-[#201e1b] dark:text-[#f4eee5]"
              name="name"
              required
            />
          </label>
          <label className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#777169] dark:text-[#b8afa4]">
            Description
            <input
              className="mt-2 h-11 w-full border border-[#dedbd3] dark:border-[#39322d] bg-white dark:bg-[#221e1b] px-3 text-[11px] text-[#201e1b] dark:text-[#f4eee5]"
              name="description"
              required
            />
          </label>
          <label className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#777169] dark:text-[#b8afa4]">
            Price (₹)
            <input
              className="mt-2 h-11 w-full border border-[#dedbd3] dark:border-[#39322d] bg-white dark:bg-[#221e1b] px-3 text-[11px] text-[#201e1b] dark:text-[#f4eee5]"
              name="price"
              type="number"
              min="1"
              step="1"
              required
            />
          </label>
          <label className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#777169] dark:text-[#b8afa4]">
            Stock
            <input
              className="mt-2 h-11 w-full border border-[#dedbd3] dark:border-[#39322d] bg-white dark:bg-[#221e1b] px-3 text-[11px] text-[#201e1b] dark:text-[#f4eee5]"
              name="stock"
              type="number"
              min="0"
              step="1"
              required
            />
          </label>
          <label className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#777169] dark:text-[#b8afa4]">
            Image URL (optional)
            <input
              className="mt-2 h-11 w-full border border-[#dedbd3] dark:border-[#39322d] bg-white dark:bg-[#221e1b] px-3 text-[11px] text-[#201e1b] dark:text-[#f4eee5]"
              name="image"
              placeholder="/images/... or https://"
            />
          </label>
          <button className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#201e1b] dark:bg-[#2e2620] border border-transparent dark:border-[#39322d] px-4 text-[9px] font-semibold uppercase tracking-[0.1em] text-white hover:bg-[#a65b27] dark:hover:bg-[#a65b27] transition-colors">
            <Plus size={14} /> Add item
          </button>
          <p className="text-[9px] text-[#437339] dark:text-[#88b97e] sm:col-span-2 lg:col-span-full" role="status">
            {message}
          </p>
        </form>

        <section className="mt-7 bg-white dark:bg-[#1e1b19] border border-[#dedbd3] dark:border-[#39322d]">
          <div className="flex items-center justify-between border-b border-[#e5e1d9] dark:border-[#39322d] px-4 py-4 sm:px-5">
            <h2 className="font-serif text-2xl">Catalog items</h2>
            <span className="text-[9px] uppercase tracking-[0.1em] text-[#777169] dark:text-[#b8afa4]">
              {items.length} total
            </span>
          </div>
          <div className="divide-y divide-[#e5e1d9] dark:divide-[#39322d]">
            {items.map((item) => (
              <article
                className="grid gap-3 p-4 sm:grid-cols-[auto_1fr_110px_100px_auto_auto] sm:items-center sm:px-5"
                key={item.id}
              >
                <div className="relative size-12 shrink-0 overflow-hidden rounded border border-[#dedbd3] dark:border-[#39322d] bg-[#eee9e1] dark:bg-[#24201c] grid place-items-center">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-[9px] uppercase font-semibold text-[#837465] dark:text-[#b8afa4]">
                      {item.category.slice(0, 3)}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-[11px] font-semibold">
                    {item.name}{' '}
                    <span className="ml-2 text-[9px] font-normal uppercase tracking-[0.1em] text-[#a65b27] dark:text-[#f1c092]">
                      {item.category}
                    </span>
                  </p>
                  <p className="mt-1 text-[10px] text-[#777169] dark:text-[#b8afa4]">
                    {item.sku} · {item.description}
                  </p>
                </div>
                <label className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#777169] dark:text-[#b8afa4]">
                  Price (₹)
                  <input
                    aria-label={`${item.name} price`}
                    className="mt-1 h-9 w-full border border-[#dedbd3] dark:border-[#39322d] bg-white dark:bg-[#221e1b] px-2 text-[11px] font-normal normal-case tracking-normal text-[#201e1b] dark:text-[#f4eee5]"
                    type="number"
                    min="1"
                    step="1"
                    defaultValue={item.price}
                    onBlur={(event) => {
                      const price = Number(event.currentTarget.value)
                      if (price > 0 && price !== item.price) updateItem(item.id, { price })
                    }}
                  />
                </label>
                <label className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#777169] dark:text-[#b8afa4]">
                  Stock
                  <input
                    aria-label={`${item.name} stock`}
                    className="mt-1 h-9 w-full border border-[#dedbd3] dark:border-[#39322d] bg-white dark:bg-[#221e1b] px-2 text-[11px] font-normal normal-case tracking-normal text-[#201e1b] dark:text-[#f4eee5]"
                    type="number"
                    min="0"
                    step="1"
                    defaultValue={item.stock}
                    onBlur={(event) => {
                      const stock = Number(event.currentTarget.value)
                      if (stock >= 0 && stock !== item.stock) updateItem(item.id, { stock })
                    }}
                  />
                </label>
                <button
                  className="inline-flex min-h-10 items-center justify-center gap-2 border border-[#dedbd3] dark:border-[#39322d] px-3 text-[9px] font-semibold uppercase tracking-[0.08em] hover:border-[#201e1b] dark:hover:border-white transition-colors"
                  onClick={() => updateItem(item.id, { status: item.status === 'active' ? 'hidden' : 'active' })}
                >
                  {item.status === 'active' ? (
                    <>
                      <EyeOff size={14} /> Hide
                    </>
                  ) : (
                    <>
                      <Eye size={14} /> Publish
                    </>
                  )}
                </button>
                {item.source === 'admin' ? (
                  <button
                    className="grid size-10 place-items-center text-[#716b62] hover:text-[#9d392d]"
                    aria-label={`Remove ${item.name}`}
                    onClick={() => removeItem(item)}
                  >
                    <Trash2 size={15} />
                  </button>
                ) : (
                  <span className="text-center text-[9px] uppercase tracking-[0.08em] text-[#777169] dark:text-[#b8afa4]">
                    Catalog
                  </span>
                )}
              </article>
            ))}
            {items.length === 0 && (
              <p className="p-8 text-center text-[11px] text-[#777169] dark:text-[#b8afa4]">
                No items yet. Use the form above to add one.
              </p>
            )}
          </div>
        </section>
        <p className="mt-5 text-[9px] leading-5 text-[#777169] dark:text-[#b8afa4]">
          Changes are saved in this browser and appear on the public Other Products page. Connect a secured catalog API
          before managing live inventory.
        </p>
      </div>
    </main>
  )
}