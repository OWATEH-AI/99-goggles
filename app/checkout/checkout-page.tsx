'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'
import { ArrowLeft, Check, MapPin } from 'lucide-react'
import { StorefrontHeader } from '@/components/storefront/header'
import { formatPrice, products } from '@/lib/products'
import { cartTotal, getAmountDue, readCart, readReservations, STOREFRONT_UPDATED, writeCart, writeReservations, type CartLine, type PaymentChoice, type Reservation } from '@/lib/storefront'

const paymentOptions: { id: PaymentChoice; title: string; detail: string }[] = [
  { id: 'deposit', title: '50% deposit', detail: 'The remaining amount is due when you collect in store.' },
  { id: 'full', title: 'Pay in full', detail: 'Settle the full order total before collection.' },
  { id: 'store', title: 'Pay at store', detail: 'Reserve now and complete payment when you visit.' },
]

function localDateInputValue() {
  const date = new Date()
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return date.toISOString().slice(0, 10)
}

export function CheckoutPage() {
  const [lines, setLines] = useState<CartLine[]>([])
  const [paymentChoice, setPaymentChoice] = useState<PaymentChoice>('deposit')
  const [reservation, setReservation] = useState<Reservation | null>(null)
  const [today, setToday] = useState('')

  useEffect(() => {
    setLines(readCart())
    setToday(localDateInputValue())
  }, [])

  const items = lines.flatMap((line) => {
    const product = products.find((item) => item.id === line.productId)
    return product ? [{ ...line, product }] : []
  })
  const total = cartTotal(lines, products)
  const amountDue = getAmountDue(total, paymentChoice)

  function placeReservation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const now = new Date()
    const order: Reservation = {
      id: `99G-${now.getFullYear()}-${String(now.getTime()).slice(-6)}`,
      customerName: String(form.get('name')).trim(),
      email: String(form.get('email')).trim(),
      phone: String(form.get('phone')).trim(),
      items: items.map(({ product, quantity, size }) => ({ productId: product.id, name: product.name, variant: size ?? product.variants[0]?.size ?? 'Medium', quantity, unitPrice: product.price })),
      total,
      amountDueAtCheckout: amountDue,
      amountPaid: 0,
      remainingBalance: total,
      paymentChoice,
      paymentStatus: paymentChoice === 'store' ? 'Pay at Store' : 'Pending',
      orderStatus: 'Pending',
      collectionDate: String(form.get('collectionDate')),
      collectionTime: String(form.get('collectionTime') || ''),
      createdAt: now.toISOString(),
      timeline: [{ status: 'Pending', at: now.toISOString(), actor: 'Customer' }],
    }

    writeReservations([order, ...readReservations()])
    writeCart([])
    setLines([])
    setReservation(order)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (reservation) {
    return <main className="min-h-screen bg-[#f7f4ef] text-[#201e1b]"><StorefrontHeader /><section className="mx-auto max-w-[760px] px-5 py-14 text-center md:py-24">
      <span className="mx-auto grid size-14 place-items-center bg-[#e4eadb] text-[#536b3d]"><Check size={24} /></span>
      <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a65b27]">Reservation saved in this browser</p>
      <h1 className="mt-3 font-serif text-4xl sm:text-5xl">Your order is reserved.</h1>
      <p className="mt-4 text-[13px] leading-6 text-[#716b62]">Bring this reference when you visit 99 Goggles in Vadodara. Staff can look it up from the collection desk.</p>
      <div className="mt-9 border-y border-[#ded7cc] py-6"><p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#716b62]">Order number</p><p className="mt-2 font-serif text-3xl">{reservation.id}</p></div>
      <div className="mt-6 grid gap-5 text-left sm:grid-cols-2">
        <div><p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#716b62]">Collection</p><p className="mt-1 text-[13px] font-semibold">{new Date(`${reservation.collectionDate}T12:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p><p className="text-[11px] text-[#716b62]">99 Goggles · Vadodara</p></div>
        <div><p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#716b62]">Payment choice</p><p className="mt-1 text-[13px] font-semibold">{paymentOptions.find((option) => option.id === reservation.paymentChoice)?.title}</p><p className="text-[11px] text-[#716b62]">Payment status: {reservation.paymentStatus}</p></div>
      </div>
      <div className="mt-7 bg-[#eee9e1] p-5 text-left"><p className="text-[11px] font-semibold">Prototype payment notice</p><p className="mt-1 text-[11px] leading-5 text-[#716b62]">No payment was processed. The {formatPrice(reservation.amountDueAtCheckout)} shown is the amount this option would request after a payment provider is connected. Current recorded amount paid: {formatPrice(reservation.amountPaid)}.</p><p className="mt-2 text-[12px] font-semibold">Order total {formatPrice(reservation.total)} · Outstanding {formatPrice(reservation.remainingBalance)}</p></div>
      <div className="mt-7 flex flex-wrap justify-center gap-3"><Link className="inline-flex min-h-11 items-center bg-[#a65b27] px-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white" href="/">Continue browsing</Link><Link className="inline-flex min-h-11 items-center border border-[#bdb5aa] px-5 text-[10px] font-semibold uppercase tracking-[0.12em]" href="/admin">Open staff collection desk</Link></div>
    </section></main>
  }

  return <main className="min-h-screen bg-[#f7f4ef] text-[#201e1b]"><StorefrontHeader /><div className="mx-auto max-w-[1200px] px-5 py-9 md:px-10 md:py-14">
    <Link className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#716b62]" href="/cart"><ArrowLeft size={14} /> Back to bag</Link>
    <div className="mt-5"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a65b27]">Reserve for store collection</p><h1 className="mt-2 font-serif text-4xl">Collection checkout</h1></div>
    {items.length === 0 ? <div className="mt-8 border-y border-[#ded7cc] py-14 text-center"><h2 className="font-serif text-2xl">Your bag is empty</h2><Link className="mt-5 inline-flex min-h-11 items-center bg-[#a65b27] px-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white" href="/#shop">Browse frames</Link></div> : <form className="mt-8 grid gap-9 lg:grid-cols-[1fr_360px]" onSubmit={placeReservation}>
      <div className="space-y-8">
        <section><div className="mb-4 border-b border-[#ded7cc] pb-3"><p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#a65b27]">01 · Your details</p><h2 className="mt-1 font-serif text-2xl">Contact information</h2></div><div className="grid gap-4 sm:grid-cols-2">
          {[['name', 'Full name', 'text'], ['email', 'Email address', 'email'], ['phone', 'Phone / WhatsApp', 'tel']].map(([name, label, type]) => <label className="flex flex-col gap-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#716b62]" key={name}>{label}<input className="h-12 border border-[#c9c1b6] bg-transparent px-3 text-[13px] font-normal normal-case tracking-normal text-[#201e1b] outline-none focus:border-[#a65b27]" name={name} type={type} required autoComplete={name === 'name' ? 'name' : name === 'email' ? 'email' : 'tel'} /></label>)}
        </div></section>
        <section><div className="mb-4 border-b border-[#ded7cc] pb-3"><p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#a65b27]">02 · Store visit</p><h2 className="mt-1 font-serif text-2xl">Collection details</h2></div><div className="mb-4 flex items-start gap-3 bg-[#eee9e1] p-4"><MapPin size={17} className="mt-0.5 shrink-0 text-[#a65b27]" /><div><p className="text-[12px] font-semibold">99 Goggles · Vadodara</p><p className="mt-1 text-[10px] leading-4 text-[#716b62]">Store address and opening hours have not yet been provided. Please confirm them with the store before travelling.</p></div></div><div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#716b62]">Preferred collection date<input className="h-12 border border-[#c9c1b6] bg-transparent px-3 text-[13px] font-normal normal-case tracking-normal text-[#201e1b] outline-none focus:border-[#a65b27]" type="date" name="collectionDate" min={today || undefined} required /></label>
          <label className="flex flex-col gap-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#716b62]">Preferred time <span className="text-[9px] font-normal normal-case tracking-normal">Optional · confirm availability with store</span><input className="h-12 border border-[#c9c1b6] bg-transparent px-3 text-[13px] font-normal normal-case tracking-normal text-[#201e1b] outline-none focus:border-[#a65b27]" type="time" name="collectionTime" /></label>
        </div><p className="mt-3 text-[10px] text-[#716b62]">Your order will be prepared for collection on your selected date.</p></section>
        <fieldset><legend className="mb-4 w-full border-b border-[#ded7cc] pb-3"><span className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-[#a65b27]">03 · Payment preference</span><span className="mt-1 block font-serif text-2xl">Choose how you’ll pay</span></legend><div className="space-y-2">
          {paymentOptions.map((option) => <label className={`flex cursor-pointer items-start gap-3 border p-4 transition-colors ${paymentChoice === option.id ? 'border-[#a65b27] bg-[#f0e7dc]' : 'border-[#d8d0c5]'}`} key={option.id}><input className="mt-1 accent-[#a65b27]" type="radio" name="paymentChoice" value={option.id} checked={paymentChoice === option.id} onChange={() => setPaymentChoice(option.id)} /><span className="flex-1"><span className="block text-[12px] font-semibold">{option.title}</span><span className="mt-1 block text-[10px] leading-4 text-[#716b62]">{option.detail}</span></span><span className="text-[11px] font-semibold">{formatPrice(getAmountDue(total, option.id))}</span></label>)}
        </div><p className="mt-3 text-[10px] leading-4 text-[#716b62]">Prototype only: this selection records your preference. No payment is taken or verified here.</p></fieldset>
        <label className="flex items-start gap-3 text-[11px] leading-5 text-[#716b62]"><input className="mt-1 accent-[#a65b27]" type="checkbox" required /><span>I understand this is a reservation prototype, no online payment is processed, and store details must be confirmed before visiting.</span></label>
      </div>
      <aside className="h-fit border-t border-[#ded7cc] pt-5 lg:sticky lg:top-[100px] lg:border-t-0 lg:bg-[#eee9e1] lg:p-6"><h2 className="font-serif text-2xl">Order summary</h2><div className="mt-5 divide-y divide-[#d8d0c5]">{items.map(({ product, quantity }) => <div className="flex gap-3 py-3 first:pt-0" key={product.id}><div className="relative size-[60px] shrink-0 overflow-hidden bg-[#e9e2d8]"><Image src={product.thumbnail || product.images[0]} alt={product.name} fill sizes="60px" className="object-cover object-center" /></div><div className="min-w-0 flex-1"><p className="text-[11px] font-semibold">{product.name}</p><p className="mt-1 text-[10px] text-[#716b62]">Qty {quantity}</p></div><p className="text-[11px] font-semibold">{formatPrice(product.price * quantity)}</p></div>)}</div><div className="mt-4 space-y-3 border-t border-[#d8d0c5] pt-4 text-[11px]"><div className="flex justify-between"><span>Order total</span><strong>{formatPrice(total)}</strong></div><div className="flex justify-between"><span>Selected amount (not charged)</span><strong>{formatPrice(amountDue)}</strong></div><div className="flex justify-between border-t border-[#d8d0c5] pt-3 text-[12px]"><span>Outstanding until real payment</span><strong>{formatPrice(total)}</strong></div></div><button className="mt-6 min-h-12 w-full bg-[#a65b27] px-4 text-[10px] font-semibold uppercase tracking-[0.13em] text-white transition-colors hover:bg-[#81431d]">Place reservation</button><p className="mt-3 text-center text-[9px] leading-4 text-[#716b62]">This local demo does not charge a card or send notifications.</p></aside>
    </form>}
  </div></main>
}