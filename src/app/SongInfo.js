export default function SongInfo(props){

    //Display the song name, album name, album image, and artist names for the track
    const imgSrc = props.img;
    const songName = props.songName;
    const artists = props.artists[0].name;
    const album = props.album;

    return (
        <div>
            <h1 className="font-bold">Song: {songName} - {artists}</h1>
            <h1 className="font-bold">Album: {album} </h1>
            <img src={imgSrc}/>
            
        </div>
    )

}