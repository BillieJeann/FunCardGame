
var deck = [];
var value = ['A', '2','3','4','5','6','7','8','9','10','J','Q','K'];
var type = ['D','H','C','S'];
var dealerSum = 0;
var playerSum = 0;
var playerCards = [];
var dealerCards = [];
var player_aceCount = 0;
var dealer_aceCount = 0;
var dealerCards_Container  = document.getElementById('dealer-card-container');
var playerCards_Container = document.getElementById('player-card-container');
var playerSum_Paragraph = document.getElementById('ps');

function CreatDeck() {
    for(var i = 0; i < value.length; i++) {
        for(var j = 0; j < type.length; j++) {
            deck.push(value[i] + '-' + type[j]);
        }
    }
}
function SuffleDeck() {
    for(var i = 0; i < deck.length; i++) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}
function DealInitialCards () {
    for(var i = 0; i < 2; i++) {
        var j = Math.floor(Math.random() * deck.length);
        var k = Math.floor(Math.random() * deck.length);
        playerCards.push(deck[j]);
        dealerCards.push(deck[k]);
        deck.pop(deck[k]);
        deck.pop(deck[j]);
    }
    playerCards.forEach(card => {
        playerSum += CountHand(card, 'player');
        playerCards_Container.appendChild(addCard(card));
    })

    dealerCards.forEach(card => {
       dealerSum += CountHand(card, 'dealer');
       dealerCards_Container.appendChild(addCard(card));
    })
    playerSum_Paragraph.textContent = playerSum;
    BlackJackCheck();
}
function CountHand(card, type) {
    if(type == 'player') {
        if(!isNaN(card.split('-')[0])) return parseInt(card.split('-')[0]);
        if(!(card.split('-')[0] == 'A')) return 10;  
        if(playerSum + 11 > 21) return 1; 
        player_aceCount++;
        return 11;
    } 
    if (type == 'dealer') {
        if(!isNaN(card.split('-')[0])) return parseInt(card.split('-')[0]);
        if(!(card.split('-')[0] == 'A')) return 10;  
        if(dealerSum + 11 > 21) return 1; 
        dealer_aceCount++;
        return 11; 
    }
}
function addCard(card) {
    var img = document.createElement('img');
       img.src = 'cards/' + card + '.png';
       return img;
}
function CheckAce(type) {
    if(type == 'player') {
        while(playerSum >= 21) {
             playerSum -= 10;
             player_aceCount--;
        }
    } 
    else {
        while(dealerSum >= 21) {
            dealerSum -= 10;
            dealer_aceCount--;
       }
    }
}
function PlayerHit() {
    var j = Math.floor(Math.random() * deck.length);
    playerCards.push(deck[j]);
    playerSum += CountHand(deck[j], 'player');
    if(player_aceCount > 0){
        CheckAce('player');
    }
    deck.pop(deck[j]);
    playerCards_Container.appendChild(addCard(deck[j]));
    playerSum_Paragraph.textContent = playerSum;
    if(playerSum > 21) {    
        alert('Busted!');
        GameOver();
    }
}

function DealerHit() {
    var j = Math.floor(Math.random() * deck.length);
    dealerCards.push(deck[j]);
    dealerSum += CountHand(deck[j],'dealer');
    if(dealer_aceCount > 0){
        CheckAce('dealer');
    }
    deck.pop(deck[j]);
    dealerCards_Container.appendChild(addCard(deck[j]));
}
function PlayerStay() {
    while(dealerSum < 17) {
        DealerHit();
    }
    if(dealerSum <= 21 && dealerSum > playerSum) {
        alert('You Lose!');
        GameOver();
    }
    else if(dealerSum > 21 || playerSum > dealerSum) {
        alert('You Win!');
        GameOver();
    }
    else if(dealerSum == playerSum) {
        alert('Push!');
        GameOver();
    }
    
    
}
function GameOver() {
    var element = document.getElementById('hidden-card');
    element.remove(); 
    var dealerSum_Paragraph = document.getElementById('ds');
    dealerSum_Paragraph.textContent = dealerSum;
    playerSum = 0;
    dealerSum = 0;
    deck = [];
    setTimeout(function() {
        location.reload();
    },2000)
}
function BlackJackCheck() {
    if(playerSum == 21) {
        alert('Blackjack!');
        GameOver();
        return;
    }
    if(dealerSum == 21) {
        alert('Dealer has Blackjack!');
        GameOver();
        return;
    }
}
function StartGame() {
    CreatDeck();
    SuffleDeck();
    DealInitialCards();
}
