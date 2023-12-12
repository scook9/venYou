//need to fix and probably link JQuery, variables from fetch take longer to populate values

function generateMeal() {
  var foodCategory = document.getElementById("foodCategory").value;
  var foodRegion = document.getElementById("foodRegion").value;
  let mealApiUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

  if (foodCategory !== "") {
    mealApiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${foodCategory}`;
  } else if (foodRegion !== "") {
    mealApiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${foodRegion}`;
  }
  fetch(mealApiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var meals = data.meals;

      if (meals.length > 0) {
        var randomMeal = meals[Math.floor(Math.random() * meals.length)];
        localStorage.setItem("randomMeal", JSON.stringify(randomMeal));
        console.log("Random Meal:", randomMeal);
      }
      var mealName = $("#createMealName");
      var mealImg = $("#createMealImg");
      var mealLabel = $("#titleLabelMeal")
      //var mealLink = $("#createMealLink")
      mealLabel.text("For Dinner Tonight: ")
      mealName.text(randomMeal["strMeal"]);
      mealImg.attr("src", randomMeal["strMealThumb"]);
      mealImg.attr("alt", "Img of meal recipe");
      mealImg.width(100);
      mealImg.height(100);
    });
}

function generateDrink() {
  var drinkCategory = document.getElementById("drinkCategory").value;
  var drinkGlass = document.getElementById("drinkGlass").value;

  let drinkApiUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

  if (drinkCategory !== "") {
    drinkApiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drinkCategory}`;
  } else if (drinkGlass !== "") {
    drinkApiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${drinkGlass}`;
  }

  fetch(drinkApiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var drinks = data.drinks;

      if (drinks.length > 0) {
        var randomDrink = drinks[Math.floor(Math.random() * drinks.length)];
        localStorage.setItem("randomDrink", JSON.stringify(randomDrink));
      } else {
        console.log("No drinks found for the specified criteria.");
      }

      var drinkName = $("#createDrinkName");
      var drinkLabel = $("#titleLabelDrink")
      var drinkLink = $("#createDrinkLink");
      var drinkImg = $("#createDrinkImg");
      drinkLabel.text("For Drinks: ");
      drinkName.text(randomDrink["strDrink"]);
      drinkImg.attr("src", randomDrink["strDrinkThumb"]);
      drinkImg.attr("alt", "Image of drink recipe");
      drinkImg.width(100);
      drinkImg.height(100);
    });
}

function generateDate() {
  generateMeal();
  generateDrink();
  generateMovie();
}

function generateMovie() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYWZhY2EzZTE4ZWExYzg1ZTg2YjMxMDNiYWNiMzcyMyIsInN1YiI6IjY1Nzc1NWZiZWM4YTQzMDBlMDlhMGY1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8v5Z0VqlnnmVGtURD871qN8SwL9ZHnQg7s8YPibUrfs",
    },
  };

  var genre = document.getElementById("movie-select").value;

  fetch(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=2023&sort_by=popularity.desc&with_genres=" +
      genre,
    options
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var movies = data.results;

      if (movies.length > 0) {
        var randomMovie = movies[Math.floor(Math.random() * movies.length)];
        localStorage.setItem("randomMovie", JSON.stringify(randomMovie));

      } else {
        console.log("No movies found for the specified criteria.");
      }
      var movieName = $("#createMovieName");

      var movieLabel = $("#titleLabelMovie")

      var movieImg = $("#createMovieImg");
      movieLabel.text("To Watch: ");
      movieName.text(randomMovie.title);
      movieImg.attr(
        "src",
        "https://image.tmdb.org/t/p/w600_and_h900_bestv2" +
          randomMovie.poster_path
      );
      movieImg.attr("alt", "Movie poster");
      movieImg.width(100);
      movieImg.height(100);
    });
}
if (localStorage.getItem("randomMeal")) {
  var mealName = $("#createMealName");
  var mealLink = $("#createMealLink");
  mealName.text(JSON.parse(localStorage.getItem("randomMeal"))["strMeal"]);
  mealLink.text(JSON.parse(localStorage.getItem("randomMeal"))["idMeal"]);
}
if (localStorage.getItem("randomDrink")) {
  var drinkName = $("#createDrinkName");
  var drinkLink = $("#createDrinkLink");
  drinkName.text(JSON.parse(localStorage.getItem("randomDrink"))["strDrink"]);
  drinkLink.text(JSON.parse(localStorage.getItem("randomDrink"))["idDrink"]);
}

if (localStorage.getItem("randomMovie")) {
  var movieName = $("#createMovieName");
  var movieImg = $("#createMovieImg");
  movieName.text(JSON.parse(localStorage.getItem("randomMovie"))["title"]);
  movieImg.attr(
    "src",
    "https://image.tmdb.org/t/p/w600_and_h900_bestv2" +
    JSON.parse(localStorage.getItem("randomMovie"))["poster_path"]
  );
  movieImg.attr("alt", "Movie poster");
  movieImg.width(100);
  movieImg.height(100);

}
