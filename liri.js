require("dotenv").config();
var axios = require("axios");
var fs = require("fs");
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

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

function spotifyThis() {

  var songName = process.argv.slice(3).join("+");

  var queryUrl;
  console.log(spotify);

  axios.get(queryUrl).then(
      function (response) {
        console.log("\nTitle: " + response.data.Title + "\nRelease Date: " + response.data.Year + "\nIMDB Rating: " + response.data.Ratings[0].Value + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\nThis movie was produced in: " + response.data.Country + "\nLanguages: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nMain Actors: " + response.data.Actors);
      })
    .catch(function (error) {
      if (error.response) {
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });

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
    if (process.argv[3] == null){
      movieThis("Mr.Nobody");
    }else{
      movieThis(process.argv.slice(3).join("+"));
    }
  break;
  
  case "concert-this":
    if (process.argv[3] == null){
      concertThis("Thrice");
    }else{
      concertThis(process.argv.slice(3).join("+"));
    }
  break;

  case "spotify-this-song":
    spotifyThis();
  break;

  case "do-what-it-says":
    dowhatitSays();
  break;

  default:
    console.log("\nTry typing 'movie-this' , 'concert-this' , 'spotify-this-song' , first and then a related search term.")
}



// liriBot();