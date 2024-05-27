import React, { useState } from "react";
import Header from "../components/Common/Header";

import SignupForm from "../components/SignComponents";
import LoginForm from "../components/loginFormComponents";
import ForgetPassword from "../components/loginFormComponents/ForgetPassword";

export default function SignUpPage() {
  
  const [flag,setFlag] = useState(false);
  const [showLogin,setShowLogin] = useState(true)

  
  return (
    <div>
      <Header />
      <div className="input-wrapper">
        {!flag ? <h1>Signup</h1> :showLogin? <h1>Login</h1>:<h1>Update Your Password</h1>}
        {!flag ? <SignupForm/> : showLogin ? <LoginForm setShowLogin={setShowLogin}/>:<ForgetPassword showLogin={showLogin}/>}

        {!flag ? (
          <p  style={{cursor:"pointer"}} onClick={()=>setFlag(!flag)}>Already have an account click here to Login </p> 
        )
        : 
        (
          <p style={{cursor:"pointer"}} 
               onClick={()=>{
                  setFlag(!flag)
                  setShowLogin(true)
          }}
          >
            dont have an account click here  to Signup</p>
        )}
      </div>
    </div>
  );
}
