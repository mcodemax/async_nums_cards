const baseUrl = `http://deckofcardsapi.com/api/`;

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

////
