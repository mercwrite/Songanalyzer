Songanalyzer is a Next.js Application that helps producers find information for any song on Spotify. Utilizes the Spotify API for information on song features, song search, and general song info. Utilizes the Genius API to find lyrics pages.

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
* Display multiple pages of search results
* Spotify preview embedding using Iframes
* Drag and drop any audio file (.wav and .mp3) for analysis

***IMPORTANT NOTES***:
1. At the moment, it isn't possible to display lyrics on the web page itself without resorting to unethical
web scraping practices mainly due to licensing costs. However, the feature might come in the future if the application is successful enough to where I can use the Musixmatch API to get lyrics legally.

2. Certain songs may be unavailable depending on whether or not they are in the Spotify database, I plan to address this in the future by creating my own program for local audio analysis (i.e. dragging and dropping an audio file into the application and analyzing the features of the song in real-time).

3. The current methodology for getting Genius lyrics links is prone to errors on certain songs, and it is based on the "Instrumentalness" of the song as determined by Spotify. This means some songs that have lyrics may not display a link to them, and some songs may link to the wrong lyrics page. Currently, I am not sure of a workaround for this issue, but I am aware of it and will try to mitigate this in future updates.


***SCREENSHOTS***
![Screenshot (878)](https://github.com/user-attachments/assets/d89d4472-535d-4e2a-ab5d-61b354846630)
![Screenshot (876)](https://github.com/user-attachments/assets/97faecb4-7bee-4dae-93e8-96762895aab7)
![Screenshot (877)](https://github.com/user-attachments/assets/31baaa64-1142-4530-8b26-099913d2a551)
![Screenshot (879)](https://github.com/user-attachments/assets/f34201bb-f99e-4729-8527-4d3f249f9e51)
![Screenshot (880)](https://github.com/user-attachments/assets/c39f53d4-852c-4c5f-b8e3-ec7f233321ef)

Created by Mark Wright, currently in development

