import { motion } from "framer-motion";


export default function SongStats(props){
    
    const key = props.songKey;
    const bpm = props.bpm;
    const duration = props.duration;
    const mode = props.mode;
    
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

    return(
        <motion.div
        className="grid grid-cols-2 gap-4 p-0"
        initial="hidden"
        animate="visible"
        variants={variants}
        >
            <div className="relative grid grid-cols-2 gap-4 p-10">
                <div className="flex flex-col justify-center items-center w-48 h-48 bg-spotify-bg rounded-full shadow-lg">
            <h3 className="text-sm text-spotify-placeholder mb-2">Key</h3>
            <p className="text-4xl font-bold text-white">{key}</p>
        </div>
        <div className="flex flex-col justify-center items-center w-48 h-48 bg-spotify-bg rounded-full shadow-lg">
            <h3 className="text-sm text-spotify-placeholder mb-2">Mode</h3>
            <p className="text-4xl font-bold text-white">{mode}</p>
        </div>
        <div className="flex flex-col justify-center items-center w-48 h-48 bg-spotify-bg rounded-full shadow-lg">
            <h3 className="text-sm text-spotify-placeholder mb-2">Duration</h3>
            <p className="text-4xl font-bold text-white">{duration}</p>
        </div>
        <div className="flex flex-col justify-center items-center w-48 h-48 bg-spotify-bg rounded-full shadow-lg">
            <h3 className="text-sm text-spotify-placeholder mb-2">BPM</h3>
            <p className="text-4xl font-bold text-white">{bpm}</p>
        </div>
            </div>
    </motion.div>
    );
}
