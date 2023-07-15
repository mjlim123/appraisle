

export default function Guess({answer}) {

    async function submit(data) {
        "use server"
        console.log(answer);
        var player_guess = data.get("guess");
        var plusTenPercent = answer * 1.10;
        var minusTenPercent = answer * .90;
        if (player_guess >= minusTenPercent && player_guess <= plusTenPercent) {
            console.log("Correct")
        }
    }
    return (
        <div> 
            <form action={submit} className="inputPositioning"> 
                <input className="guessTextStyling" type='text' name="guess" placeholder='Enter Guess'></input>     
                <button className="guessButtonStyling" type='submit'>Guess</button>
            </form>
            <h1> Guess how much this property costs within 10% to win!</h1>
        </div>
    )
    
}