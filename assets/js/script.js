
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