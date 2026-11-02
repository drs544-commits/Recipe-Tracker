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
    getInfo() {
        return this.recipeName + ", " +
        this.ingredients + ", " +
        this.steps + ", " +
        this.category + ", " +
        this.cookingTime + ", " +
        this.#isFavorite;
    }
}

// calls main
main()

$("#addRecipeForm").on('submit', function(event){
    // Stop the page from reloading
    event.preventDefault();
});

// addRecipe form submition
function addRecipe() {
    // create recipe object
    var newRecipe = new Recipe(
        $("input[name='recipe-name']").val(),
        $("input[name='ingredients']").val(),
        $("input[name='steps']").val(),
        $("input[name='category']").val(),
        $("input[name='cooking-time']").val(),
    );
    //addRecipe(newRecipe);
}

// TODO: dynamically create recipes on the webpage
// adding a recipe object to the page 
// addRecipe(newRecipe){
//     // create card element
//     document.createElement("card");

// }

// to keep orginized / used for initializing webpage
function main(){
}

