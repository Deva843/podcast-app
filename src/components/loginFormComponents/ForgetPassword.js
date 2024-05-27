import React, { useState } from 'react'
import InputComponent from '../Common/input';
import Button from '../Common/Button';

function ForgetPassword() {
    const [loading,setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const handleUpdate = () =>{
        console.log("update initiated")

    }
  return (
    <>
      
       
    <InputComponent
    type="email"
    placeholder="email"
    state={email}
    setState={setEmail}
    required={true}
  />

  <InputComponent
    type="password"
    placeholder="your new password"
    state={password}
    setState={setPassword}
    required={true}
  />
  <InputComponent
    type="password"
    placeholder="confirm password"
    state={confirmPassword}
    setState={setConfirmPassword}
    required={true}
  />

  <Button text={loading ? "loading...":"update your password"} disabled={loading} onClick={handleUpdate} />
  
  {/* <p style={{margin:"0", cursor:"pointer",border:"2px solid white"}} onClick={()=>setShowLogin(false)}>forget your password?</p> */}
    </>
   
);
  
}

export default ForgetPassword