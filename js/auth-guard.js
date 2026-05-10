(function() {
    const user = JSON.parse(localStorage.getItem('traveloop_user'));
    let token = localStorage.getItem('traveloop_token');
    const isLoginPage = window.location.pathname.includes('login_signup.html');

    if (!isLoginPage && (!user || !token)) {
        window.location.href = 'login_signup.html';
    }

    // Automatically try to refresh the token if we are logged in
    if (!isLoginPage && token) {
        fetch('http://localhost:5000/api/auth/refresh', {
            method: 'GET',
            headers: {
                'x-auth-token': token
            }
        })
        .then(res => {
            if (res.ok) return res.json();
            throw new Error('Token expired or invalid');
        })
        .then(data => {
            // Update token with fresh one
            localStorage.setItem('traveloop_token', data.token);
            localStorage.setItem('traveloop_user', JSON.stringify(data.user));
        })
        .catch(err => {
            console.warn('Session expired, logging out', err);
            window.logout();
        });
    }

    // Export a helper for fetch headers
    window.getAuthHeaders = function() {
        return {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('traveloop_token') // Always get latest
        };
    };

    // Logout helper
    window.logout = function() {
        localStorage.removeItem('traveloop_user');
        localStorage.removeItem('traveloop_token');
        window.location.href = 'login_signup.html';
    };

    // Issue #9: Inject dynamic avatar into the DOM on page load
    document.addEventListener('DOMContentLoaded', () => {
        const storedUser = JSON.parse(localStorage.getItem('traveloop_user'));
        if (storedUser && storedUser.avatar) {
            // Find all profile image tags (usually linked to user_profile_settings.html)
            const profileLinks = document.querySelectorAll('a[href="user_profile_settings.html"] img');
            profileLinks.forEach(img => {
                img.src = storedUser.avatar;
            });
        }
    });

})();
