require("dotenv").config();
var axios = require("axios");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

function concertThis(artist) {

  var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=trilogy";

  axios.get(queryUrl).then(
    function (response) {
      var data = response.data;
      var artistData = [
        "\n" + artist.split("+").join(" ") + " is playing at...",
        "Venue: " + data[0].venue.name,
        "Location: " + data[0].venue.city + ", " + data[0].venue.region,
        "On: " + data[0].datetime,
      ].join("\n");
      fs.appendFile("log.txt", artistData, function (err) {
        if (err) console.log(err);
        console.log(artistData);
      })
    }
  )
};

function spotifyThis(songName) {

  spotify
  .search({type: 'track', query: songName , limit: 1})
  .then(function (response) {
    console.log("\nArtist(s): " + response.tracks.items[0].artists[0].name);
    var data = response.tracks.items[0];
    var songData = [
      "\nArtist(s): " + data.artists,
      "Song name: " + response.tracks.items[0].artists,
      // "Preview Link: " + data.preview_url,
    ].join("\n");
    fs.appendFile("log.txt", songData, function (err){
      if (err) console.log(err);
        console.log(songData);
    })
  })
}

function movieThis(movieName) {

  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  axios.get(queryUrl).then(
    function (response) {
      var data = response.data;
      var movieData = [
        "\nTitle: " + data.Title,
        "Release Date: " + data.Year,
        "IMDB Rating: " + data.Ratings[0].Value,
        "Rotten Tomatoes Rating: " + data.Ratings[1].Value,
        "This movie was produced in: " + data.Country,
        "Languages: " + data.Language,
        "Plot: " + data.Plot,
        "Main Actors: " + data.Actors,
      ].join("\n");
      fs.appendFile("log.txt", movieData, function (err) {
        if (err) console.log(err);
        console.log(movieData);
      })
    })
}

function dowhatitSays() {

}

var search = process.argv[2];

switch (search) {
  case "movie-this":
    if (process.argv[3] == null) {
      movieThis("Mr.Nobody");
    } else {
      movieThis(process.argv.slice(3).join("+"));
    }
    break;

  case "concert-this":
    if (process.argv[3] == null) {
      concertThis("Thrice");
    } else {
      concertThis(process.argv.slice(3).join("+"));
    }
    break;

  case "spotify-this-song":
    if (process.argv[3] == null) {
      spotifyThis("The Sign")
    }
    spotifyThis(process.argv.slice(3).join("+"));
    break;

  case "do-what-it-says":
    dowhatitSays();
    break;

  default:
    console.log("\nTry typing 'movie-this' , 'concert-this' , 'spotify-this-song' , first and then a related search term.")
}