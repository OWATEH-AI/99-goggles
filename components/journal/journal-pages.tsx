import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { articles, type EditorialArticle } from '@/lib/editorial'
import { StorefrontHeader } from '@/components/storefront/header'

export function JournalIndex() {
  return <main className="min-h-screen bg-[#f7f4ef] text-[#201e1b]"><StorefrontHeader /><div className="mx-auto max-w-[1360px] px-5 py-10 md:px-10 md:py-16">
    <div className="grid gap-5 border-b border-[#ded7cc] pb-8 md:grid-cols-[.7fr_1.3fr] md:items-end"><div><p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#a65b27]">99 Goggles · Field notes</p><h1 className="mt-3 font-serif text-5xl sm:text-6xl">The Journal</h1></div><p className="max-w-[500px] text-[12px] leading-6 text-[#716b62]">Thoughtful notes on fit, frame shapes, lens care, and finding eyewear that feels at home in your everyday.</p></div>
    <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">{articles.map((article, index) => <ArticleCard article={article} featured={index === 0} key={article.slug} />)}</div>
    <p className="mt-12 border-t border-[#ded7cc] pt-4 text-[9px] uppercase tracking-[0.12em] text-[#817a70]">Sample editorial content · prepared for a future CMS connection</p>
  </div></main>
}

function ArticleCard({ article, featured = false }: { article: EditorialArticle; featured?: boolean }) {
  return <article className={featured ? 'sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-6 lg:col-span-1 lg:block' : ''}>
    <Link className="group relative block aspect-[1.3] overflow-hidden bg-[#e9e2d8]" href={`/journal/${article.slug}`}><Image src={article.image} alt="" fill loading={featured ? 'eager' : 'lazy'} fetchPriority={featured ? 'high' : 'low'} sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'} className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" /></Link>
    <div className="pt-4"><p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#a65b27]">{article.category}</p><h2 className="mt-2 max-w-[520px] font-serif text-2xl leading-tight"><Link className="hover:text-[#a65b27]" href={`/journal/${article.slug}`}>{article.title}</Link></h2><p className="mt-2 max-w-[520px] text-[11px] leading-5 text-[#716b62]">{article.excerpt}</p><Link className="mt-4 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em]" href={`/journal/${article.slug}`}>Read article <ArrowRight size={13} /></Link></div>
  </article>
}

export function JournalArticle({ article }: { article: EditorialArticle }) {
  return <main className="min-h-screen bg-[#f7f4ef] text-[#201e1b]"><StorefrontHeader /><article className="mx-auto max-w-[900px] px-5 py-8 md:px-10 md:py-14">
    <Link className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#716b62]" href="/journal"><ArrowLeft size={14} /> All journal notes</Link>
    <header className="mx-auto max-w-[700px] py-8 text-center"><p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#a65b27]">{article.category} · Sample editorial</p><h1 className="mt-4 font-serif text-4xl leading-[1.08] sm:text-5xl">{article.title}</h1><p className="mt-4 text-[13px] leading-6 text-[#716b62]">{article.excerpt}</p></header>
    <div className="relative aspect-[1.5] overflow-hidden bg-[#e9e2d8]"><Image src={article.image} alt="" fill loading="eager" fetchPriority="high" sizes="(max-width: 768px) 100vw, 820px" className="object-cover" /></div>
    <div className="mx-auto max-w-[650px] py-8">{article.sections.map((section) => <section className="mb-7" key={section.heading}><h2 className="font-serif text-2xl">{section.heading}</h2><p className="mt-2 text-[13px] leading-7 text-[#5f5a53]">{section.body}</p></section>)}<Link className="mt-2 inline-flex min-h-11 items-center gap-3 bg-[#a65b27] px-5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white" href="/#shop">Find your frame <ArrowRight size={14} /></Link></div>
    <p className="border-t border-[#ded7cc] pt-4 text-[9px] text-[#817a70]">Editorial sample for the prototype. Content is separate from product and order data for a future Sanity CMS integration.</p>
  </article></main>
}