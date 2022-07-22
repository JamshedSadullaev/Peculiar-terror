const searchBtnF = document.getElementById('search-btnF');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');

searchBtnF.addEventListener('click', createMealList);
mealList.addEventListener('click', MealRecipe);


function createMealList(){
    
    let searchInputF = document.getElementById("search-inputF").value;
    console.log(searchInputF);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputF}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
              html += `
                      <div class = "meal-item" data-id = "${meal.idMeal}">
                          <div class = "meal-img">
                              <img src = "${meal.strMealThumb}" alt = "food">
                          </div>
                          <div class = "meal-name">
                              <h3>${meal.strMeal}</h3>
                              <a href ="#buttom" class = "recipe-btnF">Get Recipe</a>
                          </div>
                      </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we don't have any recipe.";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}

function MealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btnF')){
        let mealItem = e.target.parentElement.parentElement;

        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeForm(data.meals));
    }
}

function mealRecipeForm(meal){
    console.log(meal);
    meal = meal[0];
 
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <div class = "recipe-instruct">
            <h3 class = "recipe-title">Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
        <div class = "another-search">
            <a href = "./food.html">Make Another Search</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
}

// comment 