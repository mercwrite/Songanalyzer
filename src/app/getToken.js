import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';


export async function getToken(){;
    const [refreshToken, setRefreshToken] = useState('');
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    //Get the access token
        const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', null, {
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            params: {
                grant_type: 'client_credentials',
    
            },
        });
        //Try storing the tokens in storage
        try{
            const saveToLocalStorage = e =>{
                e.preventDefault;
                const tokens = [tokenResponse.data.access_token, tokenResponse.data.refresh_token];
                localStorage.setItem("refresh_token", tokens[1]);
                localStorage.setItem("access_token", tokens[0]);
            }
            saveToLocalStorage;
        } catch{
            //If there is an error, refresh the token and store the new tokens
            useEffect(() => {
                let refresh_token;
                refresh_token = localStorage.getItem('refresh_token');
                setRefreshToken(refresh_token)
            }, [])
            const refreshResponse = await axios.post('https://accounts.spotify.com/api/token', null, {
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                params: {
                    grant_type: 'refresh_token',
                    refresh_token: `${refreshToken}`,
        
                },
            });

            const saveToLocalStorage = e =>{
                e.preventDefault;
                const tokens = [tokenResponse.data.access_token, tokenResponse.data.refresh_token];
                localStorage.setItem("refresh_token", tokens[1]);
                localStorage.setItem("access_token", tokens[0]);
            }
            saveToLocalStorage;
        }


}