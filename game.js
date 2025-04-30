document.addEventListener('DOMContentLoaded', () => {
    const username = sessionStorage.getItem('username');
    if (username) {
        document.getElementById('welcomeText').innerText = `Hello, ${username}! Let's play!`;
    } else {
        window.location.href = 'index.html';
    }

    const grid = document.getElementById('grid');
    let score = 0;
    const scoreDisplay = document.createElement('h3');
    scoreDisplay.innerText = `Score: ${score}`;
    document.querySelector('.game-container').insertBefore(scoreDisplay, grid);

    const clickSound = document.getElementById('clickSound');
    const dropSound = document.getElementById('dropSound');

    for (let i = 0; i < 64; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('dragover', allowDrop);
        cell.addEventListener('drop', drop);
        grid.appendChild(cell);
    }

    createPieces();

    function allowDrop(e) {
        e.preventDefault();
    }

    function drag(e) {
        e.dataTransfer.setData('text/plain', e.target.className);
        if (clickSound) clickSound.play();
    }

    function drop(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        if (e.target.classList.contains('cell') && e.target.style.backgroundColor === '') {
            e.target.style.backgroundColor = '#4CAF50';
            e.target.classList.add('pop');
            if (dropSound) dropSound.play();
            score += 10;
            scoreDisplay.innerText = `Score: ${score}`;

            setTimeout(() => {
                e.target.classList.remove('pop');
            }, 300);

            removeUsedPiece();
            checkAllPiecesUsed();
        }
    }

    function createPieces() {
        const pieceContainer = document.getElementById('pieceContainer') || document.createElement('div');
        pieceContainer.id = 'pieceContainer';
        pieceContainer.innerHTML = '';
        pieceContainer.className = 'piece-container';
        document.querySelector('.game-container').insertBefore(pieceContainer, grid);

        for (let i = 0; i < 3; i++) {
            const piece = document.createElement('div');
            piece.className = 'piece';
            piece.setAttribute('draggable', 'true');
            piece.addEventListener('dragstart', drag);
            piece.innerText = 'Block';
            pieceContainer.appendChild(piece);
        }
    }

    function removeUsedPiece() {
        const pieces = document.querySelectorAll('.piece');
        if (pieces.length > 0) {
            pieces[0].remove();
        }
    }

    function checkAllPiecesUsed() {
        const remainingPieces = document.querySelectorAll('.piece');
        if (remainingPieces.length === 0) {
            setTimeout(() => {
                createPieces();
            }, 500);
        }
    }

    document.getElementById('finishBtn').addEventListener('click', () => {
        sessionStorage.setItem('score', score);
        const highScore = localStorage.getItem('highScore') || 0;
        if (score > highScore) {
            localStorage.setItem('highScore', score);
        }
        window.location.href = 'rating.html';
    });
});