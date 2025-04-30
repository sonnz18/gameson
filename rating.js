document.addEventListener('DOMContentLoaded', () => {
    const score = sessionStorage.getItem('score') || 0;
    const highScore = localStorage.getItem('highScore') || 0;

    document.getElementById('score').innerText = score;
    document.getElementById('highScore').innerText = highScore;

    document.getElementById('ratingForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const rating = document.getElementById('rating').value;
        alert(`Thanks for rating us ${rating} stars!`);
        window.location.href = 'index.html';
    });
});