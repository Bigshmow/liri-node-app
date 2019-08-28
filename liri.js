require("dotenv").config();
var axios = require("axios");
var fs = require("fs");
var keys = require("./keys.js");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var search = process.argv[2];

function concertThis(artist) {

  var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=trilogy";

  axios.get(queryUrl).then(
    function (response) {
      var data = response.data;
      var artistData = [
        "\n" + artist.split("+").join(" ") + " is playing at...",
        "Venue: " + data[0].venue.name,
        "Location: " + data[0].venue.city + ", " + data[0].venue.region,
        "On: " + moment(data[0].datetime).format('MMMM Do YYYY'),
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
    var data = response.tracks.items[0];
    var songData = [
      console.log("\nArtist: " + response.tracks.items[0].artists[0].name),
      console.log("Song Name: " + data.name),
      console.log("Album: " + response.tracks.items[0].album.name),
      console.log("Preview the track here: " + response.tracks.items[0].preview_url),
      "\nArtist: " + response.tracks.items[0].artists[0].name,
      "Song Name: " + data.name,
      "Album: " + response.tracks.items[0].album.name,
      "Preview the track here: " + response.tracks.items[0].preview_url,
    ].join("\n");
    fs.appendFile("log.txt", songData, function (err){
      if (err) console.log(err);
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
        "Release Year: " + data.Year,
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
    fs.readFile( 'random.txt' , 'utf8', function (err, data){
      if (err) {
        return console.log(err)
      }else{
        var splitData = data.split(",");
        console.log("\nLet's " + splitData[0]);
        funct = splitData[0];
        switch (funct){
          case "concert-this":
              artist = splitData.slice(1);
              concertThis(artist);
          break;

          case "spotify-this-song":
              songName = splitData.slice(1);
              spotifyThis(songName);
          break;

          case "movie-this":
              movieName = splitData.slice(1);
              movieThis(movieName);
          break;

          default:
              console.log("\nTry typing 'movie-this' , 'concert-this' , 'spotify-this-song' , first and then a related search term.")
        }
      }
    })
}

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
      spotifyThis(process.argv[3] = "The+Sign");
    }else {
      spotifyThis(process.argv.slice(3).join("+"));
    }
    break;

  case "do-what-it-says":
    dowhatitSays();
    break;

  default:
    console.log("\nTry typing 'movie-this' , 'concert-this' , 'spotify-this-song' , first and then a related search term.")
}