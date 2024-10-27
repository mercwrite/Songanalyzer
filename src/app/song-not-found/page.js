import { Suspense } from "react";

export default function Page () {
    return (
    <Suspense>
        <div className="flex flex-col items-center justify-center h-screen pt-12 bg-graybg p-12">
            <h1 className="text-4xl font-bold text-white text-center">
                Oops! It seems like this song is unavailable or doesn&apos;t exist.
            </h1>
        </div>
    </Suspense>
    );
}