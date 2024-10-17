'use client';
import { useParams } from 'next/navigation';
import SongDisplay from '@/app/components/songdisplay';

export default function TrackPage(){
    const params = useParams();
    const { id } = params;

    return (
        <div className="">
            <SongDisplay key={SongDisplay} songId={id}/>
        </div>
    );
}