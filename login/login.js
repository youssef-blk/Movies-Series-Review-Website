const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');

const API_URL = 'http://localhost:3000';

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();

    try {
        const response = await fetch(`${API_URL}/users`);
        const users = await response.json();

        const user = users.find(u => 
            u.email.toLowerCase() === email && u.password === password
        );

        if (user) {
            localStorage.setItem('userId', user.id);
            localStorage.setItem('userName', user.name || user.email);

           showToast('Login successful!', 'success');
            window.location.href = '../index.html';
        } else {
            showToast('Invalid email or password.');
        }

    } catch (error) {
        console.error('Error logging in:', error);
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
