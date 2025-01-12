
// ingredients js
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('ingredient-form');
    const input = document.getElementById('ingredient-input');
    const list = document.getElementById('ingredient-list');
  
    
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      
      const ingredient = input.value.trim();
      if (ingredient !== '') {
        addIngredient(ingredient);
        input.value = ''; 
      }
    });
  
    
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
  
      list.appendChild(li);
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

  // Load the image when the page is loaded
  document.addEventListener('DOMContentLoaded', displayImage);

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

  // Load directions from localStorage
  loadDirections = function() {
    const directions = JSON.parse(localStorage.getItem('directions'));
    if (directions) {
      directions.forEach(function(direction) {
        addDirection(direction);
      });
    }
  }

  // Load directions when the page is loaded
  document.addEventListener('DOMContentLoaded', loadDirections);

// end of directions js

