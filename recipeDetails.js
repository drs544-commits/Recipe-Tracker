function addRecipe(newRecipe){
    // build pieces of card
    var recipe = $("<div></div>", {
        class: "card recipe-card",
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
    var ingredients = $("<p></p>",{
        text: newRecipe.ingredients,
        class: "card-text"
    });
    var steps = $("<p></p>",{
        text: newRecipe.steps,
        class: "card-text"
    });
    // build card element
    $(cardBody).append(cardTitle);
    $(cardBody).append(category);    
    $(cardBody).append(cookingTime);    
    $(cardBody).append(ingredients);    
    $(cardBody).append(steps);    
    $(recipe).append(cardImg);    
    $(recipe).append(cardBody);    
    // inject card element
    $("#recipe-card").append(recipe);
}

function LoadRecipe(recipe_name) {
    var value = localStorage.getItem(recipe_name);
    //This turns the string back into a recipe object
    var recipe = JSON.parse(value);
    //add the recipe to the page
    addRecipe(recipe);
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
    console.log(recipe_name)
    //load the recipe
    LoadRecipe(recipe_name);
}   

main();