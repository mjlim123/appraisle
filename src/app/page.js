import Guess from "./components/guess";
import Video from "./components/Video";
import { db } from "../../firebase"
import { collection, getDocs } from "firebase/firestore";



async function Home() {

  var videos = []

  const querySnapshot = await getDocs(collection(db, "videos"));
  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  videos.push(doc.data());
  });

  const randomNumber = Math.floor(Math.random() * videos.length)

  const randomVideo = videos[randomNumber]["urlEmbed"]
  const randomPrice = videos[randomNumber]["Price"]
  console.log(randomVideo);




  return (
      <div>
        <div className="rectangle"></div>
        <Video videoID={randomVideo}/>
        <Guess answer={randomPrice}/>
      </div>
    )
  }

export default Home;

  
