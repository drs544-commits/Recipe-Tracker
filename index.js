// class for recipe information
class Recipe {
    #isFavorite = false;
    constructor(recipeName, ingredients, steps, category, cookingTime){
        this.recipeName = recipeName;
        this.ingredients = ingredients;
        this.steps = steps;
        this.category = category;
        this.cookingTime = cookingTime;
    }
    getFavoriteStatus() {
        return this.#isFavorite;
    }
    toggleFavoriteStatus() {
        this.#isFavorite = !this.#isFavorite;
    }
}

// calls main
main()

// addRecipe form submition
$("#addRecipeForm").on('submit', function(event){
    // prevents reloading from sumbition
    event.preventDefault();
    // create recipe object
    var newRecipe = new Recipe(
        $(this).find("input[name='recipe-name']"),
        $(this).find("input[name='ingredients']"),
        $(this).find("input[name='steps']"),
        $(this).find("input[name='category']"),
        $(this).find("input[name='cooking-time']")
    );
    addRecipe(newRecipe);
})

// TODO: dynamically create recipes on the webpage
// adding a recipe object to the page 
// addRecipe(newRecipe){
//     // create card element
//     document.createElement("card");

// }

// to keep orginized / used for initializing webpage
function main(){
    return 0;
}

