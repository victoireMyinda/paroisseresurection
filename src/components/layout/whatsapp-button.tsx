import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useSiteData } from '@/contexts/site-data-provider'

export function WhatsAppButton() {
  const { siteInfo } = useSiteData()
  const number = siteInfo.whatsappNumber.replace(/\D/g, '')
  const url = `https://wa.me/${number}?text=${encodeURIComponent(siteInfo.whatsappMessage)}`

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20BD5A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
      aria-label="Contacter la paroisse sur WhatsApp"
    >
      <MessageCircle className="h-7 w-7" fill="currentColor" />
    </motion.a>
  )
}
