

export const metadata = {
    title: "Search results",
    description: "Search results across 100M+ songs",
};

export default function SearchLayout({children}){

    return(
        <>
            <main className="min-h-screen">
                {children}
            </main>
        </>
    );

}