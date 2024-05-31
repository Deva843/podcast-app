import React, { useState } from "react";
import InputComponent from "../Common/input";
import Button from "../Common/Button";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import {auth} from "../../firebase"

function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("update initiated");
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("email sent");

      setLoading(false);
    } catch (e) {
      console.log(e);
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

      <Button
        text={loading ? "loading..." : "get Email"}
        disabled={loading}
        onClick={handleUpdate}
      />
    </>
  );
}

export default ForgetPassword;
