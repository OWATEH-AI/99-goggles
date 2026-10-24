'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, LogOut, UserRound } from 'lucide-react'
import { StorefrontHeader } from '@/components/storefront/header'
import { formatPrice, getProduct, type Product } from '@/lib/products'
import { readActiveProfile, readDemoProfile, readFavorites, readReservations, STOREFRONT_UPDATED, writeActiveProfile, writeDemoProfile, writeFavorites, type DemoProfile, type Reservation } from '@/lib/storefront'

type AuthMode = 'login' | 'register' | 'forgot' | 'reset'
type AccountTab = 'Overview' | 'My orders' | 'Wishlist' | 'Profile'

const authCopy: Record<AuthMode, { eyebrow: string; heading: string; description: string; submit: string }> = {
  login: { eyebrow: 'Welcome back', heading: 'Sign in', description: 'Access your saved frames and collection details.', submit: 'Sign in to demo account' },
  register: { eyebrow: 'Your eyewear, your way', heading: 'Create an account', description: 'Keep your reservations and favourite frames together.', submit: 'Create demo account' },
  forgot: { eyebrow: 'Account access', heading: 'Forgot password?', description: 'Enter your email to preview the password reset flow.', submit: 'Request reset link' },
  reset: { eyebrow: 'Account access', heading: 'Choose a new password', description: 'This screen previews the reset experience only.', submit: 'Save new password' },
}

