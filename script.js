const letters = document.querySelectorAll(".scoreboard-letter");
const letterApi = "https://words.dev-apis.com/word-of-the-day";
const pop=document.querySelector(".losePopup");
let rowNumber = 0;

// main function
async function init() {
    let done=false;
    let currentGuess = '';
    const promise = await fetch(letterApi);
    const res = await promise.json();
    const theWord = res.word.toUpperCase();

    function addLetter(letter) {
       
        if (currentGuess.length < 5) {
            currentGuess += letter;
        } else {
            currentGuess = currentGuess.substring(0, currentGuess.length - 1) + letter;
        }
        const sub = 5 * rowNumber + currentGuess.length - 1;
        letters[sub].innerText = letter;
    }

    // adding event listener for each click
    document.addEventListener('keydown', event => {
        if(done){
            return;
        }
        const action = event.key;
        
        if (action === 'Enter') {
            commit();
        } else if (action === 'Backspace') {
            backspace();
        } else if (isLetter(action)) {
            addLetter(action.toUpperCase());
        } else {
            // do nothing
        }
    });

    function isLetter(letter) {
        return /^[a-zA-Z]$/.test(letter);
    }

    async function commit() {
       
         
        const res = await fetch("https://words.dev-apis.com/validate-word", {
            method: "POST",
            body: JSON.stringify({ word: currentGuess }),
          });
          const { validWord } = await res.json();
        
        if(!validWord){
            alert('not a valid word');
            return;
        }


        if (currentGuess.length != 5) {
            return;
        }

       

        const wordMap = {};
        for (let i = 0; i < 5; i++) {
            if (theWord[i] === currentGuess[i]) {
                correct(i);
            } else {
                wordMap[theWord[i]] = (wordMap[theWord[i]] || 0) + 1;
            }
        }

        for (let i = 0; i < 5; i++) {
            if (theWord[i] !== currentGuess[i] && wordMap[currentGuess[i]]) {
                close(i);
                wordMap[currentGuess[i]]--;
            } else if (theWord[i] !== currentGuess[i]) {
                wrong(i);
            }
        }
        if (theWord === currentGuess) {
            alert("You won! The word was " + theWord);
            popUP();
            done=true;
            
        }
        if (rowNumber >= 5) {
            console.log("inside lose");
           popUP();
                done=true;
                return;
          
        }
        function popUP(){
          
            pop.style.visibility="visible";
            clear();
        }
        
function clear(){
    document.addEventListener('click',()=>{
        pop.style.visibility="hidden";
        pop.style.value=`Thanks for playing today! /n Todays word was ${theWord}`;
        })
}
        rowNumber++;
        currentGuess = '';
    }

    function correct(n) {
        const num = n + 5 * rowNumber;
        document.getElementById(`letter-${num}`).style.backgroundColor = "darkgreen";
        document.getElementById(`letter-${num}`).style.color = "white";
    }

    function close(n) {
        const num = n + 5 * rowNumber;
        document.getElementById(`letter-${num}`).style.backgroundColor = "goldenrod";
    }

    function wrong(n) {
        const num = n + 5 * rowNumber;
        document.getElementById(`letter-${num}`).style.backgroundColor = "grey";
    }

    function backspace() {
        currentGuess = currentGuess.substring(0, currentGuess.length - 1);
        letters[5 * rowNumber + currentGuess.length].innerText = "";
    }

}
    init();
