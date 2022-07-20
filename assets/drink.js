const searchBtnD = document.getElementById('search-btnD');
const drinkList = document.getElementById('drink');
const drinkDetailsContent = document.querySelector('.drink-details-content');

searchBtnD.addEventListener('click', createDrinkList);
drinkList.addEventListener('click', DrinkRecipe);


function createDrinkList(){
    
    let searchInputD = document.getElementById("search-inputD").value;
    console.log(searchInputD);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInputD}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let html = "";
        if(data.drinks){
            data.drinks.forEach(drink => {
              html += `
                      <div class = "drink-item" data-id = "${drink.idDrink}">
                          <div class = "drink-img">
                              <img src = "${drink.strDrinkThumb}" alt = "drink">
                          </div>
                          <div class = "drink-name">
                              <h3>${drink.strDrink}</h3>
                              <a href ="#" class = "recipe-btnD">Get Recipe</a>
                          </div>
                      </div>
                `;
            });
            drinkList.classList.remove('notFound');
        } else{
            html = "Sorry, we don't have any recipe.";
            drinkList.classList.add('notFound');
        }

        drinkList.innerHTML = html;
    });
}

function DrinkRecipe(k){
    k.preventDefault();
    if(k.target.classList.contains('recipe-btnD')){
        let drinkItem = k.target.parentElement.parentElement;

        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkItem.dataset.id}`)
        .then(response => response.json())
        .then(data => drinkRecipeForm(data.drinks));
    }
}

function drinkRecipeForm(drink){
    console.log(drink);
    drink = drink[0];
 
    let html = `
        <h2 class = "recipe-title">${drink.strDrink}</h2>
        <div class = "recipe-instruct">
            <h3 class = "recipe-title">Instructions:</h3>
            <p>${drink.strInstructions}</p>
        </div>
        <div class = "recipe-drink-img">
            <img src = "${drink.strDrinkThumb}" alt = "">
        </div>
        <div class = "another-search">
            <a href = "./drink.html">Make Another Search</a>
        </div>
    `;
    drinkDetailsContent.innerHTML = html;
}