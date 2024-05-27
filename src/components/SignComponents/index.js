import React, { useEffect } from "react";
import { useState } from "react";
import InputComponent from "../Common/input";
import Button from "../Common/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "@firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import FileInput from "../Common/input/FileInput";

function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
   

 

  // //steps
  // 1.validate user Credential (done)
  // 2.create new user (done)
  // 3.push them into firestore db (done)

  const handleSignup = async () => {
    console.log("signup starts...");
    setLoading(true);
    //validate pass and enter inside
    //else do somthing
    if (fullName && email && password === confirmPassword && password.length > 6) {
      try {

        //creating user account
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
  
          // profilePic
        );
        const user = userCredential.user;
        console.log("user",user);
        console.log("user profile pic",user.metadata.photURL);

        //saving users data into database
        await setDoc(doc(db,"users",user.uid),{
          name:fullName,
          email:user.email,
          uid:user.uid,
          profilePic:fileURL?fileURL:"",
          
        });


          //calling the redux action
          dispatch(
            setUser({
            name:fullName,
            email:user.email,
            uid:user.uid,
            profilePic:fileURL?fileURL:"",
          }))
          toast.success("user created sucessfully");
          setLoading(false);

          //after registerar=tion navigate to profile page
          navigate("/profile");


      } catch (e) {
        console.error("error", e);
        toast.error(e.message)
        setLoading(false);
      }

    } else {
      //error get out :)   bla bla blaaaaaaaaa
      console.error("plz fill all fields");
      // alert("plz fill all fields")
      if(!fullName || !email || !password){
        toast.error("plz all the fields")
      }
      else if(password.length < 6){
        toast.error("password must be 6 didgit long")
      }else if (password != confirmPassword){
        toast.error("password do not match")
      }
      setLoading(false);
    }
}

// for profile pic
const profilePicFn=(file,_)=>{
  return setFileURL(file)
}

    return (
      <form onSubmit={handleSignup}>
        <InputComponent
          type="text"
          placeholder="full name"
          state={fullName}
          setState={setFullName}
          required={true}
        />

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

        <InputComponent
          type="Password"
          placeholder="confirm password"
          state={confirmPassword}
          setState={setConfirmPassword}
          required={true}
        />
          {/* <FileInput
        accept={"image/*"}
        id={"profilePic-image-input"}
        fileHandlefn={profilePicFn}
        text="Upload Your ProfilePic"
      /> */}
        <Button text={loading ? "loading..." : "signup"}  disabled={loading} onClick={handleSignup} />
        
      </form>
    );
  }


export default SignupForm;
