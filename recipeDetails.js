class Recipe {
    #isFavorite = false;
    // TODO: add image member that stores an image file path
    constructor(recipeName, ingredients, steps, category, cookingTime, image){
        this.recipeName = recipeName;
        this.ingredients = ingredients;
        this.steps = steps;
        this.category = category;
        this.cookingTime = cookingTime;
        this.image = image;
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
        this.image + ", " +
        this.#isFavorite;
    }
}

function addRecipe(newRecipe){
    // build pieces of card
    var unorderedList = $("<ul></ul>");
    var orderedList = $("<ol></ol>");
    var cardImg = $("<img>",{
        src: newRecipe.image,
        width: "40%",
        alt: newRecipe.recipeName + " image"
    });
    var cardTitle = $("<h1></h1>",{
        text: newRecipe.recipeName,
        class: "name"
    });
    var category =  $("<p></p>",{
        text: newRecipe.category,
        class: "category"
    });
    var cookingTime = $("<p></p>",{
        text: newRecipe.cookingTime,
        class: "cooking-time"
    });
    for (var i = 0; i < newRecipe.ingredients.length; i++){
        unorderedList.append($("<li></li>",{
            text: newRecipe.ingredients[i]
        }));
    }
    for (var i = 0; i < newRecipe.steps.length; i++){
        orderedList.append($("<li></li>",{
            text: newRecipe.steps[i]
        }));
    }

    // build card element
    $("#lesser-details").append(cardTitle);
    $("#lesser-details").append(category);    
    $("#lesser-details").append(cookingTime);    
    $("#ingredients").append(unorderedList);    
    $("#instructions").append(orderedList);    
    $("#image-container").append(cardImg);    
}

function LoadRecipe(recipe_name) {
    var value = localStorage.getItem(recipe_name);
    //This turns the string back into a recipe object
    var recipe = JSON.parse(value);
    //return the recipe object
    return recipe;
}

const dialog = document.getElementById("recipeDialog");

$("#edit_button").on('click', function(){
    dialog.showModal();
    initializeDialog();
});

$("#closeDialog").on('click', function(){
    dialog.close();
});


function initializeDialog(){
    //get the current recipe name from the page
    const recipe_name = getRecipeParam('recipeName');
    //load the recipe
    let recipe = LoadRecipe(recipe_name);
    //set the value for the name the same as the recipe name
    $("input[name='recipe-name']").val(recipe.recipeName);
    //set the value for the category to the same as the recipe category
    $("input[name='category']").val(recipe.category);
    //set the value for the ingredients to the same as the recipe ingredients
    $("textarea[name='ingredients']").val(recipe.ingredients.join("\n"));
    //set the value for the steps to the same as the recipe steps
    $("textarea[name='steps']").val(recipe.steps.join("\n"));
    //set the value for the cooking time to the same as the recipe cooking time
    $("input[name='cooking-time']").val(recipe.cookingTime);
    //set the value for the image to the same as the recipe image
    $("select[name='image']").val(recipe.image);

}

$("#createRecipeForm").on("submit", function(event) {
    event.preventDefault();
    editRecipe();
});

//function to edit the recipe
function editRecipe(){
    //get the current recipe name from the page
    const recipe_name = getRecipeParam('recipeName');
    //remove the old recipe from local storage
    localStorage.removeItem(recipe_name);
    //create the new recipe
    let newRecipe = createRecipe();
    //add the item to local storage
    //convert the recipie to a string with JSON
    let recipeString = JSON.stringify(newRecipe);
    // store the recipe in local storage, the first argument is uses the recipe name as the key,
    //The second argument saves the recipe object string into the local storage
    localStorage.setItem(newRecipe.recipeName, recipeString);
    //reload the page with a new argument
    window.location.href = "recipeDetails.html?recipeName=" + encodeURIComponent(newRecipe.recipeName);

    
} 

function createRecipe(){
    // create recipe object
    var newRecipe = new Recipe(
        $("input[name='recipe-name']").val(),
        $("textarea[name='ingredients']").val().split("\n"),
        $("textarea[name='steps']").val().split("\n"),
        $("input[name='category']").val(),
        $("input[name='cooking-time']").val(),
        $("select[name='image']").val()
    );
    //clear the array for the steps and ingredients
    curSteps = [];
    curIngredients = [];
    return newRecipe;
}


//function takes in a name for a parameter in a Url query
function getRecipeParam(recipeName){
    //create an object to store the querystring
    const parameter = new URLSearchParams(window.location.search);
    //return the recipe name parameter
    return parameter.get(recipeName)
}

// to keep orginized / used for initializing webpage
function main(){
    //get the recipe_name passed as a parameter by the URL
    const recipe_name = getRecipeParam('recipeName');
    console.log("Stored recipe:", localStorage.getItem(recipe_name));
    //load the recipe
    let recipe = LoadRecipe(recipe_name);
    //add the recipe to the page
    addRecipe(recipe);
}   

main();