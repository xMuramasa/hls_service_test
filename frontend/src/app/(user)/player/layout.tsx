
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: '#313131' }}>
          {children}
      </body>
    </html>
  )
}
