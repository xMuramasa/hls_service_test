import { montserrat } from "@/app/ui/fonts"

import NavBar from "@/app/ui/NavBar"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}
      style={{ backgroundColor: '#131313', margin: 0, padding: 0}}
      >
        <NavBar Type="user"/>
        {children}
      </body>
    </html>
  )
}
