import { useState } from 'react'
import { Heart, Download, CheckCircle, Copy, Check, Smartphone, Building2 } from 'lucide-react'
import { SEO } from '@/components/seo'
import { PageHeader, FadeIn } from '@/components/section-heading'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { useLanguage } from '@/i18n/language-provider'
import { useSiteData } from '@/contexts/site-data-provider'
import { cn, formatCurrency, generateReceiptNumber } from '@/lib/utils'
import { paymentLogos } from '@/assets/payment-logos'
import { parishImages } from '@/assets/parish-images'
import { siteConfig } from '@/config/site'

type Currency = 'USD' | 'CDF'

interface PaymentMethod {
  id: string
  name: string
  accountName: string
  number: string
  currency: Currency
  imageUrl?: string
}

interface ReceiptData {
  receiptNumber: string
  phone: string
  amount: number
  currency: Currency
  method: string
  date: string
}

function CurrencyBadge({ currency }: { currency: Currency }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'shrink-0 px-1.5 py-0 text-[10px] font-semibold',
        currency === 'USD'
          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
          : 'border-blue-500/40 bg-blue-500/10 text-blue-700 dark:text-blue-400'
      )}
    >
      {currency}
    </Badge>
  )
}

function PaymentMethodCard({
  method,
  type,
  onCopy,
  copiedId,
}: {
  method: PaymentMethod
  type: 'mobile' | 'bank'
  onCopy: (id: string, text: string) => void
  copiedId: string | null
}) {
  const { t } = useLanguage()
  const logo =
    (method.imageUrl && method.imageUrl.trim()) || paymentLogos[method.id] || paymentLogos.equity
  const numberLabel = type === 'mobile' ? t('donationsPage.mobileNumber') : t('donationsPage.accountNumber')
  const isCopied = copiedId === method.id

  return (
    <div className="group rounded-lg border bg-card p-3 shadow-sm transition-colors hover:border-gold/35">
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border bg-card p-1.5">
          <img src={logo} alt="" className="max-h-full max-w-full object-contain" loading="lazy" />
        </div>
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <h4 className="truncate text-sm font-semibold leading-tight">{method.name}</h4>
            <CurrencyBadge currency={method.currency} />
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              {t('donationsPage.accountName')}
            </p>
            <p className="truncate text-xs font-medium text-foreground">{method.accountName}</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              {numberLabel}
            </p>
            <div className="flex items-center gap-1">
              <p className="truncate font-mono text-xs font-medium text-primary">
                {method.number}
              </p>
              <button
                type="button"
                onClick={() => onCopy(method.id, method.number)}
                className="shrink-0 rounded p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label={t('donationsPage.copy')}
              >
                {isCopied ? (
                  <Check className="h-3 w-3 text-green-600" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function DonationsPage() {
  const { t, content } = useLanguage()
  const { paymentMethods, getBanner } = useSiteData()
  const [form, setForm] = useState({
    phone: '',
    amount: '',
    currency: 'USD' as Currency,
    method: '',
  })
  const [receipt, setReceipt] = useState<ReceiptData | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const mobileMethods: PaymentMethod[] = paymentMethods.mobile.map((m) => ({
    id: m.id,
    name: m.name,
    accountName: m.accountName,
    number: m.number,
    currency: m.currency,
    imageUrl: m.imageUrl,
  }))

  const bankMethods: PaymentMethod[] = paymentMethods.bank.map((m) => ({
    id: m.id,
    name: m.name,
    accountName: m.accountName,
    number: m.number,
    currency: m.currency,
    imageUrl: m.imageUrl,
  }))

  const allMethods = [...mobileMethods, ...bankMethods]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const methodName = allMethods.find((m) => m.id === form.method)?.name ?? form.method
    setReceipt({
      receiptNumber: generateReceiptNumber(),
      phone: form.phone,
      amount: parseFloat(form.amount) || 0,
      currency: form.currency,
      method: methodName,
      date: new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    })
    setSubmitted(true)
  }

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      /* ignore */
    }
  }

  const downloadReceipt = () => {
    if (!receipt) return
    const body = `
REÇU DE DON
Portail paroissial
${siteConfig.address.full}

N° de reçu : ${receipt.receiptNumber}
Date : ${receipt.date}
Téléphone : ${receipt.phone}
Montant : ${formatCurrency(receipt.amount, receipt.currency)}
Moyen de paiement : ${receipt.method}

${content.donations.thankYou}

---
${siteConfig.name}
${siteConfig.contact.email}
    `.trim()

    const blob = new Blob([body], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `recu-${receipt.receiptNumber}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <SEO title={t('common.donate')} description={content.donations.spiritualIntro} path="/dons" />
      <PageHeader
        title={t('common.donate')}
        subtitle={content.donations.verses[0]?.text.slice(0, 80) + '…'}
        image={getBanner('/dons', parishImages.statutmarie)}
        path="/dons"
      />

      <section className="section-padding">
        <div className="container-wide space-y-16">
          <div className="grid gap-12 lg:grid-cols-2">
            <FadeIn>
              <div>
                <h2 className="mb-6 text-2xl font-bold">{content.donations.spiritualTitle}</h2>
                <div className="space-y-6">
                  {content.donations.verses.map((verse) => (
                    <blockquote
                      key={verse.reference}
                      className="border-l-4 border-gold pl-4 italic text-muted-foreground"
                    >
                      <p>&laquo; {verse.text} &raquo;</p>
                      <cite className="mt-2 block text-sm font-semibold not-italic text-primary">
                        — {verse.reference}
                      </cite>
                    </blockquote>
                  ))}
                </div>
                <p className="mt-6 leading-relaxed text-muted-foreground">
                  {content.donations.spiritualMessage}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Card className="border-gold/20 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Heart className="h-5 w-5 text-gold" />
                    {t('donationsPage.formTitle')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <Label htmlFor="phone">{t('donationsPage.phone')}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="081 000 0000"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="amount">{t('donationsPage.amount')}</Label>
                      <Input
                        id="amount"
                        type="number"
                        min="1"
                        step="any"
                        placeholder="0"
                        required
                        value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>

                    <div>
                      <Label>{t('donationsPage.currency')}</Label>
                      <div className="mt-1.5 grid grid-cols-2 gap-2">
                        {(['USD', 'CDF'] as const).map((cur) => (
                          <button
                            key={cur}
                            type="button"
                            onClick={() => setForm({ ...form, currency: cur })}
                            className={cn(
                              'rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all',
                              form.currency === cur
                                ? 'border-gold bg-gold/15 text-primary'
                                : 'border-input bg-background text-muted-foreground hover:border-gold/40'
                            )}
                          >
                            {cur === 'USD' ? 'USD — Dollar' : 'CDF — Franc congolais'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="method">{t('donationsPage.method')}</Label>
                      <select
                        id="method"
                        required
                        value={form.method}
                        onChange={(e) => setForm({ ...form, method: e.target.value })}
                        className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="">{t('donationsPage.selectMethod')}</option>
                        <optgroup label={t('donationsPage.mobileMoney')}>
                          {mobileMethods.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.name} ({m.currency})
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label={t('donationsPage.bank')}>
                          {bankMethods.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.name} ({m.currency})
                            </option>
                          ))}
                        </optgroup>
                      </select>
                    </div>

                    <Button type="submit" variant="gold" className="w-full" size="lg">
                      {t('donationsPage.submit')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </FadeIn>
          </div>

          <FadeIn>
            <div className="text-center">
              <h2 className="text-2xl font-bold md:text-3xl">{t('donationsPage.methodsTitle')}</h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{t('donationsPage.methodsSub')}</p>
            </div>

            <div className="mt-10 space-y-10">
              <div>
                <div className="mb-5 flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-gold" />
                  <h3 className="text-lg font-semibold">{t('donationsPage.mobileMoney')}</h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {mobileMethods.map((method) => (
                    <PaymentMethodCard
                      key={method.id}
                      method={method}
                      type="mobile"
                      onCopy={handleCopy}
                      copiedId={copiedId}
                    />
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-5 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-gold" />
                  <h3 className="text-lg font-semibold">{t('donationsPage.bank')}</h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {bankMethods.map((method) => (
                    <PaymentMethodCard
                      key={method.id}
                      method={method}
                      type="bank"
                      onCopy={handleCopy}
                      copiedId={copiedId}
                    />
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Dialog open={submitted} onOpenChange={setSubmitted}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              {t('donationsPage.registered')}
            </DialogTitle>
            <DialogDescription>{t('donationsPage.registeredDesc')}</DialogDescription>
          </DialogHeader>
          {receipt && (
            <div className="space-y-4">
              <div className="space-y-2 rounded-lg border bg-muted/50 p-4 text-sm">
                <p>
                  <strong>N° :</strong> {receipt.receiptNumber}
                </p>
                <p>
                  <strong>{t('donationsPage.donor')} :</strong> {receipt.phone}
                </p>
                <p>
                  <strong>{t('donationsPage.amount')} :</strong>{' '}
                  {formatCurrency(receipt.amount, receipt.currency)}
                </p>
                <p>
                  <strong>{t('donationsPage.payment')} :</strong> {receipt.method}
                </p>
                <p>
                  <strong>Date :</strong> {receipt.date}
                </p>
              </div>
              <Button onClick={downloadReceipt} className="w-full">
                <Download className="h-4 w-4" />
                {t('donationsPage.downloadReceipt')}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
