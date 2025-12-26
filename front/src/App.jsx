import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'

function App() {
  const [url, setUrl] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
async function handlesubmit() {
  setLoading(true);
  const videoId = url.split('.be/')[1]?.split('?')[0];
  console.log("Video ID:", videoId);
  try{
    const res=await axios.post("https://youtube-translator-t3sk.onrender.com", { url, videoId });
    setResult(res.data.summary);
    setLoading(false);
  }
  catch(er){
    console.error("Error fetching transcript:", er);
    setResult("Failed to fetch transcript. Please check the video URL.");
    setLoading(false);
  }

}
  return (
    <div className='background'>
    <div className="logo">
      <img src="https://ih1.redbubble.net/image.3975105605.5329/flat,750x,075,f-pad,750x1000,f8f8f8.jpg" className="logo" alt="Vite logo" />
    </div>
    <h1>Welcome to Doremon Youtube translator</h1>

    <input onChange={(e)=>{setUrl(e.target.value)}} value={url}/>
   
    <button onClick={handlesubmit}>Submit</button>

    <div className='result'>
      {loading ? <div><img src='https://i.pinimg.com/originals/59/30/74/593074c302700c41ae6fdfeca3d51563.gif'/></div> : <p>{result}</p>}
    </div>
     </div>
  )
}

export default App
