import React, { useEffect, useRef, useState } from 'react';
import {FaPlay,FaPause,FaVolumeUp,FaVolumeMute} from "react-icons/fa";
import "./style.css";

function AudioPlayer({audioSrc,image}) {
    const [duration,setDuration] = useState(0);
    const [currentTime,setCurrentTime] = useState(0);
    const [isplaying,setIsPlaying] = useState(true);
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
        audioRef.current.volume = volume;
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
      setIsPlaying(false)
    }

    const handleDuration=(e)=>{
      setCurrentTime(e.target.value);
      audioRef.current.currentTime= e.target.value;
    }
    const handleDurationChange = (e) => {
      const newTime = e.target.value;
      setCurrentTime(newTime);
      audioRef.current.currentTime = newTime;
    };
    const format = (time) =>{
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


  return (
    <div className='custom-audio-player'>
        <img src={image} className='display-image-player'  alt="#" />
        <audio ref={audioRef} src={audioSrc}></audio>
        <div className='duration-flex'>
        <p className="toogle-btn" onClick={togglePlay}> {isplaying  ? <FaPlay/> :<FaPause/>  }</p>
        <p>{format(currentTime)}</p> 
        <input type="range" 
        value={currentTime}
        max={duration}
        step={0.01}
        onChange={handleDuration} 
        className='duration-range'/>
        <p>-{format(duration-currentTime)}</p>
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