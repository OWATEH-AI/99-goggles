'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, Check, Search, Store } from 'lucide-react'
import { formatPrice } from '@/lib/products'
import { readReservations, STOREFRONT_UPDATED, writeReservations, type OrderStatus, type Reservation } from '@/lib/storefront'

const statusOrder: OrderStatus[] = ['Pending', 'Confirmed', 'Preparing', 'Ready for Collection', 'Collected', 'Cancelled']
const nextStatus: Partial<Record<OrderStatus, OrderStatus>> = {
  Pending: 'Confirmed',
  Confirmed: 'Preparing',
  Preparing: 'Ready for Collection',
  'Ready for Collection': 'Collected',
}

function dateLabel(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function CollectionDesk() {
  const [orders, setOrders] = useState<Reservation[]>([])
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All' | OrderStatus>('All')

  useEffect(() => {
    const refresh = () => setOrders(readReservations())
    refresh()
    window.addEventListener(STOREFRONT_UPDATED, refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener(STOREFRONT_UPDATED, refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [])

  const visibleOrders = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return orders.filter((order) => {
      const matchesStatus = statusFilter === 'All' || order.orderStatus === statusFilter
      const matchesQuery = !normalizedQuery || `${order.id} ${order.customerName} ${order.phone} ${order.items.map((item) => item.name).join(' ')}`.toLowerCase().includes(normalizedQuery)
      return matchesStatus && matchesQuery
    })
  }, [orders, query, statusFilter])

  function advance(order: Reservation) {
    const status = nextStatus[order.orderStatus]
    if (!status) return
    const now = new Date().toISOString()
    const updated: Reservation = {
      ...order,
      orderStatus: status,
      timeline: [...order.timeline, { status, at: now, actor: 'Store staff (prototype)' }],
      ...(status === 'Collected' ? { collectedBy: 'Store staff (prototype)', collectedAt: now } : {}),
    }
    const nextOrders = orders.map((item) => item.id === order.id ? updated : item)
    setOrders(nextOrders)
    writeReservations(nextOrders)
  }

  const pendingCount = orders.filter((order) => order.orderStatus !== 'Collected' && order.orderStatus !== 'Cancelled').length
  const readyCount = orders.filter((order) => order.orderStatus === 'Ready for Collection').length

  return <main className="min-h-screen bg-[#f4f2ed] text-[#201e1b]">
    <header className="border-b border-[#dedbd3] bg-white"><div className="mx-auto flex min-h-[72px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-7">
      <Link className="flex items-center gap-3" href="/"><span className="grid size-9 place-items-center bg-[#eee9e1] text-[#a65b27]"><Store size={18} /></span><span><span className="block text-[10px] font-semibold uppercase tracking-[0.14em]">99 Goggles</span><span className="mt-1 block text-[9px] text-[#777169]">Collection desk · prototype</span></span></Link>
      <div className="flex items-center gap-2"><Link className="inline-flex min-h-10 items-center border border-[#d8d4cb] px-3 text-[9px] font-semibold uppercase tracking-[0.08em] sm:text-[10px]" href="/admin/other-products">Other products</Link><Link className="inline-flex min-h-10 items-center gap-2 border border-[#d8d4cb] px-3 text-[9px] font-semibold uppercase tracking-[0.08em] sm:text-[10px]" href="/"><ArrowLeft size={14} /> Storefront</Link></div>
    </div></header>
    <div className="mx-auto max-w-[1440px] px-4 py-7 sm:px-7 sm:py-10">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#a65b27]">Store operations</p><h1 className="mt-2 font-serif text-4xl">Reservations</h1><p className="mt-2 text-[11px] text-[#777169]">Local demo data only. No staff sign-in or payment verification is connected.</p></div><div className="flex gap-6 border-y border-[#d8d4cb] py-3 sm:border-y-0 sm:border-l sm:pl-6"><div><p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#777169]">Active orders</p><p className="mt-1 text-xl font-semibold">{pendingCount}</p></div><div><p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#777169]">Ready today</p><p className="mt-1 text-xl font-semibold">{readyCount}</p></div></div></div>
      <section className="mt-8 bg-white">
        <div className="flex flex-col gap-4 border-b border-[#e5e1d9] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <label className="flex h-11 items-center gap-3 border border-[#dedbd3] px-3 sm:w-[360px]"><Search size={16} className="text-[#777169]" /><span className="sr-only">Search order, customer, phone, or product</span><input className="min-w-0 flex-1 bg-transparent text-[12px] outline-none placeholder:text-[#979188]" placeholder="Order, customer, phone or product" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
          <label className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#777169]">Status<select className="h-10 border border-[#dedbd3] bg-white px-3 text-[11px] normal-case tracking-normal text-[#201e1b]" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as 'All' | OrderStatus)}><option value="All">All orders</option>{statusOrder.map((status) => <option key={status} value={status}>{status}</option>)}</select></label>
        </div>
        {visibleOrders.length === 0 ? <div className="px-5 py-16 text-center"><p className="font-serif text-2xl">{orders.length ? 'No matching reservations' : 'No reservations yet'}</p><p className="mt-2 text-[11px] text-[#777169]">{orders.length ? 'Adjust your search or status filter.' : 'New reservations placed through checkout will appear here on this browser.'}</p></div> : <div className="divide-y divide-[#e5e1d9]">
          {visibleOrders.map((order) => {
            const next = nextStatus[order.orderStatus]
            return <article className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[1.2fr_1fr_.8fr_auto] lg:items-center" key={order.id}>
              <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h2 className="text-[12px] font-semibold">{order.id}</h2><span className="bg-[#eee9e1] px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.08em]">{order.orderStatus}</span></div><p className="mt-2 text-[11px] font-medium">{order.customerName} <span className="font-normal text-[#777169]">· {order.phone}</span></p><p className="mt-1 text-[10px] text-[#777169]">{order.email}</p><p className="mt-2 text-[10px] text-[#777169]">{order.items.map((item) => `${item.name} · ${item.variant ?? 'Standard'} × ${item.quantity}`).join(' · ')}</p></div>
              <div><p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#777169]">Collection</p><p className="mt-1 text-[11px] font-medium">{dateLabel(order.collectionDate)}{order.collectionTime ? ` · ${order.collectionTime}` : ''}</p><p className="mt-2 text-[10px] text-[#777169]">Payment: {order.paymentStatus} · {order.paymentChoice === 'deposit' ? '50% deposit' : order.paymentChoice === 'full' ? 'Full payment' : 'Pay at store'}</p></div>
              <div className="grid grid-cols-3 gap-2 text-[10px] sm:flex sm:gap-5"><div><p className="text-[#777169]">Total</p><p className="mt-1 font-semibold">{formatPrice(order.total)}</p></div><div><p className="text-[#777169]">Paid</p><p className="mt-1 font-semibold">{formatPrice(order.amountPaid)}</p></div><div><p className="text-[#777169]">Balance</p><p className="mt-1 font-semibold">{formatPrice(order.remainingBalance)}</p></div></div>
              <div className="flex flex-wrap items-center gap-3 lg:justify-end">{order.collectedAt && <span className="text-[9px] leading-4 text-[#777169]">Collected by {order.collectedBy}<br />{new Date(order.collectedAt).toLocaleString('en-IN')}</span>}{next && <button className="min-h-11 flex-1 bg-[#201e1b] px-4 text-[9px] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#a65b27] sm:flex-none" onClick={() => advance(order)}>{next === 'Collected' ? <span className="inline-flex items-center gap-2"><Check size={14} /> Mark collected</span> : `Mark ${next.toLowerCase()}`}</button>}</div>
            </article>
          })}
        </div>}
      </section>
      <p className="mt-5 max-w-[720px] text-[10px] leading-5 text-[#777169]">Order and collection changes are stored in this browser only. This screen is a prototype workflow, not an authenticated staff system; use a real backend with server-side authorization and an audit log before accepting real orders.</p>
    </div>
  </main>
}