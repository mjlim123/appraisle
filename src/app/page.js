import Guess from "./components/guess";
import Video from "./components/Video";
import {db} from "../../firebase"
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
  return (
    <div>
      <div className="rectangle"></div>
      <Video />
      <Guess />
    </div>
  )
}
