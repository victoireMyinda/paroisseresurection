import { useState } from 'react'
import { Heart, Download, CheckCircle } from 'lucide-react'
import { SEO } from '@/components/seo'
import { PageHeader, FadeIn } from '@/components/section-heading'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { donations } from '@/data'
import { siteConfig } from '@/config/site'
import { formatCurrency, generateReceiptNumber } from '@/lib/utils'
import { paymentLogos } from '@/assets/payment-logos'
import { pageBanners } from '@/assets/parish-images'

interface ReceiptData {
  receiptNumber: string
  name: string
  amount: number
  method: string
  date: string
}

export function DonationsPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    amount: '',
    method: '',
  })
  const [receipt, setReceipt] = useState<ReceiptData | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const allMethods = [...donations.mobileMoney, ...donations.bank]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const methodName = allMethods.find((m) => m.id === form.method)?.name ?? form.method
    const receiptData: ReceiptData = {
      receiptNumber: generateReceiptNumber(),
      name: form.name,
      amount: parseFloat(form.amount) || 0,
      method: methodName,
      date: new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    }
    setReceipt(receiptData)
    setSubmitted(true)
  }

  const downloadReceipt = () => {
    if (!receipt) return
    const content = `
REÇU DE DON
Paroisse Catholique de la Résurrection
${siteConfig.address.full}

N° de reçu : ${receipt.receiptNumber}
Date : ${receipt.date}
Donateur : ${receipt.name}
Montant : ${formatCurrency(receipt.amount)}
Moyen de paiement : ${receipt.method}

Merci pour votre générosité.
Que Dieu vous bénisse abondamment.

---
${siteConfig.name}
${siteConfig.contact.email}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `recu-${receipt.receiptNumber}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <SEO
        title="Faire un don"
        description="Soutenez la mission de la Paroisse de la Résurrection par votre générosité."
        path="/dons"
      />
      <PageHeader
        title="Faire un don"
        subtitle="« Dieu aime celui qui donne avec joie » — 2 Co 9, 7"
        image={pageBanners.dons}
      />

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-2">
            <FadeIn>
              <div>
                <h2 className="text-2xl font-bold mb-6">{donations.spiritualText.title}</h2>
                <div className="space-y-6">
                  {donations.spiritualText.verses.map((verse) => (
                    <blockquote
                      key={verse.reference}
                      className="border-l-4 border-gold pl-4 italic text-muted-foreground"
                    >
                      <p>&laquo; {verse.text} &raquo;</p>
                      <cite className="mt-2 block text-sm not-italic font-semibold text-primary dark:text-gold">
                        — {verse.reference}
                      </cite>
                    </blockquote>
                  ))}
                </div>
                <p className="mt-6 leading-relaxed text-muted-foreground">
                  {donations.spiritualText.message}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-gold" />
                    Formulaire de don
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nom complet</Label>
                      <Input
                        id="name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="amount">Montant (USD)</Label>
                      <Input
                        id="amount"
                        type="number"
                        min="1"
                        required
                        value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="method">Moyen de paiement</Label>
                      <select
                        id="method"
                        required
                        value={form.method}
                        onChange={(e) => setForm({ ...form, method: e.target.value })}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="">Sélectionner...</option>
                        <optgroup label="Mobile Money">
                          {donations.mobileMoney.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.name}
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="Banque">
                          {donations.bank.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.name}
                            </option>
                          ))}
                        </optgroup>
                      </select>
                    </div>
                    <Button type="submit" variant="gold" className="w-full" size="lg">
                      Confirmer mon don
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </FadeIn>
          </div>

          {/* Mobile Money */}
          <FadeIn>
            <h3 className="mt-16 mb-6 text-xl font-bold">Mobile Money</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {donations.mobileMoney.map((method) => (
                <Card key={method.id}>
                  <CardContent className="flex items-center gap-4 p-4">
                    <img
                      src={paymentLogos[method.id]}
                      alt={method.name}
                      className="h-12 w-20 shrink-0 rounded-md object-contain"
                      loading="lazy"
                    />
                    <div>
                      <p className="font-semibold text-sm">{method.name}</p>
                      <p className="text-sm text-muted-foreground">{method.number}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </FadeIn>

          {/* Bank */}
          <FadeIn>
            <h3 className="mt-12 mb-6 text-xl font-bold">Banque</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {donations.bank.map((method) => (
                <Card key={method.id}>
                  <CardContent className="flex items-center gap-4 p-4">
                    <img
                      src={paymentLogos[method.id]}
                      alt={method.name}
                      className="h-12 w-20 shrink-0 rounded-md object-contain"
                      loading="lazy"
                    />
                    <div>
                      <p className="font-semibold text-sm">{method.name}</p>
                      <p className="text-sm text-muted-foreground">{method.number}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <Dialog open={submitted} onOpenChange={setSubmitted}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              Don enregistré
            </DialogTitle>
            <DialogDescription>
              Votre intention de don a été enregistrée. Veuillez effectuer le transfert vers le
              compte indiqué.
            </DialogDescription>
          </DialogHeader>
          {receipt && (
            <div className="space-y-4">
              <div className="rounded-lg border bg-muted/50 p-4 text-sm space-y-2">
                <p><strong>N° de reçu :</strong> {receipt.receiptNumber}</p>
                <p><strong>Donateur :</strong> {receipt.name}</p>
                <p><strong>Montant :</strong> {formatCurrency(receipt.amount)}</p>
                <p><strong>Paiement :</strong> {receipt.method}</p>
                <p><strong>Date :</strong> {receipt.date}</p>
              </div>
              <Button onClick={downloadReceipt} className="w-full">
                <Download className="h-4 w-4" />
                Télécharger le reçu
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
