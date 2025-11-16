// Image mapping for categories using your images
const catImages = {
  Beef: 'localhost_3000.jpg',
  Chicken: 'localhost_3000_-1.jpg',
  Dessert: 'localhost_3000_-3.jpg',
  Lamb: 'localhost_3000_-4.jpg',
  Miscellaneous: 'Screenshot-2025-11-16-183910.jpg',
  Pasta: 'localhost_3000_-2.jpg',
  Pork: 'localhost_3000.jpg',
  Seafood: 'localhost_3000_-3.jpg',
  Side: 'localhost_3000_-1.jpg',
  Starter: 'localhost_3000_-4.jpg',
  Vegan: 'Screenshot-2025-11-16-183910.jpg',
  Vegetarian: 'localhost_3000.jpg',
  Breakfast: 'localhost_3000_-2.jpg',
  Goat: 'localhost_3000_-1.jpg'
};
// Drawer open/close
function toggleMenu() {
  var el = document.getElementById("sideDrawer");
  el.style.width = (el.style.width === "260px") ? "0" : "260px";
}