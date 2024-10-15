export default function SongInfo(props){

    //Display the song name, album name, album image, and artist names for the track
    const imgSrc = props.img;
    const songName = props.songName;
    const artists = props.artists[0].name;
    const album = props.album;

    return (
        <div className="flex flex-col items-center bg-spotify-bg shadow-xl rounded-lg p-6 max-w-sm">
        <div className="relative">
          <img
            src={imgSrc}
            alt={`${album} Album Cover`}
            className="w-112 h-112 rounded-lg object-cover"
          />
        </div>
        <div className="mt-4 text-left w-full">
          <h2 className="text-2xl font-bold text-white">{songName}</h2>
          <p className="text-spotify-placeholder text-md">{artists}</p>
          <p className="text-spotify-placeholder text-sm">{album}</p>
        </div>
      </div>
    )

}