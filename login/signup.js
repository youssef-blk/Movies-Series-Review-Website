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
            alert('An account with this email already exists.');
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
        alert('Signup successful!');
        window.location.href = '../index.html'; // Go to home page
    } catch (error) {
        console.error('Error signing up:', error);
        alert('Failed to connect to the server. Is json-server running?');
    }
});
