(function() {
    const user = JSON.parse(localStorage.getItem('traveloop_user'));
    const token = localStorage.getItem('traveloop_token');
    const isLoginPage = window.location.pathname.includes('login_signup.html');

    if (!isLoginPage && (!user || !token)) {
        window.location.href = 'login_signup.html';
    }

    // Export a helper for fetch headers
    window.getAuthHeaders = function() {
        return {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('traveloop_token')
        };
    };

    // Logout helper
    window.logout = function() {
        localStorage.removeItem('traveloop_user');
        localStorage.removeItem('traveloop_token');
        window.location.href = 'login_signup.html';
    };
})();
