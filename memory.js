const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;
    } else {
        // second card
        hasFlippedCard = false;
        secondCard = this;

        checkForMatch();


    }
}

function checkForMatch() {

    // do they match?
    if (firstCard.dataset.name === secondCard.dataset.name) {
        disableCards();
    } else {
        // not a match
        unflipCards()
    }

}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

function unflipCards() {
    lockBoard = true;

    setTimeout(
        () => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            lockBoard = false;
            resetBoard();

        }, 1500
    )
}


function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    console.log("shuffling");
    cards.forEach(
        card => {
            let randomPos = Math.floor(Math.random() * 12);
            card.style.order = randomPos;
        }
    )
})();

cards.forEach(
    card => card.addEventListener("click", flipCard)
);