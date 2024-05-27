import React from "react";
import { useState } from "react";
import InputComponent from "../Common/input";
import Button from "../Common/Button";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUser } from "../../slices/userSlice";
import { toast } from "react-toastify";
import ForgetPassword from "./ForgetPassword";

function LoginForm({setShowLogin}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  // const [showLogin,setShowLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("signup starts...");
    setLoading(true);
    //validate pass and enter inside
    //else do somthing
    if (email && password.length > 6) {
      try {
        //signing in as  user account
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log("user", user);

        //getting users data
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();

        //calling the redux action
        dispatch(
          setUser({
            name: userData.name,
            email: user.email,
            uid: user.uid,
            profilePic:userData.profilePic,
          })
        );
         toast.success("login sucess")
         setLoading(false);
        //after registerar=tion navigate to profile page
        navigate("/profile");
        setEmail("");
        setPassword("")
      } catch (e) {
        console.error("error", e);
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      //error get out :)   bla bla blaaaaaaaaa
      console.error("plz fill all fields");
      if(!email || !password){
        toast.error('plz fill fields')
      }
      // alert("plz fill all fields");
      setLoading(false);
    }
  };

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
        placeholder="password"
        state={password}
        setState={setPassword}
        required={true}
      />

      <Button text={loading ? "loading...":"Login"} disabled={loading} onClick={handleLogin} />
      
      <p style={{margin:"0", cursor:"pointer"}} onClick={()=>setShowLogin(false)}>forget your password?</p>
        </>
       
  );
}

export default LoginForm;
