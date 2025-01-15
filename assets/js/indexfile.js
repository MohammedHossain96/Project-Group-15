
// Read complete recipe array 
  let readLocalStorage = function () {
    const allStoredRecipeDataString = localStorage.getItem('allStoredRecipeDataString');
    return allStoredRecipeDataString ? JSON.parse(allStoredRecipeDataString) : [];
  }

// Listening for the window to open, and then loading recipes on page
document.addEventListener('DOMContentLoaded', function () {

// Creating new recipes
let createRecipe = function (recipe) {

  // Creating the elements for each recipe
  const recipeDiv = document.createElement('div');
  const recipeTitle = document.createElement('h4');
  const recipeServing = document.createElement('p');
  const recipeTime = document.createElement('p');
  const recipeType = document.createElement('p');
  const recipeDescription = document.createElement('p');
  const recipeImage = document.createElement('img');
  const ingredientsTitle = document.createElement('h5');
  const ingredientsList = document.createElement('ul');
  const directionsTitle = document.createElement('h5');
  const directionsList = document.createElement('ol');

  // Adding attributes and contents to elements
  recipeTitle.textContent = recipe.title || "Unknown Title";
  recipeServing.textContent = `Serving size: ${recipe.servingSize || 'N/A'} people`;
  recipeTime.textContent = `${recipe.time || 'N/A'} minutes`;
  recipeType.textContent = recipe.type || "Unknown Type";
  recipeDescription.textContent = recipe.discription || "No description provided.";
  recipeImage.setAttribute('src', `${recipe.imageURL}`);
  recipeImage.setAttribute('alt', recipe.title || "Recipe Image");
  ingredientsTitle.textContent = 'Ingredients';
  directionsTitle.textContent = 'Directions';

  // Adding classes to elements
  recipeDiv.className = 'recipe-container';
  recipeTitle.className = 'recipe-title';
  recipeServing.className = 'recipe-serving';
  recipeTime.className = 'recipe-time';
  recipeType.className = 'recipe-type';
  recipeDescription.className = 'recipe-description';
  recipeImage.className = 'recipe-image';
  ingredientsTitle.className = 'ingredients-title';
  ingredientsList.className = 'ingredients-list';
  directionsTitle.className = 'directions-title';
  directionsList.className = 'directions-list';

  // Target Recipe type headers
  const breakfastRecipes = document.getElementById('breakfast-recipes');
  const lunchRecipes = document.getElementById('lunch-recipes');
  const dinnerRecipes = document.getElementById('dinner-recipes');
  const dessertRecipes = document.getElementById('dessert-recipes');

  // Append elements to index.html
  if (recipe.type === 'Breakfast') {
    breakfastRecipes.appendChild(recipeDiv);
  }
  else if (recipe.type === 'Lunch') {
    lunchRecipes.appendChild(recipeDiv);
  }
  else if (recipe.type === 'Dinner') {
    dinnerRecipes.appendChild(recipeDiv);
  }
  else if (recipe.type === 'Dessert') {
    dessertRecipes.appendChild(recipeDiv);
  }
  else if (recipe.type !== 'All') {
    const recipeContainer = document.getElementById('all-recipes-container');
    recipeContainer.appendChild(recipeDiv);
  }
  else {
    console.error("Recipe type not found!");
    return;
  }

  recipeDiv.appendChild(recipeTitle);
  recipeDiv.appendChild(recipeServing);
  recipeDiv.appendChild(recipeTime);
  recipeDiv.appendChild(recipeType);
  recipeDiv.appendChild(recipeDescription);

  //Append image if available

  if (recipe.imageURL) {
    recipeDiv.appendChild(recipeImage);
  }

// Append Ingredients
  recipeDiv.appendChild(ingredientsList);
  if (Array.isArray(recipe.ingredients)) {
    recipe.ingredients.forEach(function (ingredient) {
      const li = document.createElement('li');
      li.textContent = ingredient;
      ingredientsList.appendChild(li);
    });
  }

  // Append Directions
  recipeDiv.appendChild(directionsList);
  if (Array.isArray(recipe.directions)) {
    recipe.directions.forEach(function (direction) {
      const li = document.createElement('li');
      li.textContent = direction;
      directionsList.appendChild(li);
    });
  }
  }

  // Render message if no recipes appear
  let noPosts = function () {
    recipeContainer = document.getElementById('all-recipes-container');
    let noPostsEl = document.createElement('h3');
    noPostsEl.textContent = 'No Recipes posted yet...';
    recipeContainer.appendChild(noPostsEl);
  }

  let renderRecipeList = function () {
    let allRecipes = readLocalStorage();
    if (allRecipes.length > 0) {
        for (let i = 0; i < allRecipes.length; i++) {
            createRecipe(allRecipes[i]);
        }
    }
    else {
        noPosts();
    }
}

  renderRecipeList();
  });




