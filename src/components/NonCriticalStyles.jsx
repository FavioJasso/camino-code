'use client'

import { useEffect } from 'react'

export default function NonCriticalStyles() {
  useEffect(() => {
    // Load non-critical styles after initial render
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/styles/non-critical.css'
    link.media = 'print'
    link.onload = () => {
      link.media = 'all'
    }
    document.head.appendChild(link)
  }, [])

  return null
}
