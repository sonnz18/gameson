document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        sessionStorage.setItem('username', username);
        window.location.href = 'game.html';
    });
});