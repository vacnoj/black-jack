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
    var dealerTotal;
    var playerTotal;
    var cardCount = 0;
    var playerAce;
    var dealerAce;
    var cardsPlayed = 0;
    var show = true;
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
        // $('body').css("background", "red");
        $('#message').text("You Lose");
        show = false;
        $('#draw').toggle();
        $('#hit').toggle();
        $('#stay').toggle();
        $('#message').toggle();
    }

    function win() {
        $('#message').text("You Win!");
        show = false;
        $('#draw').toggle();
        $('#hit').toggle();
        $('#stay').toggle();
        $('#message').toggle();
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
    }

    function push() {
        $('#message').text("Push!");
        show = false;
        $('#draw').toggle();
        $('#hit').toggle();
        $('#stay').toggle();
        $('#message').toggle();
    }

    function Card(name, suit, value) {
        this.name = name;
        this.suit = suit;
        this.value = value;
        this.played = false;
    }

    function deck() {
        var names = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
        var suits = ['club', 'spade', 'diamond', 'heart'];
        for (var n  = 0; n < names.length; n++) {
            for(var s = 0; s < suits.length; s++) {
                if (n >= 9 ) {
                    cards.push(new Card(names[n], suits[s], 10));    
                } else cards.push(new Card(names[n], suits[s], n + 1));
            }
        } 
        // $('#profile').text(JSON.stringify(cards));
        // console.log(cards);
        return cards;
    } deck();

    $('#draw').click(function() {
        if (show === false) {
            $('#hit').toggle();
            $('#stay').toggle();
        }
        clearBoard();
        $('#draw').toggle();
        $('#message').toggle();
        var newCard = '<div class="card"></div>';
        card1 = getCard();
        cardCount++;
        card2 = getCard();
        cardCount++;
        card3 = getCard();
        cardCount++;
        card4 = getCard();
        cardCount++;
        $('#dealer-cards').append((`<div class="card">????????</div>`));
        $('#player-cards').append((`<div class="card">${card3.name} ${card3.suit}</div>`));
        $('#dealer-cards').append((`<div class="card">${card2.name} ${card2.suit}</div>`));
        $('#player-cards').append((`<div class="card">${card4.name} ${card4.suit}</div>`));
       
        dealerTotal = card2.value;
       
        if (card3.value === 1 || card4.value === 1) {
            playerAce = true;
            playerTotal = card3.value + card4.value;
            if (playerTotal === 11) {
                
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

    $('#hit').click(function() {
        if (cardCount === 4) {
            card5 = getCard();
            playerTotal += card5.value;
            $('#player-cards').append((`<div class="card">${card5.name} ${card5.suit}</div>`));
            cardCount++;
        } else if (cardCount === 5) {
            card6 = getCard();
            playerTotal += card6.value;
            $('#player-cards').append((`<div class="card">${card6.name} ${card6.suit}</div>`));
            cardCount++;
        } else if (cardCount === 6) {
            card7 = getCard();
            playerTotal += card7.value;
            $('#player-cards').append((`<div class="card">${card7.name} ${card7.suit}</div>`));
            cardCount++;
        } else if (cardCount === 7) {
            card8 = getCard();
            playerTotal += card8.value;
            $('#player-cards').append((`<div class="card">${card8.name} ${card8.suit}</div>`));
            cardCount++;
        }

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

    $('#stay').click(function() {
        $('#dealer-cards').empty();
        $('#dealer-cards').append((`<div class="card">${card1.name} ${card1.suit}</div>`));
        $('#dealer-cards').append((`<div class="card">${card2.name} ${card2.suit}</div>`));
        
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
            cardCount++;
            dealerTotal += card9.value;
            $('#dealer-cards').append((`<div class="card">${card9.name} ${card9.suit}</div>`));
        }
        if (dealerTotal < 17) {
            card10 = getCard();
            cardCount++;
            dealerTotal += card10.value;
            $('#dealer-cards').append((`<div class="card">${card10.name} ${card10.suit}</div>`));
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
    }

    function shuffle() {
        for (var i = 0; i < 52; i++) {
            cards[i].played = false;
            $('#message').show();
            $('#message').text("Shuffling next Hand");
            cardsPlayed = 0;
        }
    }
});

