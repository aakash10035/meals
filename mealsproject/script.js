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