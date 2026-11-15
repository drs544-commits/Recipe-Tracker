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

const dialog = document.getElementById("recipeDialog");

// calls main
main();

$("#create-recipe-button").on('click', function(){
    dialog.showModal();
});

$("#closeDialog").on('click', function(){
    dialog.close();
});

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
function createRecipe(){
    // create recipe object
    var newRecipe = new Recipe(
        $("input[name='recipe-name']").val(),
        $("input[name='ingredients']").val(),
        curSteps.slice(),
        $("input[name='category']").val(),
        $("input[name='cooking-time']").val()
    );
    //clear the array for the steps
    curSteps = []
    //convert the recipie to a string with JSON
    let recipeString = JSON.stringify(newRecipe);
    // store the recipe in local storage, the first argument is uses the recipe name as the key,
    //The second argument saves the recipe object string into the local storage
    localStorage.setItem(newRecipe.recipeName, recipeString);
    // add the recipe to the page
    addRecipe(newRecipe);
}

// adding a recipe object to the page 
function addRecipe(newRecipe){
    // build pieces of card
    var recipeCard = $("<div></div>", {
        class: " card recipe-card",
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
        var category =  $("<p></p>",{
        text: newRecipe.category,
        class: "card-text"
    });
    var cookingTime = $("<p></p>",{
        text: newRecipe.cookingTime,
        class: "card-text"
    });
    var deleteButton = $("<button></button>",{
        text: "Delete",
        class: "btn delete"
    });
    // build card element
    $(cardBody).append(cardTitle);
    $(cardBody).append(category);
    $(cardBody).append(cookingTime);
    $(cardBody).append(deleteButton);    
    $(recipeCard).append(cardImg);    
    $(recipeCard).append(cardBody);    
    //inject card element
    $("#recipe-cards").append(recipeCard);
}

//function to load the recipies from the local storage
function LoadRecipes() {
    //if the local storage is not empty
    if (localStorage.length > 0) {
        //loop over the data in local storage
        for (var i = 0; i < localStorage.length; i++){
            //get the value for the current item
            var value = localStorage.getItem(localStorage.key(i));
            //This turns the string back into a recipe object
            var recipe = JSON.parse(value);
            //add the recipe to the page
            console.log(recipe)
            addRecipe(recipe);
            
        }
    }

}

//listener for delete button
$(document).on('click', '.delete', function(){
//listener when double clicking on a recipe card
    //get the recipe name from the card
    let recipeName = $(this).parent().children(".card-title").text();
    //remove the recipe from local storage
    localStorage.removeItem(recipeName);
    //remove the recipe card from the page
    this.parentElement.parentElement.remove();
});
$(".recipe-card").on('dblclick', function(){
    let recipeName = $(this).children(".card-body").children(".card-title").text();
    //open the recipe details page and pass the recipe name as an argument
    //the ? after the html page allows an argument to be passed to the next page
    window.location.href = "recipeDetails.html?recipeName=" + recipeName;

});

// to keep orginized / used for initializing webpage
function main(){
    LoadRecipes();
}

