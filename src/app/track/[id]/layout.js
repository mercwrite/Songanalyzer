export const metadata = {
    title: "Song information",
    description: "Key, Mode, BPM, and duration for the song",
};

export default function TrackLayout({children}){
    return(
        <>
            <main>
                {children}
            </main>
        </>
    );
}