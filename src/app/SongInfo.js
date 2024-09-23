export default function SongInfo(props){

    //Display the song name, album name, album image, and artist names for the track
    const imgSrc = props.img;
    const songName = props.songName;

    return (
        <div>
            <img src={imgSrc}/>
            <h1 className="font-bold">{props.songName}</h1>
        </div>
    )

}