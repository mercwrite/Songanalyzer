import Link from "next/link";
import Image from "next/image";
export default function Lyrics(props){

    const songUrl = props.lyricsurl;
    const lyricsId = props.lyricsId;


    return(
    <div>
       <Link
        href={songUrl}
        >
            <Image
            alt="Open genius"
            width={32}
            height={32}
            src={"/images/genius_logo.png"}
            />
        </Link>
    </div>
    );
}