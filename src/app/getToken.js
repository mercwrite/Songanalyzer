"use server";
import axios from 'axios';
import { cookies } from 'next/headers';
import moment from 'moment';

export async function getToken(){
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    //Get the access token if there isnt one then store it in a cookie
    if(!cookies().has('access_token')){
        const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', null, {
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            params: {
                grant_type: 'client_credentials',
    
            },
        });
        console.log("First part");
        await cookies().set('access_token', tokenResponse.data.access_token);
        let tokenExpiresTime = moment().add(tokenResponse.data.expires_in, 's');
        tokenExpiresTime = tokenExpiresTime.subtract(1, 's');
        cookies().set('expires_time', tokenExpiresTime);
    }else{
        //if the cookie is expired, get a new one
        if(!(moment() < cookies().get('expires_time')) || cookies.get('access_token') === ''){
            const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', null, {
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                params: {
                    grant_type: 'client_credentials',
        
                },
            });
            await cookies().set('access_token', tokenResponse.data.access_token);
            let tokenExpiresTime = await moment().add(tokenResponse.data.expires_in, 's');
            tokenExpiresTime = tokenExpiresTime.subtract(1, 's');
            cookies().set('expires_time', tokenExpiresTime);
        }

    }

    return;

}