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

//function to edit the recipe
function editRecipe(recipe_name){
    
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
    //load the recipe
    let recipe = LoadRecipe(recipe_name);
    //add the recipe to the page
    addRecipe(recipe);
}   

main();