import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./navbar";
import { SearchProvider } from "./context/searchcontext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Songanalyzer",
  description: "Find important info for any song",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SearchProvider>
          <NavBar/>
          <main className="p-8">
              {children}
          </main>
        </SearchProvider>
      </body>
    </html>
  );
}
