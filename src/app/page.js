// app/page.js
import SongInput from './SongInput';
export default function Home() {
    //Authenticate the client and get the tokens
    const token = process.env.ACCESS_TOKEN;
    
    return (
    <div>
        <SongInput accessToken={token}/>
    </div>
    
    );
}