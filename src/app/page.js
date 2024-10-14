import SongInput from './SongInput';
import { SessionProvider } from "next-auth/react"

export default function Home() {

    return (
    <div className='p-12'>
        <SongInput/>
    </div>
    
    );
}