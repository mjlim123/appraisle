import './globals.css'


export const metadata = {
  title: 'Appraisle'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='home-bg'>{children}</body>
    </html>
  )
}
