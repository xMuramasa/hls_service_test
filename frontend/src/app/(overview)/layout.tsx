import "../globals.css";

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';


import NavBar from "@/app/ui/NavBar";
import { montserrat } from "@/app/ui/fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={`
          ${montserrat.className}
          text-[#fff] 
          bg-[#131313]
          primary-[#EF5D70]
          secondary-[#EFD677]
          accent-[#EF9873]
        `} >
        <AppRouterCacheProvider>
          <NavBar />
          {children}
        </AppRouterCacheProvider>
       </body>
    </html>
  );
}
