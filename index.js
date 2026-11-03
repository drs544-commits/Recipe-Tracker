// class for recipe information
class Recipe {
    #isFavorite = false;
    // TODO: add image member that stores an image file path
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

// current forms steps 
var curSteps = [];

// calls main
main();

$("#addStepForm").on('submit', function(event){
    // Stop the page from reloading
    event.preventDefault();
});

$("#addRecipeForm").on('submit', function(event){
    // Stop the page from reloading
    event.preventDefault();
});

function addStep(){
    curSteps.push($("input[name='steps']").val());
    $("#stepsList").append($("<li>" + $("input[name='steps']").val() + "</li>"))
}

// addRecipe form submition
function createRecipe() {
    // create recipe object
    var newRecipe = new Recipe(
        $("input[name='recipe-name']").val(),
        $("input[name='ingredients']").val(),
        curSteps.slice(),
        $("input[name='category']").val(),
        $("input[name='cooking-time']").val()
    );
    curSteps = []
    addRecipe(newRecipe);
}

// adding a recipe object to the page 
function addRecipe(newRecipe){
    // build pieces of card
    var recipeCard = $("<div></div>", {
        class: "card",
        style: "width: 18rem;"
    });
    var cardImg = $("<img>",{
        src: "",
        class: "card-img-top",
        // TODO: add img and alt text to recipe class
        alt: ""
    });
    var cardBody = $("<div></div>",{
        class: "card-body",
    });
    var cardTitle = $("<h5></h5>",{
        text: newRecipe.recipeName,
        class: "card-title"
    });
    // build card element
    $(cardBody).append(cardTitle);    
    $(recipeCard).append(cardImg);    
    $(recipeCard).append(cardBody);    
    // inject card element
    $("#recipe-cards").append(recipeCard);
}

// to keep orginized / used for initializing webpage
function main(){}

