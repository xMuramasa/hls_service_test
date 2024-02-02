import { montserrat } from "@/app/ui/fonts"

import MyPageNavBar from "@/app/ui/MyPageNavBar"


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
        <MyPageNavBar />
        {children}
      </body>
    </html>
  )
}
