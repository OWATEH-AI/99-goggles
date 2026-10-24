'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, Moon, Search, ShoppingBag, Sun, UserRound, X } from 'lucide-react'
import { cartCount, readCart, STOREFRONT_UPDATED } from '@/lib/storefront'
import { getTheme, setTheme, THEME_EVENT, type Theme } from '@/lib/theme'
import { WhatsAppChatButton } from './whatsapp-chat-button'

const links = [
  ['Shop', '/#shop'],
  ['Sunglasses', '/?category=Sunglasses#shop'],
  ['Eyeglasses', '/?category=Eyeglasses#shop'],
  ['Women', '/?category=Women#shop'],
  ['Men', '/?category=Men#shop'],
  ['Kids', '/?category=Kids#shop'],
  ['New arrivals', '/?category=New%20arrivals#shop'],
  ['Other products', '/other-products'],
  ['Visit us', '/store'],
  ['Journal', '/journal'],
]

export function StorefrontHeader() {
  const [count, setCount] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setLocalTheme] = useState<Theme>('light')

  useEffect(() => {
    setLocalTheme(getTheme())
    const onThemeChange = (e: Event) => {
      const custom = e as CustomEvent<Theme>
      if (custom.detail) setLocalTheme(custom.detail)
    }
    window.addEventListener(THEME_EVENT, onThemeChange)
    return () => window.removeEventListener(THEME_EVENT, onThemeChange)
  }, [])

  function handleToggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setLocalTheme(next)
    setTheme(next)
  }

  useEffect(() => {
    const refresh = () => setCount(cartCount(readCart()))
    refresh()
    window.addEventListener(STOREFRONT_UPDATED, refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener(STOREFRONT_UPDATED, refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false)
    }
    const desktopQuery = window.matchMedia('(min-width: 1024px)')
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    desktopQuery.addEventListener('change', closeOnDesktop)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
      desktopQuery.removeEventListener('change', closeOnDesktop)
    }
  }, [menuOpen])

  return <>
    <header className="sticky top-0 z-30 border-b border-[#ded7cc] bg-[#f7f4ef]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[70px] max-w-[1360px] items-center justify-between px-4 sm:px-5 md:h-[78px] md:px-10">
        <button className="grid size-11 place-items-center lg:hidden -ml-2" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <Link className="font-serif text-[26px] sm:text-[28px] leading-none tracking-[-0.07em]" href="/" aria-label="99 Goggles home">
          99<span className="text-[#a65b27]">.</span>goggles
        </Link>
        <nav className="hidden items-center gap-6 text-[9px] font-semibold uppercase tracking-[0.12em] lg:flex xl:gap-7 xl:text-[10px]">
          {links.map(([label, href]) => <a className="transition-colors hover:text-[#a65b27]" href={href} key={label}>{label}</a>)}
        </nav>
        <div className="flex items-center gap-0.5 sm:gap-1.5">
          <button
            onClick={handleToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="grid size-11 place-items-center transition-colors hover:text-[#a65b27]"
          >
            {theme === 'dark' ? <Sun size={20} strokeWidth={1.5} className="text-[#f59e0b]" /> : <Moon size={20} strokeWidth={1.5} />}
          </button>
          <a className="grid size-11 place-items-center transition-colors hover:text-[#a65b27]" aria-label="Find eyewear" href="/#shop"><Search size={20} strokeWidth={1.5} /></a>
          <Link className="hidden size-11 place-items-center sm:grid transition-colors hover:text-[#a65b27]" aria-label="Account" href="/account"><UserRound size={20} strokeWidth={1.5} /></Link>
          <Link className="relative grid size-11 place-items-center transition-colors hover:text-[#a65b27]" aria-label={`Shopping bag, ${count} items`} href="/cart">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {count > 0 && <span className="absolute right-1 top-1 grid size-[18px] place-items-center rounded-full bg-[#a65b27] text-[9px] font-semibold text-white">{count}</span>}
          </Link>
        </div>
      </div>
    </header>
    {menuOpen && <div className="fixed inset-0 z-[60] lg:hidden">
      <button className="drawer-backdrop absolute inset-y-0 right-0 left-[min(86vw,360px)] bg-[#171514]/45" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)} />
      <aside id="mobile-navigation" className="drawer-enter relative z-10 flex h-full w-[min(86vw,360px)] flex-col border-r border-[#ded7cc] bg-[#f7f4ef] shadow-[12px_0_36px_rgba(23,21,20,0.16)]" aria-label="Mobile navigation">
        <div className="flex h-[70px] shrink-0 items-center justify-between border-b border-[#ded7cc] px-5">
          <Link className="font-serif text-[25px] tracking-[-0.07em]" href="/" onClick={() => setMenuOpen(false)}>99<span className="text-[#a65b27]">.</span>goggles</Link>
          <button className="grid size-10 place-items-center" aria-label="Close menu" onClick={() => setMenuOpen(false)}><X size={20} /></button>
        </div>
        <div className="flex items-center justify-between border-b border-[#ded7cc] px-5 py-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#716b62]">Theme</span>
          <button
            onClick={handleToggleTheme}
            className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#a65b27]"
          >
            {theme === 'dark' ? <Sun size={16} className="text-[#f59e0b]" /> : <Moon size={16} />}
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 py-3">
          {links.map(([label, href]) => <a className="flex min-h-12 items-center border-b border-[#e7e0d6] text-[10px] font-semibold uppercase tracking-[0.13em] hover:text-[#a65b27]" href={href} key={label} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <div className="shrink-0 border-t border-[#ded7cc] px-5 py-4"><Link className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#716b62]" href="/admin" onClick={() => setMenuOpen(false)}>Staff collection desk</Link><p className="mt-2 text-[9px] text-[#817a70]">Order online · Collect in Vadodara</p></div>
      </aside>
    </div>}
    <WhatsAppChatButton />
  </>
}