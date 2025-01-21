// Read complete recipe array 
let readLocalStorage = function () {
  const allStoredRecipeDataString = localStorage.getItem('allStoredRecipeDataString');
  return allStoredRecipeDataString ? JSON.parse(allStoredRecipeDataString) : [];
}
// JS for the index.html page to display all recipes in correct categories
// Wait for DOM to fully load before executing any JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Track which recipe section is currently being displayed
    let activeSection = null;
    // Define available recipe categories
    const recipeTypes = ['Breakfast', 'Lunch', 'Dinner', 'Dessert'];

    // Render message if no recipes appear
    const allRecipes = readLocalStorage();    
    let noPosts = function () {
        recipeContainer = document.getElementById('all-recipes-container');
        let noPostsEl = document.createElement('h3');
        noPostsEl.textContent = 'No Recipes posted yet...';
        recipeContainer.appendChild(noPostsEl);
    }
    if (allRecipes.length === 0) {
        noPosts();
    }    

    // Set up click handlers for each recipe type
    recipeTypes.forEach(type => {
        // Get reference to the view link and section container
        const viewLink = document.querySelector(`a[href="#${type}"]`);
        const section = document.querySelector(`#${type}`);

        // Add click event listener to handle section display
        viewLink.addEventListener('click', function(e) {
            // Prevent default anchor tag behavior
            e.preventDefault();
            
            // Clean up: Hide all recipe sections and clear their contents
            recipeTypes.forEach(t => {
                const s = document.querySelector(`#${t}`);
                s.style.display = 'none';
                // Find and clear the recipe container
                const c = s.querySelector(`.${t.toLowerCase()}-recipes-container`);
                if (c) c.innerHTML = '';
            });
            
            // Handle toggling: If clicking active section, close it
            if (activeSection === section) {
                activeSection = null;
                return;
            }
            
            // Display and populate the selected section
            section.style.display = 'block';
            // Get reference to recipe container
            const container = section.querySelector(`.${type.toLowerCase()}-recipes-container`);
            // Clear any existing content
            container.innerHTML = '';
            
            // Load and filter recipes
            const allRecipes = readLocalStorage();
            // Only show recipes matching selected type
            const typeRecipes = allRecipes.filter(recipe => recipe.type === type);
            
            // Create and display each matching recipe

            typeRecipes.forEach(recipe => {
                createRecipe(recipe, `.${type.toLowerCase()}-recipes-container`);
            });
            
            // Update tracking of active section
            activeSection = section;
        });
// JS for the index.html page to display all recipes in correct categories

    });
    // Creating new recipes
    let createRecipe = function (recipe, targetContainer = null) {

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

        // Simplified append logic
        if (targetContainer) {
            document.querySelector(targetContainer).appendChild(recipeDiv);
        } else {
            const recipeContainer = document.getElementById('all-recipes-container');
            recipeContainer.appendChild(recipeDiv);
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
});

