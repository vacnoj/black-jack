$(document).ready(function() {
    var cards = [];
    var card1;
    var card2;
    var card3;
    var card4;
    var card5;
    var card6;
    var card7;
    var card8;
    var card9;
    var card10;
    var card11;
    var card12;
    var dealerTotal;
    var playerTotal;
    var cardCount = 0;
    var playerAce;
    var dealerAce;
    var cardsPlayed = 0;
    var show = true;
    var playerCards = [];
    var dealerCards = [];
    function getCard() {
        let index = Math.floor(Math.random()*52);
        var card = cards[index];
        while(card.played === true) {
            index = Math.floor(Math.random()*52);
            card = cards[index];
        } 
        cards[index].played = true;
        // console.log(cards);
        return card;
    } 

    function lose() {
        $('#dealer-cards').empty();
        $('#dealer-cards').append((`<div class="card"><img src="${card1.image}"></div>`));
        $('#dealer-cards').append((`<div class="card"><img src="${card2.image}"></div>`));
        dealerTotal += card1.value;
        $('#dealer-total').text(dealerTotal);
        $('#message').text("You Lose");
        show = false;
        $('#draw').toggle();
        $('#hit').toggle();
        $('#stay').toggle();
        $('#message').removeClass("toggle");
    }

    function win() {
        $('#message').text("You Win!");
        show = false;
        $('#draw').toggle();
        $('#hit').toggle();
        $('#stay').toggle();
        $('#message').removeClass("toggle");
    }

    function blackJack() {
        $('#dealer-cards').empty();
        $('#dealer-cards').append((`<div class="card">${card1.name} ${card1.suit}</div>`));
        $('#dealer-cards').append((`<div class="card">${card2.name} ${card2.suit}</div>`));
        dealerTotal += card1.value;
        if (dealerTotal < 21) {
            win();
        } else push();
        $('#message').text("Black Jack!");
        playerTotal += 10;
    }

    function push() {
        $('#message').text("Push!");
        show = false;
        $('#draw').toggle();
        $('#hit').toggle();
        $('#stay').toggle();
        $('#message').removeClass("toggle");
    }

    function Card(name, suit, value, image) {
        this.name = name;
        this.suit = suit;
        this.value = value;
        this.played = false;
        this.image = image;
    }
    var blank = new Card(blank, null, null, 'game/cardDeck/blank.png');
    function deck() {
        var names = ['14','2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];
        var suits = ['c', 's', 'd', 'h'];
        for (var n  = 0; n < names.length; n++) {
            for(var s = 0; s < suits.length; s++) {
                if (n >= 9 ) {
                    cards.push(new Card(names[n], suits[s], 10, `game/cardDeck/${names[n]}${suits[s]}.png`));    
                } else cards.push(new Card(names[n], suits[s], n + 1, `game/cardDeck/${names[n]}${suits[s]}.png`));
            }
        }
        // $('#profile').text(JSON.stringify(cards));
        // console.log(cards);
        return cards;
    } console.log(deck());

    $('#draw').click(function() {
        if (show === false) {
            $('#hit').toggle();
            $('#stay').toggle();
        }
        clearBoard();
        $('#draw').toggle();
        $('#message').addClass("toggle");
        var newCard = '<div class="card"></div>';
        card1 = getCard();
        dealerCards.push(card1);
        cardCount++;
        card2 = getCard();
        dealerCards.push(card2);
        cardCount++;
        card3 = getCard();
        playerCards.push(card3);
        cardCount++;
        card4 = getCard();
        playerCards.push(card4);
        cardCount++;
        
        console.log(playerCards);
        console.log(dealerCards);

        $('#dealer-cards').append((`<div class="card"><img src="${blank.image}"></div>`));
        $('#player-cards').append((`<div class="card"><img src="${card3.image}"></div>`));
        $('#dealer-cards').append((`<div class="card"><img src="${card2.image}"></div>`));
        $('#player-cards').append((`<div class="card"><img src="${card4.image}"></div>`));
       
        dealerTotal = card2.value;
       
        if (card3.value === 1 || card4.value === 1) {
            playerAce = true;
            playerTotal = card3.value + card4.value;
            if (playerTotal === 11) {
                blackJack();
            }
            if (playerTotal < 11) {
                playerTotal += 10;
                playerAce = false;
            }
        } else playerTotal = card3.value + card4.value;
        
        if(dealerTotal === 1) {
            $('#dealer-total').append(`ACE showing!`);
        } else $('#dealer-total').append(`${dealerTotal} showing!`);
        $('#player-total').append(`${playerTotal}`);
    });

    // for the hit button
    $('#hit').click(function() {
        if (cardCount === 4) {
            card5 = getCard();
            playerCards.push(card5);
            playerTotal += card5.value;
            $('#player-cards').append((`<div class="card"><img src="${card5.image}"></div>`));
            cardCount++;
        } else if (cardCount === 5) {
            card6 = getCard();
            playerCards.push(card6);
            playerTotal += card6.value;
            $('#player-cards').append((`<div class="card"><img src="${card6.image}"></div>`));
            cardCount++;
        } else if (cardCount === 6) {
            card7 = getCard();
            playerCards.push(card7);
            playerTotal += card7.value;
            $('#player-cards').append((`<div class="card"><img src="${card7.image}"></div>`));
            cardCount++;
        } else if (cardCount === 7) {
            card8 = getCard();
            playerCards.push(card8);
            playerTotal += card8.value;
            $('#player-cards').append((`<div class="card"><img src="${card8.image}"></div>`));
            cardCount++;
        }
        console.log(playerCards);
        $('#player-total').empty();
        $('#player-total').append(`${playerTotal}`);
        if (playerTotal > 21) {
            if (playerAce) {
                playerTotal -= 10;
                playerAce = false;
                $('#player-total').empty();
                $('#player-total').append(`${playerTotal}`);
            } else lose();
        }
    });

    // For the stay button
    $('#stay').click(function() {
        $('#dealer-cards').empty();
        $('#dealer-cards').append((`<div class="card"><img src="${card1.image}"></div>`));
        $('#dealer-cards').append((`<div class="card"><img src="${card2.image}"></div>`));
        
        if (card1.value === 1 || card2.value === 1) {
            dealerAce = true;
            dealerTotal = card1.value + card2.value;
            if (dealerTotal <= 11) {
                dealerTotal += 10;
                dealerAce = false;
            }
        } else dealerTotal += card1.value;

        if (dealerTotal < 17) {
            card9 = getCard();
            dealerCards.push(card9);
            cardCount++;
            dealerTotal += card9.value;
            $('#dealer-cards').append((`<div class="card"><img src="${card9.image}"></div>`));
        }
        if (dealerTotal < 17) {
            card10 = getCard();
            dealerCards.push(card10);
            cardCount++;
            dealerTotal += card10.value;
            $('#dealer-cards').append((`<div class="card"><img src="${card10.image}"></div>`));
        }
        if (dealerTotal < 17) {
            card11 = getCard();
            dealerCards.push(card11);
            cardCount++;
            dealerTotal += card11.value;
            $('#dealer-cards').append((`<div class="card"><img src="${card11.image}"></div>`));
        }
        if (dealerTotal < 17) {
            card12 = getCard();
            dealerCards.push(card12);
            cardCount++;
            dealerTotal += card12.value;
            $('#dealer-cards').append((`<div class="card"><img src="${card12.image}"></div>`));
        }
        $('#dealer-total').empty();
        $('#dealer-total').append(`${dealerTotal}`);
        if(dealerTotal > 21) {
            win();
        } else if(playerTotal > dealerTotal) {
            win();
        } else if(playerTotal === dealerTotal) {
            push();
        } else lose();
    });
    
    function clearBoard() {
        $('#dealer-cards').empty();
        $('#player-cards').empty();
        $('#dealer-total').empty();
        $('#player-total').empty();
        cardsPlayed += cardCount;
        console.log(cardsPlayed);
        if (cardsPlayed > 42) {
            setTimeout(shuffle,1000);
            
        }
        cardCount = 0;
        dealerTotal = 0;
        playerTotal = 0;
        playerCards = [];
        dealerCards = [];
    }

    function shuffle() {
        for (var i = 0; i < 52; i++) {
            cards[i].played = false;
        }
        $('#message').removeClass("toggle");
        $('#message').text("\nShuffling next Hand");
        cardsPlayed = 0;
    }

    function ifAce(playerTotal) {
        for (var i = 0; i < playerCards.length; i++) {
            if (playerCards[i] === 1) {
                playerAce = true;
                return playerTotal -= 10;
            }
        }
    }
});

// use array of cards to display images.
// work on the ace problem.
//set timeout for shuffle and deactivate buttons 
// add double down and split options
//dealer blackjack and insurance
// shuffle problem DONE
// add database credits
