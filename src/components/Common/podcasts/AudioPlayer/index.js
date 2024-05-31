import React, { useEffect, useRef, useState } from 'react';
import {FaPlay,FaPause,FaVolumeUp,FaVolumeMute} from "react-icons/fa";
import "./style.css";

function AudioPlayer({audioSrc,image,playingFile}) {
    const [duration,setDuration] = useState(0);
    const [currentTime,setCurrentTime] = useState(0);
    const [isplaying,setIsPlaying] = useState(false);
    const [isMute,setIsMute] = useState(false);
    const [volume,setVolume] = useState("");
    const audioRef = useRef();
    useEffect(()=>{
      if(isplaying){
        audioRef.current.pause();
        
      }else{
        audioRef.current.play();
        audioRef.current.volume= 1;
      }
    
    },[isplaying]);
    useEffect(()=>{
      if(isplaying){
        audioRef.current.pause();
        
      }else{
        audioRef.current.play();
        // audioRef.current.volume= 1;
      }
    
    },[playingFile]);
  
  
    useEffect(()=>{
      const audio = audioRef.current;
      audio.addEventListener("timeupdate",handleTimeUpdate);
      audio.addEventListener("loadedmetadata",handleLoadedMetadata);
      audio.addEventListener("ended",handleEnded);

      return ()=>{
        audio.removeEventListener("timeupdate",handleTimeUpdate);
      audio.removeEventListener("loadedmetadata",handleLoadedMetadata);
      audio.removeEventListener("ended",handleEnded);
      }
    },[])

    // useEffect(()=>{
    //     audioRef.current.play();
    //     audioRef.current.volume = volume;
     
          
    
    // },[audioRef]);

    useEffect(()=>{
      if(!isMute){
        audioRef.current.volume = .5;
        // setVolume(1);
      }
      else{
        audioRef.current.volume = 0;
        // setVolume(0)
      }
    },[isMute]);

    const handleTimeUpdate=()=>{
      setCurrentTime(audioRef.current.currentTime);
    }
    const handleLoadedMetadata=()=>{
      setDuration(audioRef.current.duration);

    }
    const handleEnded=()=>{
      setCurrentTime(0);
      setIsPlaying(false);
    }

    const handleDuration=(e)=>{
      const newTime = e.target.value;
      setCurrentTime(newTime);
      audioRef.current.currentTime = newTime;
     
    }
    const formatTime = (time) =>{
      const minutes = Math.floor(time/60) ;
      const seconds = Math.floor(time%60);
      return `${minutes}:${seconds < 10 ? "0":""}${seconds}`
    
    };
    const togglePlay=()=>{
      if(isplaying){
        setIsPlaying(false);
      }else{
        setIsPlaying(true);
      }
    }
    const toggleMute=()=>{
      if(isMute){
        setIsMute(false);
        
      }else{
        setIsMute(true);

      }
    }
    const handleVolume=(e)=>{
      setVolume(e.target.value);
      audioRef.current.volume= e.target.value;
    }
    const handlePlayBackSpeed = (e) =>{
      // e.preventDefault();
      let time = e.target.value || 1;
      // if(time){
        audioRef.current.playbackRate = time;
        
      
      // audioRef.current.playbackRate = 1;
      
    }


  return (
    <div className='custom-audio-player'>
        <img src={image} className='display-image-player'  alt="#" />
        <audio ref={audioRef} src={audioSrc}></audio>
        <div className='duration-flex'>
        <p className="toogle-btn" onClick={togglePlay}> {isplaying  ? <FaPlay/> :<FaPause/>   }</p>
        <p>{formatTime(currentTime)}</p> 
        <input type="range" 
        value={currentTime}
        max={duration}
        step={0.01}
        onChange={handleDuration} 
        className='duration-range'/>
        <p>-{formatTime(duration-currentTime)}</p>
        <input type="text" pattern="[0-9]"style={{width:"30px",height:"100%",outline:"none",borderRadius:"5px"}}
        placeholder='1x' 
        onChange={handlePlayBackSpeed}/>
        {/* <select onChange={handlePlayBackSpeed} style={{backgroundColor:"grey",border:"none",borderRadius:"5px"}} name="select" id="">speed
        <option value=".5">0.5x</option>
        <option value="1" selected>1x</option>
        <option value="1.5">1.5x</option>
        <option value="2">2x</option>
        </select> */}
        <p className="toogle-btn"
         onClick={toggleMute}>{!isMute ? <FaVolumeUp/>:<FaVolumeMute/>}</p>
        <input type="range" 
        value ={volume}
        min={0} 
        max={1} 
        step ={0.03} 
        onChange={handleVolume} className='volume-range' />
        </div>
    
    </div>
  )
}

export default AudioPlayer