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

