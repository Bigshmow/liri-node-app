require("dotenv").config();
var axios = require("axios");
var fs = require("fs");
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

function concertThis () {

  var artist = process.argv.slice(3).join("+");

  var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=trilogy";

  axios.get(queryUrl).then(
    function(response) {
      var data = response.data;
      var artistData = [
        "\n" + artist + " is playing at...",
        "Venue: " + data[0].venue.name,
        "Location: " + data[0].venue.city + ", " + data[0].venue.region,
        "On: " + data[0].datetime,
      ].join("\n\n");
    fs.appendFile("log.txt", artistData, function(err){
      if (err) throw err;
      console.log(artistData);
    }
  )}
)};

function spotifyThis () {

var songName = process.argv.slice(3).join("+");

var queryUrl;
console.log(spotify);

axios.get(queryUrl).then(
  function(response) {
    console.log("Title: " + response.data.Title + "\nRelease Date: " + response.data.Year + "\nIMDB Rating: " + response.data.Ratings[0].Value + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\nThis movie was produced in: " + response.data.Country + "\nLanguages: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nMain Actors: " + response.data.Actors);
  })
  .catch(function(error) {
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

function movieThis () {

var movieName = process.argv.slice(3).join("+");

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log("Title: " + response.data.Title + "\nRelease Date: " + response.data.Year + "\nIMDB Rating: " + response.data.Ratings[0].Value + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\nThis movie was produced in: " + response.data.Country + "\nLanguages: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nMain Actors: " + response.data.Actors);
  })
  .catch(function(error) {
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

function dowhatitSays () {

}

function liriBot () {
    if (process.argv[2] === "movie-this") {
        // console.log("movies");
        movieThis();
    };

    if (process.argv[2] === "concert-this") {
        console.log("concerts");
        concertThis();
    };

    if (process.argv[2] === "spotify-this-song") {
        console.log("songs");
        spotifyThis();
    };

    if (process.argv[2] === "do-what-it-says") {
        console.log("I want it that way");
        dowhatitSays();
    }
};

liriBot();