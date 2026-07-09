import { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useLanguage } from '@/i18n/language-provider'
import { submitVisitorMessage } from '@/firebase/visitor-messages'

export function VisitorMessageForm({ className }: { className?: string }) {
  const { t } = useLanguage()
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await submitVisitorMessage(form)
      setSent(true)
      setForm({ name: '', phone: '', message: '' })
      setTimeout(() => setSent(false), 6000)
    } catch (err) {
      setError(err instanceof Error ? err.message : t('visitorMessage.error'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={className}>
      {sent && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-400">
          <CheckCircle className="h-4 w-4 shrink-0" />
          {t('visitorMessage.success')}
        </div>
      )}
      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="visitor-name">{t('visitorMessage.name')}</Label>
          <Input
            id="visitor-name"
            required
            minLength={2}
            maxLength={120}
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="visitor-phone">{t('visitorMessage.phone')}</Label>
          <Input
            id="visitor-phone"
            type="tel"
            required
            minLength={6}
            maxLength={40}
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="visitor-message">{t('visitorMessage.message')}</Label>
          <Textarea
            id="visitor-message"
            required
            minLength={10}
            maxLength={2000}
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </div>
        <Button type="submit" className="w-full" size="lg" disabled={submitting}>
          <Send className="h-4 w-4" />
          {submitting ? t('visitorMessage.submitting') : t('visitorMessage.submit')}
        </Button>
      </form>
    </div>
  )
}
