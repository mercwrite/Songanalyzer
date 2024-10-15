export default function SongStats(props){
    
    const key = props.songKey;
    const bpm = props.bpm;
    const duration = props.duration;
    const mode = props.mode;
    
    return(
        <div className="relative">
           <p className=" text-4xl font-bold"> 
            Key: {key}
           </p>
           <p className="text-4xl font-bold top-2">
            Mode: {mode}
           </p>
           <p className="text-4xl font-bold">
            BPM: {bpm}
           </p>
           <p className="text-4xl font-bold">
            Duration: {duration}
           </p>
        </div>
    );
}