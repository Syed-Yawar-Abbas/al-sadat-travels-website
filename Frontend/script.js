// State
let currentUser = null;

// Check if user is logged in on page load
window.addEventListener('DOMContentLoaded', () => {
    const userData = localStorage.getItem('user');
    if (userData) {
        currentUser = JSON.parse(userData);
        // If admin is logged in and on index.html, redirect to admin.html
        if (currentUser.isAdmin && window.location.pathname.includes('index.html')) {
            window.location.href = 'admin.html';
        }
    }
});

// Select Modals
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const closeBtns = document.querySelectorAll('.close');

// Functions to show modals
function showLoginModal() {
    if (loginModal) loginModal.style.display = 'block';
}

function showRegisterModal() {
    if (registerModal) registerModal.style.display = 'block';
}

// Close modals
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (loginModal) loginModal.style.display = 'none';
        if (registerModal) registerModal.style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) loginModal.style.display = 'none';
    if (e.target === registerModal) registerModal.style.display = 'none';
});

// Book Now Button
const bookNowBtn = document.getElementById('bookNowBtn');
if (bookNowBtn) {
    bookNowBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (!currentUser) {
            // Redirect to registration page
            window.location.href = 'reg.html';
        } else {
            // If logged in, redirect based on role
            if (currentUser.isAdmin) {
                window.location.href = 'admin.html';
            } else {
                // User stays on index.html for booking
                alert('Welcome! You can now proceed with booking.');
            }
        }
    });
}
