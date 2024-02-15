import PrimaryNavbar from '@/components/Navbar/navbar'
import { Jost } from 'next/font/google'
import './globals.css'

const jost = Jost({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Instagram clone',
  description: 'Instagram clone',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jost.className}>
      <body>
        <PrimaryNavbar />
        {children}
      </body>
    </html>
  )
}
