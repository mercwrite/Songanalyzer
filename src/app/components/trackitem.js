import Link from "next/link";
import Image from "next/image";
export default function TrackItem (props){

    const track = props.track;



    return (

        <div key={track.id} className="flex w-[95%] max-w-[95%] bg-graybg hover:bg-spotify-hover transition duration-100 rounded-lg max-h-32 overflow-hidden mx-auto transform hover:scale-105">
        {track.album.images[0] && <img
            src={track.album.images[0].url}
            width={128}
            height={128}
            className="p-2 rounded-lg flex-shrink-0"
            alt="Album image"
        />}
         {!track.album.images[0] && <img
            src={'/images/noalbumimage.png'}
            width={128}
            height={128}
            className="p-2 rounded-lg flex-shrink-0"
            alt="Album image"
        />}
        <div className="flex flex-col justify-center flex-grow p-2 overflow-hidden">
            <Link href={`/track/${track.id}`}>
                <h2 className="text-white text-xl font-bold truncate whitespace-nowrap">
                    {track.name}
                </h2>
            </Link>
            <p className="text-spotify-placeholder text-md truncate whitespace-nowrap">
                {track.artists.map((artist) => artist.name).join(', ')}
            </p>
        </div>
        <div className="flex items-center justify-end p-2 flex-shrink-0">
            <Link href={track.external_urls.spotify} className="flex items-center">
                <Image
                    alt="Open Spotify link"
                    width={32}
                    height={32}
                    src="/images/Spotify_Primary_Logo_RGB_Green.png"
                    className="flex-shrink-0"
                />
            </Link>
        </div>
    </div>
    );
}