'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, Clock3, MapPin, MessageCircle } from 'lucide-react'
import { STORE_DIRECTIONS_URL, STORE_INFO, STORE_WHATSAPP_URL, WHATSAPP_NUMBER } from '@/lib/store-info'
import { StorefrontHeader } from './header'

function getIndiaOpeningStatus() {
  const parts = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date())
  const part = (type: string) => parts.find((item) => item.type === type)?.value ?? ''
  const currentMinutes = Number(part('hour')) * 60 + Number(part('minute'))
  const day = part('weekday')
  return { day, isOpen: day === 'Saturday' ? null : currentMinutes >= 615 && currentMinutes < 1275 }
}

export function StorePage() {
  const [openingStatus, setOpeningStatus] = useState<{ day: string; isOpen: boolean | null } | null>(null)

  useEffect(() => {
    const refresh = () => setOpeningStatus(getIndiaOpeningStatus())
    refresh()
    const timer = window.setInterval(refresh, 60_000)
    return () => window.clearInterval(timer)
  }, [])

  return <main className="min-h-screen bg-[#f7f4ef] text-[#201e1b]"><StorefrontHeader /><div className="mx-auto max-w-[1360px] px-5 py-8 md:px-10 md:py-12">
    <div className="grid gap-8 md:grid-cols-[.85fr_1.15fr] md:items-center md:gap-12"><section className="py-3 md:py-10"><p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#a65b27]">A real store, a more personal fit</p><h1 className="mt-4 max-w-[560px] font-serif text-5xl leading-[1.02] sm:text-6xl">Visit 99 Goggles</h1><p className="mt-5 max-w-[440px] text-[13px] leading-6 text-[#716b62]">Browse online. Try your favourites in person. Reserve a pair and collect it from our Vadodara store on your chosen date.</p><div className="mt-7 flex flex-wrap gap-3"><a className="inline-flex min-h-11 items-center gap-2 bg-[#a65b27] px-4 text-[9px] font-semibold uppercase tracking-[0.1em] text-white" href={STORE_DIRECTIONS_URL} target="_blank" rel="noreferrer"><MapPin size={14} /> Get directions</a><a className="inline-flex min-h-11 items-center gap-2 border border-[#c9c1b6] px-4 text-[9px] font-semibold uppercase tracking-[0.1em]" href={STORE_WHATSAPP_URL} target="_blank" rel="noreferrer"><MessageCircle size={14} /> Message us</a></div></section>
      <div className="relative aspect-[1.2] min-h-[300px] overflow-hidden bg-[#e9e2d8]"><Image src="/images/indian-couple-eyewear.png" alt="A couple wearing contemporary eyewear" fill loading="eager" fetchPriority="high" sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" /></div></div>
    <section className="mt-10 grid gap-8 md:mt-14 md:grid-cols-[.9fr_1.1fr]">
      <div className="border-y border-[#ded7cc] py-6"><div className="flex items-center justify-between gap-3"><h2 className="flex items-center gap-2 font-serif text-2xl"><Clock3 size={19} className="text-[#a65b27]" /> Opening hours</h2>{openingStatus && <span className={`shrink-0 text-[9px] font-semibold uppercase tracking-[0.1em] ${openingStatus.isOpen === null ? 'text-[#716b62]' : openingStatus.isOpen ? 'text-[#437339]' : 'text-[#8d4f43]'}`}>{openingStatus.isOpen === null ? 'Hours not listed today' : openingStatus.isOpen ? 'Open now' : 'Closed now'}</span>}</div><ul className="mt-5 divide-y divide-[#e6e0d7]">{STORE_INFO.hours.map(([day, open, close]) => <li className={`flex items-center justify-between py-2.5 text-[11px] ${openingStatus?.day === day ? 'font-semibold text-[#a65b27]' : 'text-[#5f5a53]'}`} key={day}><span>{day}</span><span>{open} – {close}</span></li>)}</ul><p className="mt-3 text-[9px] text-[#817a70]">India Standard Time · Saturday hours not listed</p></div>
      <div className="flex flex-col border-y border-[#ded7cc] py-6"><h2 className="font-serif text-2xl">Find the store</h2><p className="mt-4 text-[13px] font-semibold">{STORE_INFO.name}</p><address className="mt-2 max-w-[450px] text-[12px] not-italic leading-6 text-[#716b62]">{STORE_INFO.address}</address><div className="mt-auto pt-6"><a className="inline-flex min-h-11 items-center gap-2 border border-[#bdb5aa] px-4 text-[9px] font-semibold uppercase tracking-[0.1em]" href={STORE_DIRECTIONS_URL} target="_blank" rel="noreferrer">Open directions <ArrowRight size={14} /></a><p className="mt-4 text-[10px] text-[#716b62]">Call or WhatsApp <a className="font-semibold text-[#201e1b] underline underline-offset-4" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">+91 95370 27549</a></p></div></div>
    </section>
    <section className="mx-auto max-w-[900px] py-12 text-center md:py-16"><p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-[#a65b27]">A simple local collection</p><h2 className="mt-3 font-serif text-3xl sm:text-4xl">Find it online. Try it on. Make it yours.</h2><p className="mx-auto mt-3 max-w-[570px] text-[12px] leading-6 text-[#716b62]">Choose a frame, select a collection date at checkout, and bring your order number when you visit. Staff will confirm your reservation and payment details before handover.</p><Link className="mt-6 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em] underline underline-offset-4" href="/#collection">See how collection works <ArrowRight size={14} /></Link></section>
  </div></main>
}