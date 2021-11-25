// Consegna
// L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, 
// in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.











// let bombNumberContainer = [];
let numberOfBombs = 15;

const playButton = document.getElementById('play_button')


playButton.addEventListener('click', playThisDifficulty);
    
// let myGrid = document.getElementById('grid');
// myGrid.innerHTML = '';


// let thisDifficult = squareNumbersGenerator(gameDifficult);

// for(let i = 0; i < thisDifficult.length; i++) {
//     const thisNumber = thisDifficult[i];
//     const newSquareGenerated = itemGenerator(thisNumber);

//     newSquareGenerated.addEventListener('click', squareOnClick);

//     myGrid.appendChild(newSquareGenerated);
// }







//FUNCTIONS CALL BACK


function playThisDifficulty () {
    let myGrid = document.getElementById('grid');
    let myTitle = document.getElementById('title');
    myGrid.classList.remove('hidden');
    myTitle.classList.add('hidden');
    myGrid.innerHTML = '';
    document.getElementById('game_result').classList.add('hidden');
  

    const gameDifficult = parseInt( document.getElementById('game_difficult').value );
    let maxGridNumber;
    let gridDimension;
    if ( gameDifficult === 1 ) {
        maxGridNumber = 100;
        gridDimension = 10;
    } else if ( gameDifficult === 2 ) {
        maxGridNumber = 81;
        gridDimension = 9;
    } else if ( gameDifficult === 3 ) {
        maxGridNumber = 49;
        gridDimension = 7;
    }

    // let thisDifficult = squareNumbersGenerator(gameDifficult);

    //genero array di bombe
    const bombsArray = bombGenerator(maxGridNumber, numberOfBombs);

    //numero massimo tentativi dopo il quale l'utente vinto
    const maxUserAttempts = maxGridNumber - bombsArray.length

    //numeri selezionati (non bombe)
    const userNumberSelected = [];


    console.log(bombsArray);

    for( let i = 1; i <= maxGridNumber; i++ ) {
        
        const newSquareGenerated = itemGenerator(i, gridDimension);

        newSquareGenerated.addEventListener('click', squareOnClick);

        myGrid.appendChild(newSquareGenerated);
    }
    
    

    ///////////////////////
    //funzioni specifiche//
    ///////////////////////

    function squareOnClick() {
        // this.classList.add('active');

        //leggo numero nello square e lo converto in numero
        const clickedSquare = parseInt( this.querySelector('span').textContent );
        console.log(clickedSquare)
        
        //se l'array di bombe contiene il numero dello square selezionato
        //il gioco finisce
        //lo square diventa rosso
        if (bombsArray.includes(clickedSquare)) {
            this.classList.add('bomb');
            endGame('lose');
        } else {
            //se non è presente lo square diventa azzurro ed elimino evento al click
            this.classList.add('active');
            this.style.pointerEvents = 'none';

            //aggiungo il numero all'array dei numeri selezionati
            userNumberSelected.push(clickedSquare);
            
            if ( userNumberSelected.length >= maxUserAttempts ) {
                endGame('win');
            }

        }

    }

    function endGame(winOrLose) {
        let gameResult;
        if ( winOrLose === 'win' ) {
            gameResult = 'hai vinto'
        } else {
            gameResult = `Hai perso, hai azzeccato ${userNumberSelected.length} caselle`;
        }
        let finalMessageContainer = document.getElementById('game_result');
        finalMessageContainer.innerHTML = gameResult;
        finalMessageContainer.classList.remove('hidden');

        const allSquare = document.getElementsByClassName('square');

        for (let i = 0; i < allSquare.length; i++) {
            const thisSquare = allSquare[i];
            thisSquare.style.pointerEvents = "none";

            if ( gameResult !== 'hai vinto') {
                bombsArray.classList.add('bomb');
            }
        }
    }
}





/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////


//FUNCTIONS




function bombGenerator (maxNumberGenerated, bombsHidden) {
    let bombsArray = [];

    while ( bombsArray.length < bombsHidden ) {
        const thisNumber = getRndInteger(1, maxNumberGenerated);
        
    
        if ( !bombsArray.includes( thisNumber ) ) {
            bombsArray.push(thisNumber);
        }
    }
    
    return bombsArray;
}

// let prova2 = bombGenerator(16, 16);

// console.log(prova2);
















// function itemGenerator (number) {
//     const newSquare = document.createElement('div');
//     newSquare.classList.add('square')
//     newSquare.innerHTML = `<span>${number}</span>`;
//     return newSquare;
// }

function itemGenerator(number, numberOfCell) {
    const newSquare = document.createElement('div');
    newSquare.classList.add('square')
    newSquare.innerHTML = `<span>${number}</span>`;

    newSquare.style.width = `calc(100% / ${numberOfCell})`;
    newSquare.style.height = `calc(100% / ${numberOfCell})`;

    return newSquare;
}


////////////////////////////////////////////////////////////////////////////////////////


//FUNZIONE che genera numeri non ripetuti fino ad un numero dato
//creo un array vuoto dove andare ad inserire i numeri fino al valore indicato

//il valore di gameDifficult deve essere un numero intero

//return darà come risultato il totale di numeri richiesti NON ripetuti

function squareNumbersGenerator(gameDifficult) {
    let myNumbersArray = [];

    
    //per ogni ciclo pusho un numero nell'array fino al valore indicato in gameDifficult
    for (let i = 1; i <= gameDifficult; i++) {
        let thisNumber = [i];
        myNumbersArray.push(thisNumber);
    }

    // while ( myNumbersArray.length < gameDifficult) {
    //     const thisNumber = getRndInteger(1, gameDifficult)
        
    //     if ( !myNumbersArray.includes( thisNumber ) ) {
    //         myNumbersArray.push(thisNumber);
    //     }
    // }
    // myNumbersArray.sort( function (a, b) {
    //     return a - b;
    // })
    
    return myNumbersArray;
}


/////////////////////////////////////////////////////////////////////////////////////////


//funzione che genera numeri casuali da min a max, compresi
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
