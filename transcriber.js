import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config();
async function transcribe(url){
    return axios.get("https://transcriptapi.com/api/v2/youtube/transcript?video_url="+url,{headers:{"Authorization":
"Bearer "+process.env.transcibe
    }}).then((res)=>{
        let text=""
        res.data.transcript.forEach((t)=>{
            text+=t.text+" "
        })
        return text;
    })
}
export default transcribe