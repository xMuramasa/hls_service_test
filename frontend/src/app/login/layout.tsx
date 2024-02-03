import LoginNav from "@/app/ui/LoginNav"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#131313', margin: 0, padding: 0}}
      >
        <LoginNav />
        {children}
      </body>
    </html>
  )
}
