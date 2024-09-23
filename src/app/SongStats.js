export default function SongStats(props){
    
    const key = props.songKey;
    const bpm = props.bpm;
    const duration = props.duration;
    const mode = props.mode;
    
    return(
        <div>
           <li>
            Key: {key}
           </li>
           <li>
            Mode: {mode}
           </li>
           <li>
            BPM: {bpm}
           </li>
           <li>
            Duration: {duration}
           </li>
        </div>
    );
}