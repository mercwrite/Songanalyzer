'use client';
import { useParams } from 'next/navigation';
import SongDisplay from '@/app/components/songdisplay';
import { useRouter } from "next/navigation";

export default function TrackPage() {
    const params = useParams();
    const router = useRouter();
    const { id } = params || {};

    // Check if id exists to avoid rendering with undefined songId
    if (!id) {
        router.push("/song-not-found");
    }

    return (
        <div>
            <SongDisplay songId={id} />
        </div>
    );
}
