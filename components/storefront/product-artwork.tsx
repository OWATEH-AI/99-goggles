import type { Product } from '@/lib/products'

const lensShapes: Record<Product['frameShape'], string> = {
  Aviator: 'M 4 8 Q 33 1 50 12 Q 67 1 96 8 L 89 64 Q 84 91 57 94 Q 51 90 50 82 Q 49 90 43 94 Q 16 91 11 64 Z',
  'Cat-eye': 'M 3 12 Q 45 0 97 12 L 86 67 Q 78 90 54 89 Q 34 87 19 64 Z',
  Round: 'M 50 4 C 77 4 96 22 96 49 C 96 76 78 94 50 94 C 22 94 4 76 4 49 C 4 22 23 4 50 4 Z',
  Square: 'M 8 8 Q 50 2 92 8 L 90 69 Q 88 91 69 92 L 28 92 Q 9 90 8 69 Z',
  Rectangle: 'M 8 20 Q 50 12 92 20 L 90 68 Q 88 88 69 89 L 28 89 Q 9 87 8 68 Z',
  Oversized: 'M 4 9 Q 50 0 96 9 L 91 72 Q 87 94 63 95 L 25 92 Q 7 88 6 66 Z',
  Sport: 'M 6 17 Q 50 2 94 17 L 84 67 Q 73 87 51 84 Q 27 87 16 67 Z',
  Classic: 'M 8 11 Q 50 4 92 11 L 89 67 Q 86 89 67 90 L 30 90 Q 11 89 8 67 Z',
}

function getFrameColor(color: string) {
  const value = color.toLowerCase()
  if (value.includes('rose') || value.includes('pink')) return '#aa6d70'
  if (value.includes('gold') || value.includes('champagne')) return '#ad8852'
  if (value.includes('bronze')) return '#82603f'
  if (value.includes('olive') || value.includes('green')) return '#596044'
  if (value.includes('blue') || value.includes('navy')) return '#40586a'
  if (value.includes('grey') || value.includes('gray') || value.includes('smoke')) return '#55575a'
  if (value.includes('clear') || value.includes('crystal') || value.includes('transparent')) return '#9b9184'
  if (value.includes('tortoise') || value.includes('amber') || value.includes('brown') || value.includes('espresso') || value.includes('chestnut')) return '#67462f'
  if (value.includes('cherry')) return '#542d35'
  return '#252421'
}

function getLensColor(product: Product) {
  if (product.category === 'Eyeglasses') return '#f2eee5'
  const color = product.lensColor.toLowerCase()
  if (color.includes('brown')) return '#795333'
  if (color.includes('green')) return '#556149'
  if (color.includes('blue')) return '#526c80'
  return '#555b5d'
}

export function ProductArtwork({ product, className = '' }: { product: Product; className?: string }) {
  const shape = lensShapes[product.frameShape]
  const frame = getFrameColor(product.frameColor)
  const lens = getLensColor(product)
  const strokeWidth = product.frameShape === 'Aviator' ? 5 : product.frameShape === 'Sport' ? 8 : 6
  const itemNumber = Number(product.id.match(/\d+$/)?.[0] ?? 0)
  const background = ['#eee8de', '#e8e3da', '#f0eae1', '#e9e4dc', '#ece7df'][itemNumber % 5]

  return <div className={`grid size-full place-items-center overflow-hidden ${className}`} style={{ backgroundColor: background }}>
    <svg aria-hidden="true" viewBox="0 0 340 180" className="h-[74%] w-[88%] max-w-[390px] transition-transform duration-500 group-hover:scale-[1.04]">
      <g fill={lens} fillOpacity={product.category === 'Sunglasses' ? 0.72 : 0.3} stroke={frame} strokeWidth={strokeWidth} strokeLinejoin="round" strokeLinecap="round">
        <path d={shape} transform="translate(50 38)" />
        <path d={shape} transform="translate(290 38) scale(-1 1)" />
        <path d="M 146 82 Q 170 67 194 82" fill="none" />
        <path d="M 52 54 Q 30 49 14 58 M 288 54 Q 310 49 326 58" fill="none" strokeWidth={Math.max(3, strokeWidth - 1)} />
      </g>
      <g fill="none" stroke="#ffffff" strokeLinecap="round" strokeOpacity="0.58" strokeWidth="3">
        <path d="M 56 62 Q 77 53 99 56" />
        <path d="M 242 62 Q 263 53 285 56" />
      </g>
      {itemNumber % 3 === 1 && <g fill="#c5a16b"><circle cx="128" cy="83" r="3" /><circle cx="212" cy="83" r="3" /></g>}
    </svg>
  </div>
}