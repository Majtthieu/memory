const cards = [
    'https://picsum.photos/id/300/100',
    'https://picsum.photos/id/301/100',
    'https://picsum.photos/id/302/100',
    'https://picsum.photos/id/308/100',
    'https://picsum.photos/id/304/100',
    'https://picsum.photos/id/305/100',
    'https://picsum.photos/id/306/100',
    'https://picsum.photos/id/309/100'
];

const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');
let selectedCards = [];
let isLocked = false;  // Variable de verrouillage pour éviter les clics supplémentaires

// Fonction de création des cartes
function createCard(cardUrl) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = cardUrl;

    const cardContent = document.createElement('img');
    cardContent.classList.add('card-content');
    cardContent.src = cardUrl;

    card.appendChild(cardContent);

    card.addEventListener('click', onCardClick); // Ecouteur pour le clic
    return card;
}

// Duplication tableau pour avoir deux fois les mêmes cartes
function duplicateArray(arraySimple) {
    let arrayDouble = [];
    arrayDouble.push(...arraySimple);
    arrayDouble.push(...arraySimple);

    return arrayDouble;
}

// Mélange des cartes
function shuffleArray(arrayToshuffle) {
    const arrayShuffled = arrayToshuffle.sort(() => 0.5 - Math.random());
    return arrayShuffled;
}

function onCardClick(e) {
    if (isLocked) return;  // Bloquer les clics supplémentaires

    const card = e.target.parentElement;

    if (selectedCards.includes(card)) {
        return; // Ne rien faire si la carte est déjà sélectionnée pour éviter la validation en cliquant deux fois au même endroit
    }

    card.classList.add('flip');

    selectedCards.push(card);
    if (selectedCards.length == 2) {
        isLocked = true;  // Verrouiller pendant le délai
        setTimeout(() => {
            if (selectedCards[0].dataset.value == selectedCards[1].dataset.value) {
                // On a trouvé une paire
                selectedCards[0].classList.add("matched");
                selectedCards[1].classList.add("matched");
                selectedCards[0].removeEventListener('click', onCardClick);
                selectedCards[1].removeEventListener('click', onCardClick);

                const allCardsNotMatched = document.querySelectorAll('.card:not(.matched)');
                if (allCardsNotMatched.length == 0) {
                    // Le joueur a gagné
                    alert("Bravo, vous avez gagné");
                }
            } else {
                // On s'est trompé
                selectedCards[0].classList.remove("flip");
                selectedCards[1].classList.remove("flip");
            }
            selectedCards = [];
            isLocked = false;  // Déverrouiller après le délai
        }, 1000);
    }
}

// Vider le plateau de jeu
function resetGame() {
    gameBoard.innerHTML = '';
    selectedCards = [];
    isLocked = false;

    // Remélanger et recréer les cartes
    let allCards = duplicateArray(cards);
    allCards = shuffleArray(allCards);
    allCards.forEach(card => {
        const cardHtml = createCard(card);
        gameBoard.appendChild(cardHtml);
    });
}

// Ajouter l'événement de remise à zéro
resetButton.addEventListener('click', resetGame);

// Initialiser le jeu au chargement de la page
resetGame();
