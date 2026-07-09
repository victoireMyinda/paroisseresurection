import { addDoc, collection } from 'firebase/firestore'
import { firestore } from './app'

function isPermissionDenied(err: unknown): boolean {
  return (
    typeof err === 'object' &&
    err !== null &&
    'code' in err &&
    (err as { code: string }).code === 'permission-denied'
  )
}

export type VisitorMessageInput = {
  name: string
  phone: string
  message: string
}

export async function submitVisitorMessage(input: VisitorMessageInput): Promise<void> {
  const name = input.name.trim()
  const phone = input.phone.trim()
  const message = input.message.trim()

  if (name.length < 2) throw new Error('Indiquez votre nom (au moins 2 caractères).')
  if (phone.length < 6) throw new Error('Indiquez un numéro de téléphone valide (au moins 6 caractères).')
  if (message.length < 10) throw new Error('Votre message est trop court (au moins 10 caractères).')
  if (message.length > 2000) throw new Error('Votre message est trop long (maximum 2000 caractères).')

  try {
    await addDoc(collection(firestore, 'visitorMessages'), {
      name,
      phone,
      message,
      createdAt: new Date().toISOString(),
      read: false,
    })
  } catch (err) {
    if (isPermissionDenied(err)) {
      console.error('[visitorMessages] permission-denied — vérifier les règles Firestore du projet', err)
      throw new Error(
        'Impossible d’envoyer votre message pour le moment. Réessayez dans quelques instants ou contactez la paroisse par téléphone.',
      )
    }
    throw err
  }
}
