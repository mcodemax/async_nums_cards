const baseUrl = `http://deckofcardsapi.com/api/`;
const $btn = $('button');
const $cardDisplay = $('#card-display');
let deck;
let cardsDrawn = 0;
let currentCard;

function test(){
    $.getJSON(`${baseUrl}deck/new/draw/?count=1`)
    .then(data => {
        console.log(data.cards)

        //1
        console.log(`${data.cards[0].value} of ${data.cards[0].suit}`)
        return data;
    });



    //2
    let deck;
    let card1;
    $.getJSON(`${baseUrl}deck/new/draw/?count=1`)
        .then(data => {
            console.log(`p2----------`);
            
            deck = data.deck_id;
            card1 = data.cards[0]
            console.log({deck, card1});
            return $.getJSON(`${baseUrl}deck/${deck}/draw/?count=1`);
        })
        .then(data => {
            console.log({data})
            console.log(`${card1.value} of ${card1.suit}`)
            console.log(`${data.cards[0].value} of ${data.cards[0].suit}`)
        });

};

/**Build an HTML page that lets you draw cards from a deck. When the page loads, go
 *  to the Deck of Cards API to create a new deck, and show a button on the page that
 *  will let you draw a card. Every time
 *  you click the button, display a new card, until there are no cards left
 *  in the deck. */

//make jquery event listener on html element btn that draws a card
//when card is drawn, add it to "card-display"



//3

//https://api.jquery.com/ready/ 
//jquery func waits for DOM to load below
$(function() {

    //if deck undef or outta cards
    
    $btn.click(function(){ //handles drawing new card

        if(!deck){
            $.getJSON(`${baseUrl}deck/new/draw/?count=1`)
            .then(data => {
                         

                console.log(`drawing first card from new gen deck...`);
                
                deck = data.deck_id;
                cardsDrawn = 1;//1 card drawn when drawing from new deck
                currentCard = data.cards[0]
                console.log({currentCard})

                showCard(currentCard);

                return $.getJSON(`${baseUrl}deck/${deck}/draw/?count=1`);
            })
            
        }else{
                
            $.getJSON(`${baseUrl}deck/${deck}/draw/?count=1`)
            .then(data => {
                if(cardsDrawn >= 52){//52 cards in deck
                    // $cardDisplay.empty()
                    // showCard(currentCard);
            
                    $('#btn-stuff').remove();
                    console.log('poo')
                    return alert(`The Deck is Empty!`);
                }      

                console.log(`drawing from deck currently in play...`);
                
                cardsDrawn++;

                currentCard = data.cards[0]
                console.log({currentCard});                

                if(currentCard){
                    $cardDisplay.empty()
                    showCard(currentCard);
                }
            });
        }
    
        });
    
    
    
  });

  function showCard({image}){//needs input of card
    $cardDisplay.append(`<div id="current-card">
        <img src="${image}" alt="">
        </div>`);
  }

  