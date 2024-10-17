import Link from "next/link";
import Image from "next/image";
export default function TrackItem (props){

    const track = props.track;

    return (
        <div key={track.id} className="flex relative space-x-4 transition ease-in-out bg-graybg hover:bg-spotify-hover hover:scale-105 rounded-lg w-9/10 duration-100">
                <img
                src={track.album.images[0].url}
                width={128}
                height={128}
                className="float-left p-1 rounded-lg"
                alt="Album image"
                />
                <div className="relative float-right top-8">
                    <Link href={`/track/${track.id}`}>
                    <h2 className="text-white text-2xl">{track.name}</h2>
                    </Link>
                    <p
                    className="text-spotify-placeholder text-md"
                    >{track.artists.map((artist) => artist.name).join(', ')}</p>
                </div>
        </div>
    );
}