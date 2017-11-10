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
    var dealerTotal;
    var playerTotal;
    function getCard() {
        let index = Math.floor(Math.random()*52);
        var card = cards[index];
        while(card.played === true) {
            index = Math.floor(Math.random()*52);
            card = cards[index];
        } 
        cards[index].played = true;
        console.log(cards);
        return card;
    } 

    function gameOver() {
        $('body').css("background", "red");
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
        console.log(cards);
        return cards;
    } deck();

    $('#draw').click(function() {
        $('#draw').toggle();
        var newCard = '<div class="card"></div>';
        card1 = getCard();
        card2 = getCard();
        card3 = getCard();
        card4 = getCard();
        $('#dealer').append((`<div class="card">????????</div>`));
        $('#player').append((`<div class="card">${card3.name} ${card3.suit}</div>`));
        $('#dealer').append((`<div class="card">${card2.name} ${card2.suit}</div>`));
        $('#player').append((`<div class="card">${card4.name} ${card4.suit}</div>`));
        dealerTotal = card2.value;
        playerTotal = card3.value + card4.value;
        if(dealerTotal === 1) {
            $('#dealer-total').append(`ACE showing!`);
        } else $('#dealer-total').append(`${dealerTotal} showing!`);
        $('#player-total').append(`${playerTotal}`);
    });

    $('#hit').click(function() {
        card5 = getCard();
        playerTotal = card3.value + card4.value + card5.value;
        $('#player-total').html('Total: ');
        $('#player-total').append(`${playerTotal}`);
        if (playerTotal > 21) {
            gameOver();
        }
        $('#player').append((`<div class="card">${card5.name} ${card5.suit}</div>`));
    });

    $('#stay').click(function() {
        dealerTotal += card1;
        if(playerTotal > dealerTotal) {
            alert("winner");
        } else alert("Loser");
    })
});

