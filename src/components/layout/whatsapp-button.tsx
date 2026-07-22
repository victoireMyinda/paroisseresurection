import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/i18n/language-provider'
import { useSiteData } from '@/contexts/site-data-provider'

export function WhatsAppButton() {
  const { t } = useLanguage()
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
      className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))] right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20BD5A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 md:bottom-6 md:right-6"
      aria-label={t('common.whatsappContact')}
    >
      <MessageCircle className="h-7 w-7" fill="currentColor" />
    </motion.a>
  )
}
