import { auth, db } from "./firebaseConfig.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { doc, setDoc, Timestamp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

// // ✅ Automatically Redirect to Dashboard if Already Logged In
// onAuthStateChanged(auth, (user) => {
//     if (user && window.location.pathname !== "/dashboard.html") {
//         console.log("User already logged in:", user.uid);
//         window.location.href = "dashboard.html"; // Redirect if already logged in
//     }
// });

// ✅ User Registration
document.getElementById("registerBtn")?.addEventListener("click", async () => {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
        alert("Please fill in all fields!");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;

        await setDoc(doc(db, "users", userId), {
            name: name,
            email: email,
            role: "user",
            createdAt: Timestamp.now()
        });

        alert("User Registered Successfully!");
        window.location.href = "dashboard.html"; // Redirect after successful registration
    } catch (error) {
        alert("Error: " + error.message);
    }
});

// ✅ User Login
document.getElementById("loginBtn")?.addEventListener("click", async () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please enter email and password!");
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login Successful!");
        window.location.href = "dashboard.html"; // Redirect after successful login
    } catch (error) {
        alert("Login Failed: " + error.message);
    }
});

// ✅ User Logout (For Dashboard)
document.getElementById("logoutBtn")?.addEventListener("click", async () => {
    try {
        await signOut(auth);
        alert("Logged out successfully!");
        window.location.href = "index.html"; // Redirect to landing page
    } catch (error) {
        alert("Logout Failed: " + error.message);
    }
});
