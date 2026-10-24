import { notFound } from 'next/navigation'
import { JournalArticle } from '@/components/journal/journal-pages'
import { getArticle } from '@/lib/editorial'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()
  return <JournalArticle article={article} />
}