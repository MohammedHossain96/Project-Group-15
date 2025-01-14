document.addEventListener('DOMContentLoaded', function () {
    const formData = JSON.parse(localStorage.getItem('formData'));
  
    if (formData) {
      const ingredientsList = document.getElementById('display-ingredients');
      const directionsList = document.getElementById('display-directions');
  
      formData.ingredients.forEach(function (ingredient) {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
      });
  
      formData.directions.forEach(function (direction) {
        const li = document.createElement('li');
        li.textContent = direction;
        directionsList.appendChild(li);
      });
    }
  });