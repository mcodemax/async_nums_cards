//add li to ul after press a btn, and all 4 facts finish loading

//press the h3
//it makes api call to numbers api
//

const favNum = 55;
const favNumArr = [55,11,23,51];
const urlOneNum = `http://numbersapi.com/${favNum}?json`;
const urlMultiNum = `http://numbersapi.com/${favNumArr}?json`;
//$('h3').onclick

let factPromises = [];

//Part1
$.getJSON(urlOneNum)
    .then(data => console.log(data));

//Part2
$.getJSON(urlMultiNum)
    .then(data => console.log(data));

//https://stackoverflow.com/questions/40528557/how-does-array-fromlength-5-v-i-i-work
//Part3
Promise.all(
    Array.from({length:4}, () => {
        return $.getJSON(urlOneNum) //I don't like that this has no err handling incase numfacts server goes down
    })
).then(factsArr => {
    factsArr.forEach(data => {
        $('ul').append(`<li>${data.text}</li>`)
    });
});



