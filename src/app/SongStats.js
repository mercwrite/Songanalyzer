export default function SongStats(props){
    
    const key = props.songKey;
    const bpm = props.bpm;
    const duration = props.duration;
    const mode = props.mode;
    
    return(
        <div>
           <h1 className=" text-2xl font-bold"> 
            Key: {key}
           </h1>
           <h1 className="text-2xl font-bold">
            Mode: {mode}
           </h1>
           <h1 className="text-2xl font-bold">
            BPM: {bpm}
           </h1>
           <h1 className="text-2xl font-bold">
            Duration: {duration}
           </h1>
        </div>
    );
}