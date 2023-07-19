"use client"
import { use, useState } from "react";
import Attempts from "./Attempts";


export default function Guess({answer}) {

    const [winOrLose, setWinOrLose] = useState(null)
    const [gameover, setGameover] = useState(false)
    const [guesses, setGuesses] = useState([]);

    const [value, setValue] = useState('');
    const handleInputChange = (event) => {
        let inputValue = event.target.value.replace(/[^0-9]/g, ''); 
        
        
        if (inputValue !== '0' || inputValue.length > 1) {
          inputValue = inputValue.replace(/^0+/, '');
        }

        const maxLength = 12;
        inputValue = inputValue.slice(0, maxLength);
    
        const formattedValue = inputValue === '' ? '' : `$${Number(inputValue).toLocaleString()}`; 
        setValue(formattedValue);
      };

    const clear = (e) => {
        console.log("clear")
        setValue('');
    }

    async function submit(data) {
        console.log(guesses)
        console.log(data);
        var temp = data.get("guess");
        var player_guess = data.get("guess");
        if (player_guess == '') {
            ;
        }
        else {
            player_guess = player_guess.replace(/\,/g, '')
            player_guess = player_guess.substring(1);

            var plusTenPercent = answer * 1.10;
            var minusTenPercent = answer * .90;

            if (player_guess >= minusTenPercent && player_guess <= plusTenPercent) {
                setGuesses((guess) => [...guess, 
                    {
                        'guess': temp,
                        'rightOrWrong' : true,
                        'highOrLow' : '🏆 Correct!'
                    }
                ]);
                setGameover(true)
                setWinOrLose(true)
            }
            else {
                if (player_guess < minusTenPercent) {
                    setGuesses((guess) => [...guess, 
                        {
                            'guess': temp,
                            'rightOrWrong' : false,
                            'highOrLow' : '⬆️ Higher' 
                        }
                    ]);

                }
                else if (player_guess > plusTenPercent) {
                    setGuesses((guess) => [...guess, 
                        {
                            'guess': temp,
                            'rightOrWrong' : false,
                            'highOrLow' : '⬇️ Lower'
                        }
                ]);
            }
        }
        console.log(guesses.length)
        if (guesses.length == 4) {
            setGameover(true);
            setWinOrLose(false)
        }

    }
    
}
    return (
        <div>
            <div className="guessContainer">
                <form onSubmit={clear} action={submit} className="inputPositioning" autoComplete="off"> 
                    <input onChange={handleInputChange} className="guessTextStyling" value={value} name="guess"></input>     
                    <button disabled={gameover} className="guessButtonStyling" type='submit'>GUESS</button>
                </form>
                <h1 className="instructionsText"> Guess how much this property costs within 10% to win!</h1>                
            </div>
            <Attempts guesses={guesses}/>
            <div className="credits">{gameover ? `You ${winOrLose ? 'Win!' : 'Lose!'}` : null}</div>
        </div>
            
    )
    
}