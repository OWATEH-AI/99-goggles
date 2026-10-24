export const STORE_INFO = {
  name: 'Rs.99 Goggles',
  address: 'Opp. Mandvi Bus Stand, M.G. Road, Choksi Bazar, Mandvi, Vadodara, Gujarat 390001, India',
  hours: [
    ['Sunday', '10:15', '21:15'],
    ['Monday', '10:15', '21:15'],
    ['Tuesday', '10:15', '21:15'],
    ['Wednesday', '10:15', '21:15'],
    ['Thursday', '10:15', '21:15'],
    ['Friday', '10:15', '21:15'],
  ] as const,
} as const

export const WHATSAPP_NUMBER = '919537027549'
export const STORE_DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${STORE_INFO.name}, ${STORE_INFO.address}`)}`
export const STORE_WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi 99 Goggles, I have a question about your eyewear and store collection.')}`