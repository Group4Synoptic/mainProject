document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Show/hide buttons based on login status
    async function updateButtonVisibility() {
        try {
            const res = await fetch('/session');
            const data = await res.json();

            if (data.loggedIn) {
                if (logoutBtn) logoutBtn.style.display = 'inline-block';
                if (loginBtn) loginBtn.style.display = 'none';
                if (registerBtn) registerBtn.style.display = 'none';
            } else {
                if (logoutBtn) logoutBtn.style.display = 'none';
                if (loginBtn) loginBtn.style.display = 'inline-block';
                if (registerBtn) registerBtn.style.display = 'inline-block';
            }
        } catch (err) {
            console.error('Error checking session:', err);
        }
    }

    updateButtonVisibility();

    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            await fetch('/logout', { method: 'POST' });
            updateButtonVisibility();
            window.location.href = '/';
        });
    }

    if (loginBtn) loginBtn.addEventListener('click', () => window.location.href = '/login.html');
    if (registerBtn) registerBtn.addEventListener('click', () => window.location.href = '/register.html');

    // ---------- LOGIN FORM ----------
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const { username, password } = e.target;
            try {
                const res = await fetch('/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: username.value, password: password.value })
                });

                const data = await res.json();
                document.getElementById('loginMessage').textContent = data.success
                    ? 'Login successful!' : (data.error || 'Login failed');

                if (data.success) {
                    updateButtonVisibility();
                    window.location.href = '/';
                }
            } catch (err) {
                document.getElementById('loginMessage').textContent = 'Error connecting to server';
            }
        });
    }

    // ---------- REGISTER FORM ----------
    if (registerForm) {
        const messageDiv = document.getElementById('registerMessage');
        const submitBtn = registerForm.querySelector('button[type="submit"]');
        const inputs = registerForm.querySelectorAll('input');
        const passwordInput = registerForm.querySelector('input[name="password"]');
        const confirmPasswordInput = registerForm.querySelector('input[name="confirmPassword"]');

        // Input focus styles
        inputs.forEach(input => {
            input.addEventListener('focus', () => input.parentElement.classList.add('focused'));
            input.addEventListener('blur', () => input.parentElement.classList.remove('focused'));
        });

        // Password matching validation
        function validatePasswords() {
            if (passwordInput.value !== confirmPasswordInput.value) {
                confirmPasswordInput.setCustomValidity('Passwords do not match');
            } else {
                confirmPasswordInput.setCustomValidity('');
            }
        }

        passwordInput.addEventListener('input', validatePasswords);
        confirmPasswordInput.addEventListener('input', validatePasswords);

        function showMessage(message, type) {
            messageDiv.textContent = message;
            messageDiv.className = `show ${type}`;
            if (type === 'success') {
                setTimeout(() => messageDiv.classList.remove('show'), 3000);
            }
        }

        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const form = e.target;
            const username = form.username.value;
            const email = form.email.value;
            const password = form.password.value;
            const confirmPassword = form.confirmPassword.value;

            if (password !== confirmPassword) {
                showMessage('Passwords do not match. Please try again.', 'error');
                return;
            }

            submitBtn.classList.add('loading');
            submitBtn.textContent = 'Creating Account...';

            try {
                const res = await fetch('/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password, confirmPassword })
                });

                const data = await res.json();

                if (data.success) {
                    showMessage('Account created successfully! Redirecting to login...', 'success');
                    setTimeout(() => {
                        window.location.href = '/login.html';
                    }, 2000);
                } else {
                    showMessage(data.error || 'Registration failed', 'error');
                }
            } catch (err) {
                showMessage('Error connecting to server', 'error');
            } finally {
                submitBtn.classList.remove('loading');
                submitBtn.textContent = 'Create Account';
            }
        });
    }
});
