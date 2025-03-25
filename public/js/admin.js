import { db } from "./firebaseConfig.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

document.getElementById("addProductBtn")?.addEventListener("click", async () => {
    const name = document.getElementById("productName").value;
    const price = parseFloat(document.getElementById("productPrice").value);
    
    try {
        await addDoc(collection(db, "products"), { name, price });
        alert("Product Added Successfully!");
    } catch (error) {
        alert("Error adding product: " + error.message);
    }
});
