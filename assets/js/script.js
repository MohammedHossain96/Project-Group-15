document.addEventListener('DOMContentLoaded', function () {
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

  // Cooking instructions form elements
  const formEl = document.querySelector('#cooking-form');

  // Handle cooking instructions form submission
  const handleFormSubmit = function (event) {
    event.preventDefault();

    const ingredients = ingredientList.getElementsByTagName('li').length;

    if (ingredients === 0) {
      const errorEl = document.querySelector('#error');
      errorEl.textContent = 'Please add at least one ingredient';

      setTimeout(function () {
        errorEl.textContent = '';
      }, 4000);

      return;
    }

    const formData = {
        ingredientList: Array.from(ingredientList.getElementsByTagName('li')).map(li => li.textContent.trim())
      };
  
      storeLocalStorage(formData);
      redirectPage('index.html');
    };
  
    formEl.addEventListener('submit', handleFormSubmit);
  });