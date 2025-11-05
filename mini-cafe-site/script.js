const menuItems = [
    { name: "Kapeng Barako", description: "Classic Batangas coffee, strong and rich.", price: 120 },
    { name: "Espresso Supremo", description: "Pure strength in every shot.", price: 100 },
    { name: "Latte ng Bayan", description: "Creamy, comforting, and made with love.", price: 150 },
    { name: "Cheese Pandesal", description: "Soft bread with a cheesy twist.", price: 60 },
    { name: "Choco Muffin", description: "Rich chocolate muffin perfect with coffee.", price: 70 },
    { name: "Banana Loaf", description: "Sweet banana loaf baked fresh daily.", price: 65 }
];

let orders = [];

function renderMenu() {
    const menuList = document.getElementById("menuList");
    if (!menuList) return;

    menuItems.forEach((item, index) => {
        const col = document.createElement("div");
        col.className = "col-12 col-md-4";

        const card = document.createElement("div");
        card.className = "card h-100 shadow-sm";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body text-center";

        cardBody.innerHTML = `
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">${item.description}</p>
            <p class="fw-bold">₱${item.price}</p>
            <div class="mb-2">
                <label for="qty${index}" class="form-label">Quantity:</label>
                <input type="number" id="qty${index}" class="form-control" value="1" min="1">
            </div>
            <button class="btn btn-custom order-btn" data-index="${index}">Order Now</button>
        `;

        card.appendChild(cardBody);
        col.appendChild(card);
        menuList.appendChild(col);
    });
}

function updateSummary() {
    const summary = document.getElementById("orderSummary");
    if (!summary) return;

    if (orders.length === 0) {
        summary.innerHTML = "<p>No items ordered yet.</p>";
        return;
    }

    let html = "<ul class='list-group'>";
    let total = 0;
    orders.forEach(order => {
        html += `<li class='list-group-item d-flex justify-content-between align-items-center'>
                    ${order.name} x ${order.quantity}
                    <span>₱${order.totalPrice}</span>
                 </li>`;
        total += order.totalPrice;
    });
    html += `</ul><p class="mt-2 fw-bold">Total: ₱${total}</p>`;
    summary.innerHTML = html;
}

document.addEventListener("click", function(e) {
    if (e.target && e.target.classList.contains("order-btn")) {
        const index = e.target.dataset.index;
        const qtyInput = document.getElementById(`qty${index}`);
        const quantity = parseInt(qtyInput.value);

        if (quantity < 1 || isNaN(quantity)) {
            alert("Please enter a valid quantity.");
            return;
        }

        const item = menuItems[index];
        const totalPrice = item.price * quantity;

        orders.push({ name: item.name, quantity, totalPrice });
        alert(`You ordered ${quantity} x ${item.name}!`);
        updateSummary();
        qtyInput.value = 1;
    }
});

const feedbackForm = document.getElementById("feedbackForm");
const feedbackList = document.getElementById("feedbackList");
const successMessage = document.getElementById("successMessage");

if (feedbackForm) {
    feedbackForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            successMessage.style.color = "red";
            successMessage.textContent = "Please fill in all fields.";
            return;
        }

        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!emailPattern.test(email)) {
            successMessage.style.color = "red";
            successMessage.textContent = "Please enter a valid email address.";
            return;
        }
        if (feedbackList) {
            const feedbackItem = document.createElement("div");
            feedbackItem.classList.add("feedback-item");
            feedbackItem.innerHTML = `
                <strong>${name}</strong>
                <small>${email}</small>
                <p>${message}</p>
            `;
            feedbackList.prepend(feedbackItem);
        }

        successMessage.style.color = "green";
        successMessage.textContent = "Thank you for your feedback!";
        feedbackForm.reset();
    });
}
document.addEventListener("DOMContentLoaded", renderMenu);
