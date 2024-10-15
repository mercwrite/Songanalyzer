import { motion } from "framer-motion";

export default function SongInfo(props){

    //Display the song name, album name, album image, and artist names for the track
    const imgSrc = props.img;
    const songName = props.songName;
    const artists = props.artists[0].name;
    const album = props.album;

    const variants = {
        hidden: { opacity: 0, y: 35, rotateX: 15 },
        visible: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          transition: {
            duration: 0.8,
            ease: "easeOut",
          },
        },
      };

    return (
        <motion.div
        className="p-0"
        initial="hidden"
        animate="visible"
        variants={variants}
        >
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
      </motion.div>
    )

}