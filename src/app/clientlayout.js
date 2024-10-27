'use client';
import NavBar from "./components/navbar";
import { SearchProvider } from "./context/searchcontext";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Suspense } from "react"; 
import Footer from "./components/footer";


function ClientLayoutComponent({ children }){
  
    return (
        <SearchProvider>
            <NavBar/>
            <main className="relative">
                {children}
                <Analytics/>
                <SpeedInsights/>
                <footer>
                    <Footer/>
                </footer>
            </main>
        </SearchProvider>
    )
}

export default function ClientLayout({ children }) {

    
  return (
    <Suspense>
        <ClientLayoutComponent>
            {children}
        </ClientLayoutComponent>
    </Suspense>
  );
}