export function AccountAuthPage({ mode }: { mode: AuthMode }) {
  const [message, setMessage] = useState('')
  const copy = authCopy[mode]

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    if (mode === 'register') {
      const password = String(form.get('password'))
      if (password !== String(form.get('confirmPassword'))) {
        setMessage('Those passwords do not match.')
        return
      }
      const profile = {
        firstName: String(form.get('firstName')).trim(),
        lastName: String(form.get('lastName')).trim(),
        email: String(form.get('email')).trim().toLowerCase(),
        phone: String(form.get('phone')).trim(),
      }
      writeDemoProfile(profile)
      writeActiveProfile(profile)
      window.location.assign('/account')
      return
    }
    if (mode === 'login') {
      const profile = readDemoProfile()
      const email = String(form.get('email')).trim().toLowerCase()
      if (!profile || profile.email.toLowerCase() !== email) {
        setMessage('No local demo profile matches that email. Create a demo account first.')
        return
      }
      writeActiveProfile(profile)
      window.location.assign('/account')
      return
    }
    if (mode === 'forgot') {
      setMessage('No email was sent. A real password reset service is not connected.')
      return
    }
    if (String(form.get('password')) !== String(form.get('confirmPassword'))) {
      setMessage('Those passwords do not match.')
      return
    }
    setMessage('No password was changed. A secure reset link and authentication service are not connected.')
  }

  return <main className="min-h-screen bg-[#f7f4ef] text-[#201e1b]"><StorefrontHeader /><div className="mx-auto grid max-w-[1120px] gap-8 px-5 py-8 md:grid-cols-2 md:items-stretch md:px-10 md:py-14">
    <div className="relative hidden min-h-[600px] overflow-hidden bg-[#d7c2a7] md:block"><Image src="/images/indian-woman-eyewear.png" alt="Customer wearing everyday eyewear" fill sizes="50vw" className="object-cover" /><div className="absolute inset-x-0 bottom-0 bg-[#201e1b]/75 p-7 text-white"><p className="text-[9px] font-semibold uppercase tracking-[0.18em]">99 Goggles · Vadodara</p><p className="mt-2 max-w-[380px] font-serif text-3xl">Find your pair.<br />Make it yours.</p></div></div>
    <section className="flex flex-col justify-center py-7 md:px-8"><Link className="inline-flex w-fit items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#716b62]" href="/"><ArrowLeft size={14} /> Back to store</Link><p className="mt-10 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#a65b27]">{copy.eyebrow}</p><h1 className="mt-2 font-serif text-4xl">{copy.heading}</h1><p className="mt-3 text-[12px] leading-5 text-[#716b62]">{copy.description}</p>
      <form className="mt-7 space-y-4" onSubmit={submit}>
        {mode === 'register' && <div className="grid grid-cols-2 gap-3">{[['firstName', 'First name'], ['lastName', 'Last name']].map(([name, label]) => <label className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#716b62]" key={name}>{label}<input name={name} required autoComplete={name === 'firstName' ? 'given-name' : 'family-name'} className="mt-2 h-11 w-full border border-[#c9c1b6] bg-transparent px-3 text-[12px] normal-case tracking-normal text-[#201e1b] outline-none focus:border-[#a65b27]" /></label>)}</div>}
        <label className="block text-[9px] font-semibold uppercase tracking-[0.08em] text-[#716b62]">Email address<input name="email" type="email" required autoComplete="email" className="mt-2 h-11 w-full border border-[#c9c1b6] bg-transparent px-3 text-[12px] normal-case tracking-normal text-[#201e1b] outline-none focus:border-[#a65b27]" /></label>
        {mode === 'register' && <label className="block text-[9px] font-semibold uppercase tracking-[0.08em] text-[#716b62]">Phone / WhatsApp<input name="phone" type="tel" required autoComplete="tel" className="mt-2 h-11 w-full border border-[#c9c1b6] bg-transparent px-3 text-[12px] normal-case tracking-normal text-[#201e1b] outline-none focus:border-[#a65b27]" /></label>}
        {(mode === 'login' || mode === 'register' || mode === 'reset') && <label className="block text-[9px] font-semibold uppercase tracking-[0.08em] text-[#716b62]">{mode === 'reset' ? 'New password' : 'Password'}<input name="password" type="password" minLength={8} required autoComplete={mode === 'login' ? 'current-password' : 'new-password'} className="mt-2 h-11 w-full border border-[#c9c1b6] bg-transparent px-3 text-[12px] normal-case tracking-normal text-[#201e1b] outline-none focus:border-[#a65b27]" /></label>}
        {(mode === 'register' || mode === 'reset') && <label className="block text-[9px] font-semibold uppercase tracking-[0.08em] text-[#716b62]">Confirm password<input name="confirmPassword" type="password" minLength={8} required autoComplete="new-password" className="mt-2 h-11 w-full border border-[#c9c1b6] bg-transparent px-3 text-[12px] normal-case tracking-normal text-[#201e1b] outline-none focus:border-[#a65b27]" /></label>}
        {message && <p role="status" className="border-l-2 border-[#a65b27] bg-[#eee9e1] px-3 py-2 text-[11px] leading-5">{message}</p>}
        <button className="min-h-12 w-full bg-[#a65b27] px-5 text-[10px] font-semibold uppercase tracking-[0.13em] text-white hover:bg-[#81431d]">{copy.submit}</button>
      </form>
      <div className="mt-5 space-y-2 text-[11px] text-[#716b62]">{mode === 'login' && <><p><Link className="underline underline-offset-4" href="/forgot-password">Forgot password?</Link></p><p>New to 99 Goggles? <Link className="font-semibold text-[#201e1b] underline underline-offset-4" href="/register">Create an account</Link></p></>}{mode === 'register' && <p>Already have an account? <Link className="font-semibold text-[#201e1b] underline underline-offset-4" href="/login">Sign in</Link></p>}{(mode === 'forgot' || mode === 'reset') && <p><Link className="font-semibold text-[#201e1b] underline underline-offset-4" href="/login">Return to sign in</Link></p>}</div>
      <p className="mt-7 border-t border-[#ded7cc] pt-4 text-[9px] leading-4 text-[#817a70]">Demo only: profile data stays in this browser. Passwords are not checked or stored, and email verification, reset links, and secure authentication are not connected.</p>
    </section>
  </div></main>
}

export function AccountPage() {
  const [profile, setProfile] = useState<DemoProfile | null>(null)
  const [orders, setOrders] = useState<Reservation[]>([])
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const [tab, setTab] = useState<AccountTab>('Overview')

  useEffect(() => {
    const refresh = () => {
      setProfile(readActiveProfile())
      setOrders(readReservations())
      setFavoriteIds(readFavorites())
    }
    refresh()
    window.addEventListener(STOREFRONT_UPDATED, refresh)
    return () => window.removeEventListener(STOREFRONT_UPDATED, refresh)
  }, [])

  if (!profile) return <AccountAuthPage mode="login" />

  const customerOrders = orders.filter((order) => order.email.toLowerCase() === profile.email.toLowerCase())
  const favorites = favoriteIds.flatMap((id) => { const product = getProduct(id); return product ? [product] : [] })
  const upcoming = customerOrders.filter((order) => order.collectionDate >= new Date().toISOString().slice(0, 10) && !['Collected', 'Cancelled'].includes(order.orderStatus))

  function logout() {
    writeActiveProfile(null)
    setProfile(null)
  }

  function removeFavorite(product: Product) {
    const next = favoriteIds.filter((id) => id !== product.id)
    setFavoriteIds(next)
    writeFavorites(next)
  }

  return <main className="min-h-screen bg-[#f7f4ef] text-[#201e1b]"><StorefrontHeader /><div className="mx-auto max-w-[1200px] px-5 py-9 md:px-10 md:py-14">
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#ded7cc] pb-5"><div><p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#a65b27]">Customer account · browser demo</p><h1 className="mt-2 font-serif text-4xl">Hello, {profile.firstName}</h1><p className="mt-2 text-[11px] text-[#716b62]">{profile.email}</p></div><button className="inline-flex min-h-10 items-center gap-2 border border-[#c9c1b6] px-3 text-[9px] font-semibold uppercase tracking-[0.1em]" onClick={logout}><LogOut size={14} /> Sign out</button></div>
    <div className="mt-6 flex gap-5 overflow-x-auto border-b border-[#ded7cc]" role="tablist" aria-label="Account sections">{(['Overview', 'My orders', 'Wishlist', 'Profile'] as AccountTab[]).map((item) => <button className={`min-h-11 shrink-0 border-b-2 px-1 text-[10px] font-semibold uppercase tracking-[0.1em] ${tab === item ? 'border-[#a65b27] text-[#a65b27]' : 'border-transparent text-[#716b62]'}`} key={item} role="tab" aria-selected={tab === item} onClick={() => setTab(item)}>{item}</button>)}</div>
    {tab === 'Overview' && <div className="grid gap-8 py-7 md:grid-cols-[1fr_300px]"><section><h2 className="font-serif text-2xl">Upcoming collections</h2>{upcoming.length ? <div className="mt-4 divide-y divide-[#ded7cc]">{upcoming.map((order) => <article className="flex flex-wrap justify-between gap-4 py-4" key={order.id}><div><p className="text-[11px] font-semibold">{order.id}</p><p className="mt-1 text-[10px] text-[#716b62]">{order.items.map((item) => item.name).join(', ')}</p><p className="mt-1 text-[10px] text-[#716b62]">Collect {new Date(`${order.collectionDate}T12:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p></div><div className="text-right"><p className="text-[10px] font-semibold uppercase tracking-[0.08em]">{order.orderStatus}</p><p className="mt-1 text-[10px] text-[#716b62]">Balance {formatPrice(order.remainingBalance)}</p></div></article>)}</div> : <div className="mt-4 border-y border-[#ded7cc] py-8 text-[11px] text-[#716b62]">No upcoming collections. <Link className="font-semibold text-[#a65b27] underline underline-offset-4" href="/#shop">Browse frames</Link></div>}</section><aside className="h-fit bg-[#eee9e1] p-5"><p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-[#716b62]">Saved frames</p><p className="mt-2 font-serif text-3xl">{favorites.length}</p><button className="mt-4 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.1em]" onClick={() => setTab('Wishlist')}>View wishlist <ArrowRight size={14} /></button></aside></div>}
    {tab === 'My orders' && <section className="py-7"><h2 className="font-serif text-2xl">My orders</h2>{customerOrders.length ? <div className="mt-4 divide-y divide-[#ded7cc]">{customerOrders.map((order) => <article className="grid gap-3 py-4 sm:grid-cols-[1fr_auto_auto] sm:items-center" key={order.id}><div><p className="text-[11px] font-semibold">{order.id}</p><p className="mt-1 text-[10px] text-[#716b62]">{order.items.map((item) => `${item.name} · ${item.variant ?? 'Standard'} × ${item.quantity}`).join(', ')}</p><p className="mt-1 text-[10px] text-[#716b62]">Collection {new Date(`${order.collectionDate}T12:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p></div><span className="text-[9px] font-semibold uppercase">{order.orderStatus}</span><span className="text-[11px] font-semibold">{formatPrice(order.total)} · balance {formatPrice(order.remainingBalance)}</span></article>)}</div> : <p className="mt-4 border-y border-[#ded7cc] py-8 text-[11px] text-[#716b62]">No orders saved for this demo profile.</p>}</section>}
    {tab === 'Wishlist' && <section className="py-7"><h2 className="font-serif text-2xl">Wishlist</h2>{favorites.length ? <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{favorites.map((product) => <article key={product.id}><Link href={`/product/${product.slug}`} className="relative block aspect-[.86] overflow-hidden bg-[#e9e2d8]"><Image src={product.thumbnail || product.images[0]} alt={product.name} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover object-center" /></Link><div className="flex justify-between gap-2 pt-2"><div><p className="text-[11px] font-semibold">{product.name}</p><p className="mt-1 text-[10px] text-[#716b62]">{formatPrice(product.price)}</p></div><button className="text-[9px] underline underline-offset-4" onClick={() => removeFavorite(product)}>Remove</button></div></article>)}</div> : <p className="mt-4 border-y border-[#ded7cc] py-8 text-[11px] text-[#716b62]">Save frames with the heart button and they will appear here.</p>}</section>}
    {tab === 'Profile' && <section className="max-w-[520px] py-7"><h2 className="font-serif text-2xl">Profile</h2><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#716b62]">Name<input readOnly value={`${profile.firstName} ${profile.lastName}`} className="mt-2 h-11 w-full border border-[#ded7cc] bg-transparent px-3 text-[12px] normal-case tracking-normal text-[#201e1b]" /></label><label className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#716b62]">Email<input readOnly value={profile.email} className="mt-2 h-11 w-full border border-[#ded7cc] bg-transparent px-3 text-[12px] normal-case tracking-normal text-[#201e1b]" /></label><label className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#716b62]">Phone<input readOnly value={profile.phone} className="mt-2 h-11 w-full border border-[#ded7cc] bg-transparent px-3 text-[12px] normal-case tracking-normal text-[#201e1b]" /></label></div><p className="mt-4 text-[9px] leading-4 text-[#817a70]">Profile details are read-only in this browser demo.</p></section>}
    <p className="mt-4 border-t border-[#ded7cc] pt-4 text-[9px] leading-4 text-[#817a70]">Local prototype only. This profile is not securely authenticated or synced; do not enter a password you use elsewhere.</p>
  </div></main>
}