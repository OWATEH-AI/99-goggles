export type EditorialSection = { heading: string; body: string }

export type EditorialArticle = {
  slug: string
  title: string
  excerpt: string
  category: string
  image: string
  sections: EditorialSection[]
}

export const articles: EditorialArticle[] = [
  {
    slug: 'choose-sunglasses-for-your-face-shape',
    title: 'A relaxed guide to choosing sunglasses for your face shape',
    excerpt: 'A few simple proportions can help you find frames that feel balanced and comfortable, without turning the choice into a set of rules.',
    category: 'Frame guide',
    image: '/images/indian-woman-sunglasses-3.png',
    sections: [
      { heading: 'Start with what feels good', body: 'Face-shape guides are starting points, not rules. The right frame should sit comfortably on your nose, stay level when you move, and feel like something you would reach for every day.' },
      { heading: 'Look at contrast and proportion', body: 'Rounder frames can bring softness to angular features, while straighter lines can create contrast on softer contours. Try a few shapes side by side and notice which proportions feel natural to you.' },
      { heading: 'Try them on in daylight', body: 'Frame colour can look different under indoor lighting. If you can, compare a couple of options near natural light and check that the temples sit comfortably behind your ears.' },
    ],
  },
  {
    slug: 'eyewear-trends-to-make-your-own',
    title: 'Eyewear trends are better when you make them your own',
    excerpt: 'From warm tortoise tones to clean rectangles, explore a few wearable directions and find the detail that feels personal.',
    category: 'Style notes',
    image: '/images/indian-couple-eyewear.png',
    sections: [
      { heading: 'A familiar shape, a fresh finish', body: 'Classic silhouettes remain easy to wear. A subtle lens tint, a lighter frame colour, or a fine metal detail can make a familiar shape feel current without taking over your look.' },
      { heading: 'Choose for your routine', body: 'Think about where your glasses go with you: a commute, a long day at work, or an afternoon outdoors. Lightweight frames and comfortable hinges matter as much as the colour.' },
      { heading: 'Wear what feels like you', body: 'Trends are useful for discovery, but comfort and confidence last longer. Try different styles and choose the pair you are happy to wear often.' },
    ],
  },
  {
    slug: 'uv400-and-sunglasses',
    title: 'What UV400 means when you are choosing sunglasses',
    excerpt: 'Lens darkness and UV protection are not the same thing. Here is the label to look for and the question to ask before you buy.',
    category: 'Everyday care',
    image: '/images/indian-woman-sunglasses.png',
    sections: [
      { heading: 'Tint is not a protection rating', body: 'A darker lens can reduce visible brightness, but its tint alone does not tell you how much ultraviolet light it blocks. Look for a clear UV protection rating on the product or its packaging.' },
      { heading: 'Ask for the product details', body: 'When comparing sunglasses, check the label and ask the retailer to confirm the protection information for that specific pair. Do not rely on appearance alone.' },
      { heading: 'Keep lenses in good condition', body: 'Store your sunglasses in a case when you are not wearing them and clean the lenses with a soft cloth to help avoid scratches.' },
    ],
  },
  {
    slug: 'getting-used-to-a-new-frame',
    title: 'A few easy ways to get comfortable in a new frame',
    excerpt: 'Small fit details can make a difference. Here is what to check when you try on your next pair.',
    category: 'Fit & care',
    image: '/images/indian-man-eyewear-2.png',
    sections: [
      { heading: 'Check the bridge', body: 'The frame should rest securely without pinching or sliding down. If it moves when you look down, ask whether another size or shape may fit better.' },
      { heading: 'Notice the temples', body: 'Arms that press behind your ears can become uncomfortable over a full day. A comfortable pair should feel stable without creating pressure.' },
      { heading: 'Give yourself a few minutes', body: 'Try the frame on, move naturally, and look at it from more than one angle. A good fit should feel as easy as it looks.' },
    ],
  },
  {
    slug: 'simple-glasses-care',
    title: 'Simple habits that help keep your glasses in good shape',
    excerpt: 'A case, a soft cloth, and a little care go a long way toward keeping everyday eyewear ready to wear.',
    category: 'Everyday care',
    image: '/images/indian-senior-eyewear.png',
    sections: [
      { heading: 'Use both hands', body: 'Taking frames off with both hands helps avoid putting uneven pressure on the hinges and arms.' },
      { heading: 'Keep lenses clean', body: 'Use a clean microfibre cloth and a lens-safe cleaner. Paper towels and rough fabrics can leave fine scratches over time.' },
      { heading: 'Put them away safely', body: 'A protective case helps keep frames from being crushed or scratched in a bag. Avoid leaving them lens-down on hard surfaces.' },
    ],
  },
]

export const getArticle = (slug: string) => articles.find((article) => article.slug === slug)