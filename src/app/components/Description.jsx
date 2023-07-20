

export default function Description({videoDescription}) {

    let nextKey=0;

    const lines = videoDescription.split('\n');

    return(

        <div>
            {lines.map((descLine) => 
                <div key={nextKey++}>
                    <h1 className="description">{descLine}</h1>
                </div>
        )}
        </div>

    )

}