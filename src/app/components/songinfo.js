'use client';
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from 'react';
import ColorThief from 'colorthief';
import Lyrics from "./lyrics";
import Link from "next/link";
import Image from "next/image";

export default function SongInfo(props){

    //Display the song name, album name, album image, and artist names for the track
    const imgSrc = props.img;
    const songName = props.songName;
    const artists = props.artists;
    const album = props.album;
    const lyricsId = props.lyricsId;
    const lyricsUrl = props.lyricsUrl;
    const songUrl = props.songUrl;

    const [dominantColor, setDominantColor] = useState([0, 0, 0]); // RGB color
    const imgRef = useRef(null);

    useEffect(() => {
        const colorThief = new ColorThief();
        const img = imgRef.current;
    
        if (img && img.complete) {
          const color = colorThief.getColor(img, 5);
          setDominantColor(color);
        } else {
          img.addEventListener("load", () => {
            const color = colorThief.getColor(img, 3);
            setDominantColor(color);
          });
        }
      }, []);

      useEffect(() =>{
        props.onColor(`rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`);
      }, [dominantColor]);


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
      <div className="relative items-center min-h-screen">
      <motion.div
        className="p-0"
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        <div className="flex flex-col items-center mx-5 bg-spotify-bg shadow-xl rounded-lg p-6 max-w-sm">
          <div className="relative w-full">
            <img
              ref={imgRef}
              src={imgSrc}
              alt={`${album} Album Cover`}
              className="w-full h-auto rounded-lg object-cover"
              crossOrigin="anonymous"
            />
          </div>
          <div className="mt-4 text-left w-full space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-white">{songName}</h2>
            <p className="text-spotify-placeholder text-md">{artists.map((artist) => artist.name).join(', ')}</p>
            <p className="text-spotify-placeholder text-sm">{album}</p>
            <div className="flex mt-4 space-x-4 w-full">
              <div className="flex items-center">
                <Link href={songUrl} rel="noopener noreferrer">
                  <Image
                    alt="Open Spotify link"
                    width={32}
                    height={32}
                    src="/images/Spotify_Primary_Logo_RGB_Green.png"
                  />
                </Link>
              </div>
              {lyricsId != null && (
                <div className="flex items-center">
                  <Link href={lyricsUrl} rel="noopener noreferrer">
                    <Image
                      alt="Open Genius"
                      width={32}
                      height={32}
                      src="/images/genius_logo.png"
                    />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
    )

}
