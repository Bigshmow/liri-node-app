# liri-node-app
# LIRI Bot

### Overview

LIRI is a Language Interpretation and Recognition Interface that uses Axios to fetch data from the APIs "Bands in Town", and "OMDBapi" and display the results directly to the terminal.  LIRI is also capable of retrieving data and displaying results from the Spotify REST API via the Node-Spotify-API methods.
As a bonus, LIRI writes (appends) all results to a log.txt file for review.

# Let's dive in with how to use the app!

## There are 3 main commands to which LIRI can respond:

### 1. "concert-this" + 'artist/band name here'
   - This command will search the "Bands in Town" API and render the following information in terminal:
        - Name of the venue
        - Venue location
        - Date of the Event (displayed in "MM/Do/YYYY" format via Moment.js)
   - If no '<artist/band name here>' is provided then the app will produce results for the band "Thrice"

#### Demonstration:
![concert-this](https://user-images.githubusercontent.com/49423028/64043849-48a6f400-cb1a-11e9-943d-6c80f4020845.gif)

### 2. "spotify-this-song" + 'song name here'
   - This command will use the Node-Spotify-API to produce the following information:
        - Artist
        - The song's name
        - A preview link of the song from Spotify
        - The album that the song is from
   - If no '<song name here>' is provided the program will default to "The Sign"

#### Demonstration:
![spotify-this](https://user-images.githubusercontent.com/49423028/64044207-1cd83e00-cb1b-11e9-979c-bed009b21c51.gif)

### 3. "movie-this" + 'movie name here'
   - With this command LIRI will output:
        - Title of the movie
        - Year the movie came out
        - IMDB Rating of the movie
        - Rotten Tomatoes Rating of the movie
        - Country where the movie was produced
        - Languages the movie is available in
        - Plot of the movie
        - Actors in the movie
   - If the user does not supply a '<movie name here>' then LIRI searches for "Mr. Nobody"
    
#### Demonstration:
![movie-this](https://user-images.githubusercontent.com/49423028/64044066-cec33a80-cb1a-11e9-9de1-a00a416e144b.gif)

### LIRI can also read from a .txt file
   - by passing LIRI the command "do-what-it-says" the program will return info based on the contents of "random.txt"

#### Demonstration:
![do-what-it-says](https://user-images.githubusercontent.com/49423028/64052998-6df52b80-cb35-11e9-8d2d-6952b371b0a4.gif)

## Bonus

### LIRI writes (appends) all results to log.txt file for review
   - using the Node.js FS module LIRI appends the log.txt file with the requested data.

#### Demonstration:
![log-gif](https://user-images.githubusercontent.com/49423028/64053948-9bdc6f00-cb39-11e9-845d-3b6815ac116b.gif)

