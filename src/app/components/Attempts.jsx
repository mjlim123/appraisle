

export default function Attempts({guesses}) {

    let nextKey = 0;

    return (
        <div className="attemptsContainer">
            {guesses.map((guess) => 
                <div key={nextKey++} className={guess.rightOrWrong ? 'attemptsCorrect' : 'attemptsWrong'}>
                    <div>{guess.guess}</div>
                    <div>{guess.highOrLow}</div>
                </div>
        )}
        </div>
        
    )
}