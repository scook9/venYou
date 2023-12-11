//need to fix and probably link JQuery, variables from fetch take longer to populate values

function generateMeal() {
  var mealIngredient = document.getElementById("meal-select").value;
  console.log(mealIngredient);
  var foodURL =
    "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + mealIngredient;

  fetch(foodURL)
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
      var mealLink = $("#createMealLink");
      mealName.text(randomMeal["strMeal"]);
      mealLink.text(randomMeal["strMealThumb"]); 
    });
}

function generateDrink() {
  var drinkGlass = document.getElementById("drink-select").value;
  console.log(drinkGlass);
  var drinkURL =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=" + drinkGlass;

  fetch(drinkURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var drinks = data.drinks;
      localStorage.setItem("drinks", JSON.stringify(drinks));
      if (drinks.length > 0) {
        var randomDrink = drinks[Math.floor(Math.random() * drinks.length)];

        console.log("Random Drink:", randomDrink);
      } else {
        console.log("No drinks found for the specified criteria.");
      }

      var drinkName = $("#createDrinkName");
      var drinkLink = $("#createDrinkLink")
      drinkName.text(randomDrink["strDrink"]);
      drinkLink.text(randomDrink["strDrinkThumb"]);
    });
}

function generateMovie() {}

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

// localStorage.getItem()
console.log(JSON.stringify(localStorage.getItem("randomMeal")));

// console.log(JSON.stringify(localStorage.getItem("randomMeal"))[\"strMeal\"]);

var mealName = $("#createMealName");
var mealLink = $("#createMealLink");
mealName.text(JSON.stringify(localStorage.getItem("randomMeal"))["strMeal"]);
mealLink.text(JSON.stringify(localStorage.getItem("randomMeal"))["strMealThumb"]);
// JSON.parse("randonMeal")














































