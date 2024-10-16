'use client';
import { useParams } from 'next/navigation';

export default function TrackPage(){
    const params = useParams();
    const { id } = params;

    return (
        <div className="p-8">
        <h1>Track ID: {id}</h1>
        </div>
    );
}