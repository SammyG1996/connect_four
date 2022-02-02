const gameBoard = document.querySelector('#game-board');
const rows = document.querySelectorAll('.rows')
let chipContainer;
const startGame = document.querySelector('#start-game');
const startBtn =  document.querySelector('#start-button');
const endGame = document.querySelector('#end-game')
const endGameH2 = document.querySelector('h2')
const endBtn = document.querySelector('#end-button')

const players  = {
  yellow: 1,
  red: 0
}


const chipRows = {
  //Creates an object with the individual chips divided by rows
  individualChips() {
    return  {
      1: [...document.querySelectorAll('#row1 .chip-container')],
      2: [...document.querySelectorAll('#row2 .chip-container')],
      3: [...document.querySelectorAll('#row3 .chip-container')],
      4: [...document.querySelectorAll('#row4 .chip-container')],
      5: [...document.querySelectorAll('#row5 .chip-container')],
      6: [...document.querySelectorAll('#row6 .chip-container')],
      7: [...document.querySelectorAll('#row7 .chip-container')]
    }
    }, 
    //This will create an object to use for checking perpendicular 
    //matches
    perpChips() {
      const chips = this.individualChips(); 
      const perpChips = {
        0: [],
        1: [], 
        2: [], 
        3: [], 
        4: [], 
        5: [], 
        6: [], 
        7: [], 
        8: []
      }
      for(let i = 1; i <= 7; i++){
        for(let j = 0; j <= 8; j++){
          perpChips[j].push(chips[i][j])
        }
      }
      return perpChips 
    }
}



class CheckWins {

constructor(color) {
  this.color = color 
}

/*
The way this works is I itterate over all the array verically. When I find a chip that 
conatins the class list of the specified color i start to iterate backwards. There are 9 keys in 
the object that contains the chips. I start going from 0-1-2-3-4-5-6-7-8. This is different from the diagLeft() because 
I am itterating up vs down. I then check the next array item by 1+= the 
index number of the previously confirmed chip. If it passes all 4 rounds that means a match was found. I then call the whoWins()
function and pass in the color that won. I added breaks that will stop execution 
of code if it falls out of the range of either the array or keys. 
*/

diagRight(color) {
  const chips = chipRows.perpChips(); 
  for(let i = 0; i <= 8; i++){
    for(let j = 0; j <= 6; j++){
      let key = i; 
      let arrIndex = j;
      if(chips[key][arrIndex].classList.contains(color)){
        if(key >= 8 || arrIndex >= 6){
          break
        } else{
          key+=1; 
          arrIndex+=1;
        }
          if(chips[key][arrIndex].classList.contains(color)){
            if(key >= 8 || arrIndex >= 6){
              break
            } else{
              key+=1; 
              arrIndex+=1;
            }
              if(chips[key][arrIndex].classList.contains(color)){
                if(key >= 8 || arrIndex >= 6){
                  break
                } else{
                  key+=1; 
                  arrIndex+=1;
                }
                  if(chips[key][arrIndex].classList.contains(color)){
                    if(color === 'yellow'){
                      this.whoWins(4,0)
                    } else {
                      this.whoWins(0,4)
                    }}}}}}}} 
/*
The way this works is I itterate over all the array verically. When I find a chip that 
conatins the class list of the specified color i start to iterate backwards. There are 9 keys in 
the object that contains the chips. I start going back from 8-7-6-5-4-3-2-1-0. I then check the next array item by 1+= the 
index number of the previously confirmed chip. If it passes all 4 rounds that means a match was found. I then call the whoWins()
function and pass in the color that won. I added breaks that will stop execution 
of code if it falls out of the range of either the array or keys. 
*/
diagLeft(color) {
  const chips = chipRows.perpChips(); 
  for(let i = 8; i >= 0; i-=1){
    for(let j = 0; j <= 6; j++){
      let key = i; 
      let arrIndex = j;
      if(chips[key][arrIndex].classList.contains(color)){
        if(key <= 0 || arrIndex >= 6){
          break
        } else{
          key-=1; 
          arrIndex+=1;
        }
          if(chips[key][arrIndex].classList.contains(color)){
            if(key <= 0 || arrIndex >= 6){
              break
            } else{
              key-=1; 
              arrIndex+=1;
            }
              if(chips[key][arrIndex].classList.contains(color)){
                if(key <= 0 || arrIndex >= 6){
                  break
                } else{
                  key-=1; 
                  arrIndex+=1;
                }
                  if(chips[key][arrIndex].classList.contains(color)){
                    if(color === 'yellow'){
                      this.whoWins(4,0)
                    } else {
                      this.whoWins(0,4)
                    }}}}}}}} 

//this check to see if 4 chips have been aligned in a row vertically
//THIS ONE IS DONE AND
verticle() {
  const chips = chipRows.individualChips();
  for(let i = 1; i <= 7; i++){
    let red = 0;
    let yellow = 0;
    let lastChip;
    for(let chip of chips[i]){
      if(chip.className === 'chip-container yellow') {
        lastChip !== 'yellow' ? (yellow = 1) && (lastChip = 'yellow') : yellow = yellow + 1;
        this.whoWins(yellow, red)
      } else if(chip.className === 'chip-container red') {
        lastChip !== 'red' ? (red = 1) && (lastChip = 'red') : red = red + 1;
        this.whoWins(yellow, red)
      }
    }
  }
}

//This does almost the same as the vertical() function but it 
//Checks against the perpendicular axis
perp() {
  const chips = chipRows.perpChips();
  for(let i = 0; i <= 8; i++){
    let red = 0;
    let yellow = 0;
    let lastChip;
    for(let chip of chips[i]){
      if(chip.className === 'chip-container yellow') {
        lastChip !== 'yellow' ? yellow = 1 : yellow = yellow + 1;
        lastChip = 'yellow'
        this.whoWins(yellow, red)
      } else if(chip.className === 'chip-container red') {
        lastChip !== 'red' ? red = 1 : red = red + 1;
        lastChip = 'red'
        this.whoWins(yellow, red)
      } else{
        red = 0;
        yellow = 0;
      }
    }
  }
} 

//This will check to see if yellow or red has one when its called from
//one of the bellow checking functions (vertical(), perp(), and diag())
whoWins(yellow, red) {
  if(yellow === 4){
    endGameH2.innerHTML = 'Yellow Wins!'
    endGame.classList.add('endGame')
    eventListeners.disableClick()
  } else if(red === 4){
    endGameH2.innerHTML = 'Red Wins!'
    endGame.classList.add('endGame')
    eventListeners.disableClick()
  }
}

}


