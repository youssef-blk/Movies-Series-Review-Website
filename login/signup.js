const signupForm = document.getElementById('signupForm');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');

const API_URL = 'http://localhost:3000';

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        // Check if email already exists
        const checkRes = await fetch(`${API_URL}/users?email=${email}`);
        const existingUsers = await checkRes.json();
        
        if (existingUsers.length > 0) {
           showToast('An account with this email already exists.');
            return;
        }

        // Create new user
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const newUser = await response.json();
        
        localStorage.setItem('userId', newUser.id);
        localStorage.setItem('userName', newUser.name);
       showToast('Signup successful!', 'success');
        window.location.href = '../index.html'; // Go to home page
    } catch (error) {
        console.error('Error signing up:', error);
        showToast('Server not working.');
    }
});

function showToast(message, type = "error") {
    const toast = document.getElementById("toastPopup");
    const text = document.getElementById("toastMessage");
    const title = document.getElementById("toastTitle");
    const icon = document.getElementById("toastIcon");

    text.textContent = message;

    if (type === "success") {
        toast.classList.add("success");
        title.textContent = "Success";
        icon.className = "fas fa-check-circle";
    } else {
        toast.classList.remove("success");
        title.textContent = "Error";
        icon.className = "fas fa-exclamation-circle";
    }

    toast.style.display = "flex";

    setTimeout(() => {
        toast.style.display = "none";
    }, 3000);
}
