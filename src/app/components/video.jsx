import YouTube from 'react-youtube'


async function Video(){




    return (
        <div>
            <div className="rectangle">
            </div>
            <div className="ytplayerContainer">
                <YouTube videoId={id}/>
                <button>Play</button>
            </div>
            
        </div>
    );}

export default Video;