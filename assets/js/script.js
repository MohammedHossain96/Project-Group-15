document.addEventListener('DOMContentLoaded', function () {});
  // Ingredient form elements
  const ingredientForm = document.getElementById('ingredient-form');
  const ingredientInput = document.getElementById('ingredient-input');
  const ingredientList = document.getElementById('ingredient-list');

  // Add ingredient to the list
  function addIngredient(ingredient) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.innerHTML = `
      <span>${ingredient}</span>
      <a href="#" class="secondary-content remove-btn"><i class="material-icons red-text">delete</i></a>
    `;

    li.querySelector('span').addEventListener('click', function () {
      this.classList.toggle('done');
    });

    li.querySelector('.remove-btn').addEventListener('click', function (e) {
      e.preventDefault();
      li.remove();
    });

    ingredientList.appendChild(li);
  }

  // Handle ingredient form submission
  ingredientForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const ingredient = ingredientInput.value.trim();
    if (ingredient !== '') {
      addIngredient(ingredient);
      ingredientInput.value = '';
    }
  });

  // end of ingredients js

  // Image upload js

  

  function saveImageUrl() {
    const imageUrl = document.getElementById('imageUrl').value;

    if (imageUrl) {
      // Save the URL to localStorage
        localStorage.setItem('imageURL', imageUrl);
        displayImage();
    } else {
        alert('Please enter a valid image URL.');
    }
  }
    function displayImage() {
      const savedImageUrl = localStorage.getItem('imageURL');
        if (savedImageUrl) {
                const imgElement = document.getElementById('recipe-image');
                imgElement.src = savedImageUrl; // Set the URL as the image source
            }
          }

  // end of image upload js

// Directions JS

  const directionsForm = document.getElementById('directions-form');
  const directionsInput = document.getElementById('directions-input');
  const directionsList = document.getElementById('directions-list');
  const directionsSubmit = document.getElementById('directions-submit');

  directionsForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const direction = directionsInput.value.trim();
    if (direction !== '') {
      addDirection(direction);
      directionsInput.value = '';
    }
  });

  addDirection = function(direction) {
    const directionLi = document.createElement('li');
    directionLi.className = 'direction-item';
    directionLi.innerHTML = `<span>${direction}</span> <a href="#" class="direction-move-button"><strong class="material-icons blue-text">⬆️</strong></a><a href="#" class="direction-remove-button"><i class="material-icons red-text">delete</i></a>`;
    directionLi.querySelector('span').addEventListener('click', function() {
      this.classList.toggle('done');
    });
    // delete direction
    directionLi.querySelector('.direction-remove-button').addEventListener('click', function(event) {
      event.preventDefault();
      directionLi.remove();
      storeDirections();
    });
    // move direction up one step
    directionLi.querySelector('.direction-move-button').addEventListener('click', function(event) {
      event.preventDefault();
      const prevElement = directionLi.previousElementSibling;
      if (prevElement) {
        directionsList.insertBefore(directionLi, prevElement);
      }
      storeDirections();
    });
    directionsList.appendChild(directionLi);
    storeDirections();
  }
  
  // Add directions to localStorage
  storeDirections = function() {
    const directions = [];
    document.querySelectorAll('.direction-item').forEach(function(direction) {
      directions.push(direction.querySelector('span').textContent);
    });
    localStorage.setItem('directions', JSON.stringify(directions));
  }

// end of directions js


  // Cooking instructions form elements
  const formEl = document.querySelector('#cooking-form');

  //submit button
  // Handle cooking instructions form submission
  const handleFormSubmit = function (event) {
    event.preventDefault();

    const ingredients = ingredientList.getElementsByTagName('li').length;
    const directions = directionsList.getElementsByTagName('li').length;

    // error modal
    const modal = document.getElementById('errorModal');
    const modalMessage = document.getElementById('modalMessage');
    

    if (ingredients === 0 || directions === 0) {
      // Display the modal with an error message
      modalMessage.textContent = 'Error: Please add at least one ingredient, one image and one direction.';
      modal.style.display = 'flex'; // Show the modal
      return; // Exit the function to prevent further execution
    }

    /*  old error message
    if (ingredients === 0 || directions === 0) {
      const errorEl = document.querySelector('#error');
      errorEl.textContent = 'Please add at least one ingredient and one direction.';
      setTimeout(function () {
      errorEl.textContent = '';
      }, 4000);

      return;
    } */

    // Remove trailing delete from ingredients list
    let ingredientsArray = Array.from(ingredientList.getElementsByTagName('li')).map(li => {
      let parts = li.textContent.trim().split(' ');
      parts.pop();
      return parts.join(' ');
    });

    // Remove trailing delete from directions list
    let directionsArray = Array.from(directionsList.getElementsByTagName('li')).map(li => {
      let parts = li.textContent.trim().split(' ');
      parts.pop();
      return parts.join(' ');
    });
    const formData = {
      title: document.getElementById('recipe-title').value.trim(),
      servingSize: document.getElementById('recipe-serving').value.trim(),
      time: document.getElementById('recipe-time').value.trim(),
      type: document.querySelector('input[name="recipe-type"]')?.value.trim(),
      discription: document.getElementById('discription').value.trim(),
      imageURL: localStorage.getItem('imageURL'),
      ingredients: ingredientsArray,
      directions: directionsArray,
    };

    storeLocalStorage(formData);
    //localStorage.setItem('formData', JSON.stringify(formData));
    window.location.href = 'index.html';
  };

  // Close Modal Logic
const modal = document.getElementById('errorModal');
const closeModal = document.querySelector('.close');
const closeButton = document.getElementById('closeModalButton');

// Close modal when clicking the close button
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

  // Store new Recipe to complete recipe array
  let storeLocalStorage = function (formData) {
    const existingDataString = localStorage.getItem('allStoredRecipeDataString');
    const existingData = existingDataString ? JSON.parse(existingDataString) : [];
    // Add a new recipe into the array
    existingData.push(formData);
    // Convert it to a string
    const allStoredRecipeDataString = JSON.stringify(existingData);
    localStorage.setItem('allStoredRecipeDataString', allStoredRecipeDataString);
  } 

  formEl.addEventListener('submit', handleFormSubmit);