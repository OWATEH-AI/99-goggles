import { STORE_WHATSAPP_URL } from '@/lib/store-info'

export function WhatsAppChatButton() {
  return <a className="group fixed bottom-5 right-4 z-50 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-lg shadow-black/15 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#128c49] sm:bottom-7 sm:right-7" href={STORE_WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Chat with 99 Goggles on WhatsApp" title="Chat with 99 Goggles on WhatsApp">
    <svg aria-hidden="true" viewBox="0 0 32 32" className="size-7 fill-current">
      <path d="M16.02 3.2A12.66 12.66 0 0 0 5.1 22.27L3.4 28.5l6.37-1.67A12.66 12.66 0 1 0 16.02 3.2Zm0 22.98c-1.9 0-3.77-.51-5.4-1.48l-.39-.23-3.78.99 1.01-3.69-.25-.4a10.29 10.29 0 1 1 8.81 4.81Zm5.65-7.71c-.31-.16-1.85-.91-2.13-1.01-.29-.1-.49-.16-.7.16-.21.31-.8 1.01-.98 1.22-.18.2-.36.23-.67.08-.31-.16-1.31-.48-2.5-1.52-.92-.81-1.54-1.81-1.72-2.12-.18-.32-.02-.49.13-.64.14-.14.31-.36.46-.54.15-.19.2-.32.31-.52.1-.21.05-.39-.03-.55-.08-.15-.7-1.68-.96-2.3-.25-.6-.51-.52-.7-.53h-.59c-.2 0-.52.08-.8.39-.28.31-1.06 1.04-1.06 2.55 0 1.5 1.09 2.96 1.24 3.17.15.21 2.15 3.28 5.2 4.6.73.32 1.3.51 1.74.65.73.23 1.4.2 1.93.12.59-.09 1.85-.76 2.11-1.49.26-.73.26-1.35.18-1.48-.08-.13-.28-.21-.59-.36Z" />
    </svg>
    <span className="pointer-events-none absolute right-[calc(100%+12px)] whitespace-nowrap bg-[#201e1b] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">Chat on WhatsApp</span>
  </a>
}