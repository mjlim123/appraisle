
import Attempts from "./components/Attempts";
import Guess from "./components/Guess";
import Video from "./components/Video";
import { client } from "mongodb"

const { MongoClient } = require('mongodb');

async function Home() {

  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  const database = client.db("appraisle").collection("videos");
  const chooseRandom = await database.aggregate([{$sample : {size: 1}}]).toArray();

  const randomVideo = chooseRandom[0].videoID;
  const randomPrice = chooseRandom[0].Price;

  console.log(randomPrice, randomVideo)


  return (
      <div>
        <div className="mainContainer">
          <Video videoID={randomVideo}/>
          <Guess answer={randomPrice}/>
        </div>
        
      </div>
    )
  }

export default Home;

  
