import NavBar from "@/app/ui/NavBar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#131313', margin: 0, padding: 0}} >
        <NavBar Type="login"/>
        {children}
      </body>
    </html>
  )
}
