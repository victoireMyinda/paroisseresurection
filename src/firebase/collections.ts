import { CMS_PUBLIC_COLLECTIONS } from '@/firebase/cms-contract'
import type { CmsPublicCollectionName } from '@/firebase/cms-contract'

export { CMS_PUBLIC_COLLECTIONS, CMS_ADMIN_ONLY_COLLECTIONS } from '@/firebase/cms-contract'
export type { CmsPublicCollectionName } from '@/firebase/cms-contract'

/** @deprecated use CMS_PUBLIC_COLLECTIONS */
export const CMS_COLLECTIONS = CMS_PUBLIC_COLLECTIONS

export type CmsCollectionName = CmsPublicCollectionName
