import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import { useParams } from "react-router-dom";
import Header from "../components/Common/Header";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import {toast} from "react-toastify"
import Button from "../components/Common/Button";
import EpisodeDetails from "../components/Common/podcasts/EpisodeDetails";
import AudioPlayer from "../components/Common/podcasts/AudioPlayer";

function PodcastDetailsPage() {
  const { id } = useParams();
  const [podcast,setPodcast]= useState({});
  const [episodes,setEpisodes] = useState([]);
  const [playingFile,setPlayingFile] = useState("");
  const navigate = useNavigate();
  console.log("id", id);

  useEffect(() => {
    if(id){
        //to avoid memory leak ;)
        getData();
    }
  }, [id]);
  


  useEffect(()=>{
    const unsubscribe = onSnapshot(
      query(collection(db,"podcasts",id,"episodes")),
      (querySnapshot)=>{
        const episodeData = [];
        querySnapshot.forEach((doc)=>{episodeData.push({id:doc.id,...doc.data()});
      });
      setEpisodes([...episodeData]);
      },
    (error)=>{
      console.error("error fetching episodes",error)
    }
    );
    return ()=>{
      unsubscribe();
    }
  },[id])

  const getData = async () => {
   try{
    const docRef = doc(db, "podcasts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setPodcast({id:id,...docSnap.data()})
    //   toast.success("podcast found");
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such podcast!");
      toast.error("No such podcast!");
      navigate("/podcast");
    }
   }
   catch(e){
    console.log("error",e)
    toast.error(e.message);
   }
  };
  return (
    <div>
      <Header />

      {/* header of the podcast */}
      <div className="input-wrapper" style ={{marginTop:"2rem"}}>
        {
        podcast.id && <>
        <div style={{display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        width:"100%",
        height:"80px"}}>
            <h1 className="podcast-tittle-heading">{podcast.tittle}</h1>
            {podcast.createdBy === auth.currentUser.uid && (
                <Button 
                style ={{width:"200px",margin:"0px"}}
                onClick = {()=>{
                    navigate(`/podcast/${id}/create-episode`)
                }}
                
                text={"create episodes + "} />
            )}
        </div>

        {/* detail of the podcast from create-a-podcast page */}
            <div className="banner-wrapper">
                <img src={podcast.bannerImage} alt={podcast.tittle} />
            </div>
            <p className="podcast-desc">{podcast.description}</p>

            {/* all episodes here  with audio files */}
            <h1 className="podcast-tittle-heading">Episodes</h1>
            {
              episodes.length ?
               <>
               {episodes.map((episode,index)=>{
                return <EpisodeDetails key ={index} 
                tittle={episode.tittle} 
                index={index+1}
                description={episode.description} 
                audioFile={episode.audioFile}
                onClick = {(file)=>setPlayingFile(file)} />
              })} 
              </>
               :
              <>
              <p>no episodes</p>
              </>
            }
        </>}
      </div>
      {playingFile && <AudioPlayer playingFile={playingFile} audioSrc={playingFile} image ={podcast.displayImage}/>}
    </div>
  );
}

export default PodcastDetailsPage;
