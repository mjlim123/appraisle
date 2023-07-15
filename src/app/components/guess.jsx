


async function submit() {
    "use server"
    console.log("hi")
}


export default function Guess() {
    return (
        <div> 
            <form action={submit} className="inputPositioning"> 
                <input className="guessTextStyling" type='text' name="guess" placeholder='Enter Guess'></input>     
                <button className="guessButtonStyling" type='submit'>Guess</button>
            </form>
        </div>
    )
    
}