// Initialisation du jeu
let player = document.getElementById("player");
let obstacle = document.getElementById("obstacle");
let gameMessage = document.getElementById("game-message");

let gameInterval;
let playerSpeed = 5;
let obstacleSpeed = 3;

// Démarrer le jeu
function startGame() {
    player.style.left = "50%";
    player.style.bottom = "10px";
    obstacle.style.left = "100%";

    gameMessage.textContent = "Évitez les obstacles et atteignez la sortie !";
    gameInterval = setInterval(moveObstacle, 10);
}

// Déplacer l'obstacle
function moveObstacle() {
    let obstaclePosition = parseInt(obstacle.style.left, 10);
    if (obstaclePosition <= -40) {
        obstacle.style.left = "100%";
    } else {
        obstacle.style.left = (obstaclePosition - obstacleSpeed) + "px";
    }
    checkCollision();
}

// Déplacer le joueur
function movePlayer(direction) {
    let playerPosition = parseInt(player.style.left, 10) || 0;
    if (direction === "left" && playerPosition > 0) {
        player.style.left = (playerPosition - playerSpeed) + "px";
    } else if (direction === "right" && playerPosition < window.innerWidth - 30) {
        player.style.left = (playerPosition + playerSpeed) + "px";
    }
}

// Vérifier la collision
function checkCollision() {
    let playerPosition = player.getBoundingClientRect();
    let obstaclePosition = obstacle.getBoundingClientRect();

    if (playerPosition.left < obstaclePosition.right &&
        playerPosition.right > obstaclePosition.left &&
        playerPosition.top < obstaclePosition.bottom &&
        playerPosition.bottom > obstaclePosition.top) {
        clearInterval(gameInterval);
        gameMessage.textContent = "Vous avez échoué ! Essayez à nouveau.";
        gameMessage.style.color = "red";
    }
}

// Contrôles pour mobile
document.getElementById("left-btn").addEventListener("click", () => movePlayer("left"));
document.getElementById("right-btn").addEventListener("click", () => movePlayer("right"));
