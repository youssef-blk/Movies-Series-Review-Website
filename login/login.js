const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');

const API_URL = 'http://localhost:3000';

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        const response = await fetch(`${API_URL}/users?email=${email}&password=${password}`);
        const users = await response.json();
        
        if (users.length > 0) {
            localStorage.setItem('userId', users[0].id);
            localStorage.setItem('userName', users[0].name || users[0].email);
            alert('Login successful!');
            window.location.href = '../index.html';
        } else {
            alert('Invalid email or password.');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('Failed to connect to the server. Is json-server running?');
    }
});
