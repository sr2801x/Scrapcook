let selectedIngredients = [];

// Load ingredients from JSON Server
async function loadIngredients() {
    try {
        const response = await fetch('http://localhost:3000/ingredients');
        const ingredients = await response.json();
        displayIngredients(ingredients);
    } catch (error) {
        console.error('Error loading ingredients:', error);
    }
}

// Display ingredients as selectable items
function displayIngredients(ingredients) {
    const ingredientList = document.getElementById('ingredient-list');
    ingredientList.innerHTML = '';

    ingredients.forEach(ingredient => {
        const item = document.createElement('div');
        item.classList.add('ingredient');
        item.textContent = ingredient.name;

        // Add click event to select/deselect ingredients
        item.addEventListener('click', () => {
            toggleIngredientSelection(ingredient.name, item);
        });

        ingredientList.appendChild(item);
    });
}

// Toggle ingredient selection
function toggleIngredientSelection(ingredientName, element) {
    if (selectedIngredients.includes(ingredientName)) {
        selectedIngredients = selectedIngredients.filter(ing => ing !== ingredientName);
        element.classList.remove('selected');
    } else {
        selectedIngredients.push(ingredientName);
        element.classList.add('selected');
    }
    filterRecipes(); // Filter recipes based on selection
}

// Filter and display recipes based on selected ingredients
async function filterRecipes() {
    const recipes = await loadRecipes();
    const filteredRecipes = recipes.filter(recipe =>
        selectedIngredients.every(ing => recipe.ingredients.includes(ing))
    );
    displayRecipes(filteredRecipes);
}

// Load recipes from JSON Server
async function loadRecipes() {
    try {
        const response = await fetch('http://localhost:3000/recipes');
        return await response.json();
    } catch (error) {
        console.error('Error loading recipes:', error);
    }
}

// Display recipes on the page
function displayRecipes(recipes) {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';

    if (recipes.length === 0) {
        recipeList.innerHTML = '<p>No matching recipes found!</p>';
        return;
    }

    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.classList.add('recipe-card');
        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <h3>${recipe.name}</h3>
            <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
            <p><strong>Diet:</strong> ${recipe.diet}</p>
        `;
        recipeList.appendChild(card);
    });
}

// Search ingredient and filter recipes
async function searchIngredient(query) {
    const response = await fetch('http://localhost:3000/ingredients');
    const ingredients = await response.json();
    
    // Filter ingredients based on query
    const matchingIngredients = ingredients.filter(ingredient => 
        ingredient.name.toLowerCase().includes(query.toLowerCase())
    );
    
    if (matchingIngredients.length > 0) {
        // Update selected ingredients based on search results
        selectedIngredients = matchingIngredients.map(ingredient => ingredient.name);
        console.log('Matching ingredients:', selectedIngredients);
        filterRecipes(); // Filter recipes based on the search
    } else {
        const recipeList = document.getElementById('recipe-list');
        recipeList.innerHTML = '<p>No matching ingredients found!</p>';
    }
}

// Handle search form submit event for both Pantry and Recipe search boxes
document.querySelectorAll('.search-box').forEach(form => {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const query = event.target.querySelector('input[type="text"]').value;
        console.log('Searching for ingredient:', query); // Debugging log
        searchIngredient(query); // Trigger search
    });
});

// Load ingredients on page load
loadIngredients();

 ////////////////////////////////////////////////////////////////
//In the displayRecipes function, update the inner HTML for each card to include the image, name, and a likes counter

 function displayRecipes(recipes) {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';

    if (recipes.length === 0) {
        recipeList.innerHTML = '<p>No matching recipes found!</p>';
        return;
    }

    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.classList.add('recipe-card');
        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <h3>${recipe.name}</h3>
            <div class="likes">
                <span class="like-count">❤️ ${recipe.likes || 0}</span>
            </div>
        `;
        
        // Add event listener for showing popup
        card.addEventListener('click', () => showRecipePopup(recipe));

        recipeList.appendChild(card);
    });
}


// Function to show recipe popup
function showRecipePopup(recipe) {
    const popup = document.getElementById('recipe-popup');
    const popupRecipeName = document.getElementById('popup-recipe-name');
    const popupRecipeImage = document.getElementById('popup-recipe-image');
    const popupRecipeIngredients = document.getElementById('popup-recipe-ingredients');
    const popupRecipeDetails = document.getElementById('popup-recipe-details');

    // Populate popup content
    popupRecipeName.textContent = recipe.name;
    popupRecipeImage.src = recipe.image;
    popupRecipeIngredients.innerHTML = recipe.ingredients.map(ing => `<li>${ing}</li>`).join('');
    popupRecipeDetails.textContent = recipe.details;

    // Show popup
    popup.style.display = 'flex';
}

// Function to close popup
document.querySelector('.close-popup').addEventListener('click', () => {
    document.getElementById('recipe-popup').style.display = 'none';
});

// Close popup if clicked outside content
document.getElementById('recipe-popup').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        document.getElementById('recipe-popup').style.display = 'none';
    }
});

