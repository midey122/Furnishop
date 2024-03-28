// Selecting elements from the DOM
const navbarToggler = document.querySelector(".navbar-toggler");
const navbarCollapse = document.querySelector(".navbar-collapse");
const shoppingIcon = document.getElementById("shopping-icon");
const slides = document.querySelectorAll(".slide");
const radios = document.querySelectorAll('.controls input[type="radio"]');
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const closeBar = document.getElementById("container");
const closeIcon = closeBar.querySelector(".close-icon");
let currentSlide = 0;

// Event listener for toggling the navbar collapse
navbarToggler.addEventListener("click", () => {
  navbarCollapse.classList.toggle("show");
});

// Event listener for showing the close bar
shoppingIcon.addEventListener("click", function () {
  closeBar.style.display = "block"; // Show the close bar
  localStorage.removeItem("closeBarHidden"); // Remove the saved state from localStorage
});

// Check if the close bar was previously closed
if (localStorage.getItem("closeBarHidden") === "true") {
  closeBar.style.display = "none";
} else {
  closeBar.style.display = "block";
}

// Event listener for hiding the close bar
closeIcon.addEventListener("click", function () {
  closeBar.style.display = "none"; // Hide the close bar
  localStorage.setItem("closeBarHidden", "true"); // Save the state to localStorage
});

// Function to show a specific slide
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
  });
  radios.forEach((radio, i) => {
    radio.checked = i === index;
  });
  currentSlide = index;
}

// Function to show the next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Function to show the previous slide
function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Event listeners for radio buttons, prev button, and next button
radios.forEach((radio, index) => {
  radio.addEventListener("change", () => {
    showSlide(index);
  });
});

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

// Initialize the first slide
showSlide(0);

// Shopping cart functionality
const cartItems = document.getElementById("cart-items");
const totalElement = document.getElementById("total");
let totalAmount = 0;

// Event listener for adding items to the cart
document.querySelectorAll(".add-to-cart").forEach((item) => {
  item.addEventListener("click", () => {
    const product = item.closest(".product");
    const productName = product.querySelector("h1").textContent;
    const productPrice = parseFloat(
      product.querySelector(".price").textContent.replace("$", "")
    );

    totalAmount += productPrice;
    totalElement.textContent = totalAmount.toFixed(2);

    const listItem = document.createElement("li");
    listItem.innerHTML = ` 
            <img id="ima" src="${
              product.querySelector("img").src
            }" alt="${productName}">
            <span>${productName} - ${productPrice.toFixed(
      2
    )}</span> <span class="close"><i class="fas fa-times close-icon"></i></span>
        `;
    cartItems.appendChild(listItem);

    updateItemCount();
  });
});

// Event listener for removing items from the cart
cartItems.addEventListener("click", (event) => {
  if (event.target.classList.contains("close-icon")) {
    const listItem = event.target.closest("li");
    const price = parseFloat(
      listItem.querySelector("span").textContent.split(" - ")[1]
    );
    totalAmount -= price;
    totalElement.textContent = totalAmount.toFixed(2);
    listItem.remove();

    updateItemCount();
  }
});

// Function to update the item count in the shopping cart
function updateItemCount() {
  const itemCount = cartItems.children.length;
  document.getElementById("item-count").textContent = itemCount;
}


