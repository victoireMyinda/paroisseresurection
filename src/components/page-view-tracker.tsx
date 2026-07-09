import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageVisit } from '@/firebase/analytics'

export function PageViewTracker() {
  const { pathname } = useLocation()

  useEffect(() => {
    void trackPageVisit(pathname)
  }, [pathname])

  return null
}
