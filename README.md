Songanalyzer is a Next.js Application that helps producers find information for any song on Spotify. Powered by the Spotify Web API for information on song features, song search, and general song info. Powered by the Genius API to find lyrics pages. 

***CURRENT FEATURES***
* Search by Name of Song
* Display Key, Mode, Duration, and BPM
* Display album cover, artist name, and album name
* Responsive, mobile-friendly UI
* Link to open song on Spotify
* Link to open lyrics on Genius

***PLANNED FEATURES***
* Display songs also in the album
* Display the top songs globally
* Spotify preview embedding using Iframes
* Drag and drop any audio file (.wav and .mp3) for analysis using a CNN global key estimation model

***IMPORTANT NOTES***:
1. At the moment, it isn't possible to display lyrics on the web page itself without resorting to unethical
web scraping practices mainly due to licensing costs. However, the feature might come in the future if the application is successful enough to where I can use the Musixmatch API to get lyrics legally.

2. Certain songs may be unavailable depending on whether or not they are in the Spotify database, I plan to address this in the future by creating my own program for local audio analysis (i.e. dragging and dropping an audio file into the application and analyzing the features of the song in real-time).

3. The current methodology for getting Genius lyrics links is prone to errors on certain songs, and it is based on the "Instrumentalness" of the song as determined by Spotify. This means some songs that have lyrics may not display a link to them, and some songs may link to the wrong lyrics page. Currently, I am not sure of a workaround for this issue, but I am aware of it and will try to mitigate this in future updates.


***SCREENSHOTS***
![Screenshot (881)](https://github.com/user-attachments/assets/491692af-f5fe-47fa-8a51-247530541ef9)

![Screenshot (882)](https://github.com/user-attachments/assets/fd7fbf95-e770-4bcf-bd59-66793ad5fbf9)

![Screenshot (884)](https://github.com/user-attachments/assets/11e3008f-70a7-464d-a30e-f03a9a7e912e)

Created by Mark Wright, currently in development

