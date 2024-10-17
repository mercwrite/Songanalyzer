import { Suspense } from "react";

export default function NotFound () {
    return (
    <Suspense>
        <div className="flex flex-col items-center justify-center h-screen pt-16 bg-graybg">
            <h1 className="text-6xl font-bold text-white">
                404 Page not found
            </h1>
        </div>
    </Suspense>
    );
}