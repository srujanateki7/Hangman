"use strict";   //Strict Mode 

//Start Game
function startGame(){
    document.querySelector('main').style.display='flex';
    document.querySelector('main').style.flexDirection='column';
    document.querySelector('main').style.alignItems='center';
    document.querySelector('.notification-banner').style.display='block';
    document.querySelector('.startGame button').style.display='none';
}

// Few Words are given in string for HangmanGame
let gameWords = ['html', 'css', 'javascript',  'c', 'java', 'concatenate' ,'iteration',
              'index','visual studio code', 'angular', 'react', 'python', 'sql', 'dbms','C#' ];


const hangmanGameWords = document.querySelector('.words');
const hangmanGameWrongLetters = document.querySelector('#wrong-letters');
const playAgainbtn = document.querySelector('#playAgain-button');
const popUp = document.querySelector('.popup-container');
const notificationBanner = document.querySelector('.notification-banner');
const finalMsg = document.querySelector("#final-message");


// Hangman Figure 
const hangmanBodyParts = document.querySelectorAll('.hangman-body-parts');

// Picks a random word from gameWord 
let generatedWords = gameWords[Math.floor(Math.random() * gameWords.length)];
console.log(generatedWords);


//Shows Underscore  according to the word
let answerArr =[];
for(var i=0;i <generatedWords.length;i++){
    answerArr[i] ='_';
}
console.log(answerArr);

//Empty arrays for right and wrong letters 
const rightLetters = [];
const wrongLetters = [];

// Display Hidden Words 
function showWords(){
    // document.querySelector
    hangmanGameWords.innerHTML= `${generatedWords.split('') 
    .map(letter => `<span class= "letter">
    ${rightLetters.includes(letter) ? letter : ''}
    </span> `
    )
    .join('')}
    `;

   // Display congratulations if letters are correct which are present in generated words
    const innerWord = hangmanGameWords.innerText.replace(/\n/g, ''); //g- globalMatch

    if(innerWord === generatedWords){
        document.querySelector('main').style.filter = "blur(5px)";
        finalMsg.innerText ='Congratulations! You Won 😀';
        popUp.style.display='flex';
      
        
    }
}

// updates Wrongletters
function updatedWrongLetter(){
    hangmanGameWrongLetters.innerHTML = `
    ${wrongLetters.length > 0 ? '<span>wrong</span>' : '' }
    ${wrongLetters.map(letter => `<span>${letter}</span> `)}
    `;

    //Display hangman figure 
    hangmanBodyParts.forEach((hangmanpart,index) => {
        const errors = wrongLetters.length;

        if(index < errors){
            hangmanpart.style.display ='block';
        }
        else {
            hangmanpart.style.display ='none';
        }

    });

  // Cheking weather game is lost
    if(wrongLetters.length === hangmanBodyParts.length ){
        document.querySelector('main').style.filter = "blur(5px)";
        finalMsg.innerText = 'Unfortunately you lost 😬';
        popUp.style.display= 'flex';
        document.querySelector('.popupGameOver').style.display='flex';
       
        
    }   
    
}

//notification Bannner in case of repeated letter
function displayNotification(){
    notificationBanner.classList.add('show');
    setTimeout( ()=>{
        notificationBanner.classList.remove('show');
    }, 1000);
}


/// Takes input from keyboard
window.addEventListener('keydown',k =>{
    if(k.keyCode >= 35 && k.keyCode <=90){ //
        const letter =k.key;
        

        if (generatedWords.includes(letter)){
            if(!rightLetters.includes(letter)){
                rightLetters.push(letter);
                showWords();
            }else{
                displayNotification();
            }
        } else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updatedWrongLetter();
            } else{
                displayNotification();
            }
        }
    }
});

//Play again function for hangman game
playAgainbtn.addEventListener('click', () => {

    rightLetters.splice(0);
    wrongLetters.splice(0);

    generatedWords = gameWords[Math.floor(Math.random() * gameWords.length)];
    showWords();

    updatedWrongLetter();
    popUp.style.display ='none';
 
});

showWords();





































