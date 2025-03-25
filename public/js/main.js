import { auth, db } from "./firebaseConfig.js";
import { collection, getDocs, query, where, doc, addDoc, deleteDoc, Timestamp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

let cart = [];

// ✅ Load Products from Firestore
async function loadProducts() {
    const querySnapshot = await getDocs(collection(db, "products"));
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    querySnapshot.forEach((doc) => {
        const product = doc.data();
        productList.innerHTML += `
            <div class="product">
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <button class="addToCartBtn" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
            </div>
        `;
    });

    // Attach event listeners to all "Add to Cart" buttons
    document.querySelectorAll(".addToCartBtn").forEach(button => {
        button.addEventListener("click", (event) => {
            const name = event.target.getAttribute("data-name");
            const price = parseFloat(event.target.getAttribute("data-price"));
            addToCart(name, price);
        });
    });
}

// ✅ Add Product to Cart
function addToCart(name, price) {
    cart.push({ name, price });
    displayCart();
}

// ✅ Display Cart Items
function displayCart() {
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "";

    if (cart.length === 0) {
        cartDiv.innerHTML = "<p>Your cart is empty</p>";
    } else {
        cart.forEach((item, index) => {
            cartDiv.innerHTML += `
                <p>${item.name} - $${item.price} 
                <button onclick="removeFromCart(${index})">Remove</button></p>
            `;
        });
    }
}

// ✅ Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}
window.removeFromCart = removeFromCart;

// ✅ Place Order
document.getElementById("placeOrderBtn")?.addEventListener("click", async () => {
    const user = auth.currentUser;
    if (!user) {
        alert("Please log in first!");
        return;
    }

    const userId = user.uid;
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    try {
        await addDoc(collection(db, "orders"), {
            userId,
            cart: [...cart], // Store cart properly
            total,
            status: "Pending",
            timestamp: Timestamp.now()
        });

        alert("Order Placed Successfully!");
        cart = []; // Clear cart after placing order
        displayCart();
        loadOrders(); // Refresh orders
    } catch (error) {
        alert("Error placing order: " + error.message);
    }
});

async function loadOrders() {
    const user = auth.currentUser;
    if (!user) {
        console.log("No user logged in.");
        return;
    }

    const ordersList = document.getElementById("ordersList");
    ordersList.innerHTML = "<p>Loading orders...</p>";

    try {
        const q = query(collection(db, "orders"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        ordersList.innerHTML = "";

        if (querySnapshot.empty) {
            ordersList.innerHTML = "<p>No orders found.</p>";
            return;
        }

        querySnapshot.forEach((docSnap) => {
            const order = docSnap.data();
            const orderId = docSnap.id;

            ordersList.innerHTML += `
                <div class="order" id="order-${orderId}">
                    <h3>Order ID: ${orderId}</h3>
                    <p><strong>Total:</strong> $${order.total}</p>
                    <p><strong>Status:</strong> ${order.status}</p>
                    <p><strong>Items:</strong> ${order.cart.map(item => `${item.name} - $${item.price}`).join(", ")}</p>
                    <button onclick="removeOrder('${orderId}')">Remove Order</button>
                </div>
            `;
        });

    } catch (error) {
        ordersList.innerHTML = `<p>Error loading orders: ${error.message}</p>`;
    }
}

// ✅ Ensure `removeOrder` is globally accessible
window.removeOrder = async function(orderId) {
    if (!confirm("Are you sure you want to delete this order?")) {
        return;
    }

    try {
        await deleteDoc(doc(db, "orders", orderId));
        alert("Order removed successfully!");

        // Remove order from UI
        document.getElementById(`order-${orderId}`).remove();

    } catch (error) {
        alert("Error removing order: " + error.message);
    }
};


// ✅ Ensure Orders Load on Page Refresh
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User logged in:", user.uid);
        loadOrders(); // ✅ Load orders after authentication
    } else {
        console.log("No user logged in.");
    }
});

// ✅ Ensure Everything Loads Properly
window.onload = () => {
    loadProducts();
    displayCart();
    
};
