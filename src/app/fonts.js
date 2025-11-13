import { Poppins, Quicksand } from 'next/font/google'

export const poppins = Poppins({
  subsets: ['latin'],
  // Solo cargamos los pesos que realmente usamos en el sitio
  weight: ['300', '400', '600', '700', '800', '900'],
  style: ['normal'], // Removemos italic que no usamos
  display: 'swap',
  variable: '--font-poppins',
  preload: true,
  adjustFontFallback: true, // Mejora CLS
})

export const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-quicksand',
  preload: false, // Quicksand no se usa en above-the-fold, no precargamos
  adjustFontFallback: true,
})
