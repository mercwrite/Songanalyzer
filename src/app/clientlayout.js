'use client';
import NavBar from "./navbar";
import { SearchProvider } from "./context/searchcontext";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { useEffect } from "react";
import nProgress from 'nprogress';
import 'nprogress/nprogress.css'; 
import { usePathname, useSearchParams } from 'next/navigation';

export default function ClientLayout({ children }) {

    const pathname = usePathname();
    const searchParams = useSearchParams();
  
    useEffect(() => {
      nProgress.start(); 
  
      // Simulate loading delay
      const timeout = setTimeout(() => {
        nProgress.done(); 
      }, 100); // Adjust delay as needed
  
      return () => {
        clearTimeout(timeout);
        nProgress.done(); 
      };
    }, [pathname, searchParams]);

  return (
    <div>
        <SearchProvider>
          <NavBar/>
          <main className="relative">
              {children}
              <Analytics/>
              <SpeedInsights/>
          </main>
        </SearchProvider>
    </div>
  );
}