const checkWinner = new CheckWins


function checkWin(color) {
checkWinner.diagRight(color);
checkWinner.diagLeft(color);
checkWinner.verticle();
checkWinner.perp();
}




class AddChip {

constructor(lastChip, e) {
  this.lastChip = lastChip
  this.e = e
}
//this should create a new red or yellow chip and append it to the 
//containerCip div. It also adds a class to the container span 
//that says what color is in the div. 
newChip(chips, color) {
  const newChip = document.createElement('div')
  if(color === 'yellow') {
    newChip.className = 'chip-yellow';
    chips.classList.add('yellow');
  } else {
    newChip.className = 'chip-red';
    chips.classList.add('red');
  }
  chips.append(newChip);

  checkWin(color)
}

//this function will decied which chip should be selected
whatColor(chips, e) {
if(players.yellow > players.red) { 
  this.newChip(chips, 'yellow', e);
  players.red = players.red + 1; 
} else {
  this.newChip(chips, 'red', e)
  players.yellow = players.yellow + 1;
}
}

//This ensures that the last chip is selected on the board. 
//Then it passes in the whatColor() function when the last container 
//is selected to finish deciding what color should go in there
bottomSelector(lastChip,e) {
let chips = lastChip;
for(let i = 0; i < 9; i++){
if(chips === null) {
  return
} else if(chips.className === 'chip-container') {
  return this.whatColor(chips, e)
} else {
chips = chips.previousSibling
}
}
}

}

const addChip = new AddChip;


class EventListener {
 
constructor(e){
  this.e = e;
}
//This is the event listener that will be added when enableClicks
//is called and removed when  disableCLicks is called

addEventListener(e) {
  const lastChip = e.target.parentElement.lastElementChild
  addChip.bottomSelector(lastChip, e)
}

//This function will add an event listener to all the chip containers
//and when a block is clicked, will call the whichChip function to see
//if it should be red or yellow
enableClicks() {
for(let row of rows){
  row.addEventListener('click', this.addEventListener)
}
}

disableClick() {
  for(let row of rows){
    row.removeEventListener('click', this.addEventListener)
  }
}
}

const eventListeners = new EventListener

//This adds an event listener on the start button. When the start button
//is clicked, the enableClicks() function will then be called to prevent
//unwanted clicks
startBtn.addEventListener('click', () => {
  startGame.classList.toggle('startGame');
  eventListeners.enableClicks();
  })
  
  endBtn.addEventListener('click', () => {
    location.reload();
  })


//This will create all the new chips when the DOM is loaded.
 document.addEventListener('DOMContentLoaded', () => {
   for(let row of rows){
      for(let i = 0; i <= 8; i++) {
     const chipContainer = document.createElement('div');
     chipContainer.className = 'chip-container'
     row.append(chipContainer)
  }
   }
   chipContainer = document.querySelectorAll('.chip-container');
 })