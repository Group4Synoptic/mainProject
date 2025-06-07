document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Function to check authentication status and update button visibility
    async function updateButtonVisibility() {
        fetch('/session')
    .then(res => res.json())
    .then(data => {
            
            if (data.loggedIn) {
                // User is logged in - show logout, hide login/register
                if (logoutBtn) logoutBtn.style.display = 'inline-block';
                if (loginBtn) loginBtn.style.display = 'none';
                if (registerBtn) registerBtn.style.display = 'none';
            } else {
                // User is not logged in - show login/register, hide logout
                if (logoutBtn) logoutBtn.style.display = 'none';
                if (loginBtn) loginBtn.style.display = 'inline-block';
                if (registerBtn) registerBtn.style.display = 'inline-block';
            }
    })
    }

    // Call the function when page loads
    updateButtonVisibility();

    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            const res = await fetch('/logout', { method: 'POST' });
            const data = await res.json();
            if (data.success) {
                // Update button visibility after logout
                updateButtonVisibility();
                window.location.href = '/';
            }
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            window.location.href = '/login.html';
        });
    }

    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            window.location.href = '/register.html';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const form = e.target;
            const username = form.username.value;
            const password = form.password.value;

            try {
                const res = await fetch('/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                const data = await res.json();

                if (data.success) {
                    document.getElementById('loginMessage').textContent = 'Login successful!';
                    // Update button visibility after successful login
                    updateButtonVisibility();
                    window.location.href = '/';
                } else {
                    document.getElementById('loginMessage').textContent = data.error || 'Login failed';
                }
            } catch (err) {
                document.getElementById('loginMessage').textContent = 'Error connecting to server';
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const form = e.target;
            const username = form.username.value;
            const password = form.password.value;

            try {
                const res = await fetch('/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                const data = await res.json();

                if (data.success) {
                    document.getElementById('registerMessage').textContent = 'Registration successful!';
                    setTimeout(() => {
                        window.location.href = '/login.html';
                    }, 1500);
                } else {
                    document.getElementById('registerMessage').textContent = data.error || 'Registration failed';
                }
            } catch (err) {
                document.getElementById('registerMessage').textContent = 'Error connecting to server';
            }
        });
    }
});
