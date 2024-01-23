import PrimaryNavbar from '@/components/Navbar/navbar'
import './globals.css'

export const metadata = {
  title: 'Instagram clone',
  description: 'Instagram clone',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PrimaryNavbar />
        {children}
      </body>
    </html>
  )
}
