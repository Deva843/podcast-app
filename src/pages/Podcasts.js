import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header';
import { useDispatch, useSelector } from 'react-redux';
import { auth, db } from '../firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { setPodcasts } from '../slices/podcastSlice';
import PodcastCard from '../components/Common/podcasts/podcastCard';
import InputComponent from "../components/Common/input/index"
import { useAuthState } from 'react-firebase-hooks/auth';

function Podcast() {
  const [search,setSearch] = useState("");
  const [user, loading, error]= useAuthState(auth);
  const dispatch = useDispatch();
  const podcasts = useSelector(state => state.podcasts.podcasts)
  let filteredPodcast = podcasts.filter((item) => item.tittle.trim().toLowerCase().includes(search.trim().toLowerCase()))

  useEffect(()=>{
    //fetch data from firebase db
    const unsubscribe = onSnapshot (
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(podcastsData));
        console.log("podcasts",podcastsData)
      },
      (error) => {
        console.error("Error fetching podcasts:", error);
      }
    );
    return ()=>{
      unsubscribe();
    }

  },[dispatch])
  return (
    <div>
      <Header/>

       <h2>Discover podcast</h2>
       <InputComponent
          type="search"
          placeholder="search by title"
          state={search}
          setState={setSearch}
        />
      { filteredPodcast.length  ?
      <div  style={{marginTop:"1rem"}}>

        <div className="podcasts-flex">
           {filteredPodcast.map((item,index)=>{
             return <PodcastCard id={item.id} key={index} tittle={item.tittle} displayImage={item.displayImage}/>
                     })
            }
        </div>

      </div>
      : 
     
      <div>
        {loading?"loading your data":"oops no data ...!"}
      </div>}
    </div>
  )
}

export default Podcast;