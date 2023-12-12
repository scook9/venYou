//need to fix and probably link JQuery, variables from fetch take longer to populate values

function generateMeal() {
  var mainIngredient = document.getElementById("mainIngredient").value;
  var foodCategory = document.getElementById("foodCategory").value;
  var foodRegion = document.getElementById("foodRegion").value;
  let mealApiUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

  if (mainIngredient !== "") {
    mealApiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${mainIngredient}`;
  } else if (foodCategory !== "") {
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
      //var mealLink = $("#createMealLink")
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
  var mainDrinkIngredient = document.getElementById(
    "mainDrinkIngredient"
  ).value;
  let drinkApiUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

  if (drinkCategory !== "") {
    drinkApiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drinkCategory}`;
  } else if (drinkGlass !== "") {
    drinkApiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${drinkGlass}`;
  } else if (mainDrinkIngredient !== "") {
    drinkApiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${mainDrinkIngredient}`;
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

      var drinkLink = $("#createDrinkLink");
      var drinkImg = $("#createDrinkImg");

      drinkName.text(randomDrink["strDrink"]);
      drinkLink.text(randomDrink["strDrinkThumb"]);

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
  // localStorage.setItem()

  fetch(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=2023&sort_by=popularity.desc&with_genres=" +
      genre,
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response));
}
if (localStorage.getItem("randomMeal")) {
  var mealName = $("#createMealName");
  var mealLink = $("#createMealLink");
  mealName.text(JSON.parse(localStorage.getItem("randomMeal"))["strMeal"]);
  mealLink.text(JSON.parse(localStorage.getItem("randomMeal"))["idMeal"]);

  var drinkName = $("#createDrinkName");
  var drinkLink = $("#createDrinkLink");
  drinkName.text(JSON.parse(localStorage.getItem("randomDrink"))["strDrink"]);
  drinkLink.text(JSON.parse(localStorage.getItem("randomDrink"))["idDrink"]);
}
