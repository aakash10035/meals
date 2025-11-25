// ===== BASIC ELEMENTS =====
const categoriesGrid = document.getElementById('categoriesGrid');
const categoryList = document.getElementById('categoryList');
const sidebar = document.getElementById('sidebar');
const hamburger = document.getElementById('hamburger');
const closeSidebar = document.getElementById('closeSidebar');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const mainContent = document.getElementById('mainContent');

// ===== SHOW SIDEBAR =====
hamburger.onclick = () => { sidebar.style.display = 'flex'; }
closeSidebar.onclick = () => { sidebar.style.display = 'none'; }

// ===== FETCH & DISPLAY CATEGORIES =====
fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
  .then(res => res.json())
  .then(data => {
    categoriesGrid.innerHTML = "";
    categoryList.innerHTML = "";

    data.categories.forEach(cat => {
      // Grid
      const div = document.createElement('div');
      div.className = 'category-card';
      div.innerHTML = `
        <img src="${cat.strCategoryThumb}" alt="${cat.strCategory}">
        <span>${cat.strCategory}</span>
      `;
      div.onclick = () => loadMealsByCategory(cat.strCategory);
      categoriesGrid.appendChild(div);

      // Sidebar
      const li = document.createElement('li');
      li.textContent = cat.strCategory;
      li.onclick = () => {
        sidebar.style.display = 'none';
        loadMealsByCategory(cat.strCategory);
      };
      categoryList.appendChild(li);
    });
  });

// ===== SEARCH MEALS =====
searchBtn.onclick = () => {
  const q = searchInput.value.trim();
  if (q) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`)
      .then(res => res.json())
      .then(data => {
        categoriesGrid.innerHTML = "";
        mainContent.innerHTML = "";
        if (data.meals) {
          data.meals.forEach(meal => {
            displayMealCard(meal);
          });
        } else {
          categoriesGrid.innerHTML = "<p>No food found.</p>";
        }
      });
  }
};

// ===== LOAD MEALS BY CATEGORY =====
function loadMealsByCategory(cat) {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
    .then(res => res.json())
    .then(data => {
      categoriesGrid.innerHTML = "";
      mainContent.innerHTML = "";
      data.meals.forEach(meal => {
        displayMealCard(meal);
      });
    });
}

// ===== DISPLAY MEAL CARD & DETAILS =====
function displayMealCard(meal) {
  const div = document.createElement('div');
  div.className = 'category-card';
  div.innerHTML = `
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <span>${meal.strMeal}</span>
  `;
  div.onclick = () => loadMealDetails(meal.idMeal);
  categoriesGrid.appendChild(div);
}

// ===== FETCH & SHOW MEAL DETAILS =====
function loadMealDetails(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];
      mainContent.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" style="width:300px;border-radius:10px;">
        <h3>Category: ${meal.strCategory}</h3>
        <h4>Instructions:</h4>
        <p>${meal.strInstructions}</p>
        <h4>Ingredients:</h4>
        <ul>
          ${getIngredients(meal).map(ing => `<li>${ing}</li>`).join('')}
        </ul>
      `;
      categoriesGrid.innerHTML = "";
    });
}

// ===== UTILITY: Get ingredients =====
function getIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal['strIngredient' + i];
    const measure = meal['strMeasure' + i];
    if (ingredient && ingredient.trim() != '') {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }
  return ingredients;
}





