import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/Common/Header';
import Button from '../components/Common/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import Loader from '../components/Common/Loader';

function Profile() {
 

    const user = useSelector(state => state.user.user);
    console.log("my user",user)
  function handleLogOut(){
    signOut(auth).then(()=>{
      toast.success("user Logged out successfully");
    }).catch((e)=>{
      toast.error(e.message)
    })

  }


  if(!user){
    return <Loader/>
  }
  return (
    <div>
        <Header/>
        {/* <Loader/> */}
        <marquee style={{color:"yellow"}} direction="to left">Note : this page is under contruction ...</marquee>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
            <Button text ={"LogOut"} onClick={handleLogOut}/>
        </div>
    </div>
  )
}

export default Profile