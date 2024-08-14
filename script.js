const letters=document.querySelectorAll(".scoreboard-letter")
const letterApi="https://words.dev-apis.com/word-of-the-day";
let rowNumber=0;

//main function
async function init(){
    let currentGuess= ''
    const promise= await fetch(letterApi);
    const res=await promise.json();
    const theWord = res.word.toUpperCase();
   

function addletter(letter){
    if(currentGuess.length < 5){
        currentGuess+=letter;
    }else{
        currentGuess=currentGuess.substring(0,currentGuess.length-1)+letter;
    }
    sub=5*rowNumber+currentGuess.length-1;
    letters[sub].innerText=letter;
}

//adding event listener for each click
document.addEventListener('keydown',event => 
    {
    const action=event.key;
    
    if(action==='Enter'){
        commit();
    }else if(action==='Backspace'){
        backspace();
    }else if(isLetter(action)){
        addletter(action.toUpperCase());
    }else{
        //do nothing
    }

    
})
function isLetter(letter){
    return /^[a-zA-Z]$/.test(letter);
}

async function commit(){

    if(currentGuess.length!=5){
        return;
    }
    
   
   if(theWord===currentGuess)alert("you won,the word was "+theWord)
    const correctChar=[];
    for(let i=0;i<5;i++){
        if(theWord[i]==currentGuess[i]){

            if(correctChar.includes(currentGuess)){ 
                continue;
            } else{

                correctChar.push(currentGuess[i])
                correct(i);}
            }
        }
    
        
        for(let i=0;i<5;i++){
            let count=0;
            for(let j=0;j<5;j++){
                if(theWord[i]==currentGuess[j] && theWord[i]!=currentGuess[i]){
                    count++;
                }
                if(theWord[i]==currentGuess[j] && theWord[i]!=currentGuess[i] && count>=1)
                    {
                      close(j);    
                }
            }
        }

    if(rowNumber>4){
        alert(`You loose the word was ${theWord}`);
        letters.innerText=''
    }
     rowNumber++;
     currentGuess='';
   
}
function correct(n){
    
    let num=n+5*rowNumber;
   document.getElementById(`letter-${num}`).style.backgroundColor="green";
}
function close(n){
    let num=n+5*rowNumber;
    document.getElementById(`letter-${num}`).style.backgroundColor="yellow";
}


function backspace(){
    currentGuess=currentGuess.substring(0,currentGuess.length-1)
    letters[5*rowNumber+currentGuess.length].innerText=""
 
}

}
init(); 


