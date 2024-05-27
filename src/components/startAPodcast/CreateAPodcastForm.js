import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import InputComponent from "../Common/input";
import Button from "../Common/Button";
import FileInput from "../Common/input/FileInput";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import { addDoc, collection} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function CreateAPodcastForm() {
  const [tittle, setTittle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayImage, setDisplayImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log("podcast Initiated...");
    if (tittle && desc && displayImage && bannerImage) {
      setLoading(true)
      try{
         //1.upload files and get it as downloadble link
            //for bannerImage
          const bannerImageRef = ref(
            storage,
            `podcasts/${auth.currentUser.uid}/${Date.now()}`
          );
          await uploadBytes(bannerImageRef,bannerImage);
          
          const bannerImageUrl = await getDownloadURL(bannerImageRef);

          console.log("banner image", bannerImageUrl)
          console.log("banner image is ", bannerImage)
          

          // for displayImage
          const displayImageRef = ref(
            storage,
            `podcasts/${auth.currentUser.uid}/${Date.now()}`
          );
          await uploadBytes(displayImageRef,displayImage);
          
          const displayImageUrl = await getDownloadURL(displayImageRef);
          console.log("display image", displayImageUrl);
       //2.create a new document in new collection called podcast add them into data base

       // below code will update exiting datas 
          // await setDoc(doc(db,"podcasts",auth.currentUser.uid),{
          //   tittle:tittle,
          //   description:desc,
          //   bannerImage:bannerImageUrl,
          //   displayImage:displayImageUrl,
          //   createdBy:auth.currentUser.uid,
          //   // profilePic:fileURL,
          // });

              //if we miss auth.currentuser.uid on set doc fn we will get error 
              //anotherway of doing it is below 
              //add doc will add new data to the db
               
                 const podcastData = {
                  tittle: tittle,
                  description: desc,
                  bannerImage: bannerImageUrl,
                  displayImage: displayImageUrl,
                  //this is current user data dont use user.uid coz we didnt mentioned user ref anywhere here
                  createdBy: auth.currentUser.uid,
                 };
                 const docRef = await addDoc(collection (db, "podcasts"), podcastData);
                              
              
            
          setLoading(false);
          toast.success("podcast created");
          setTittle("");
          setDesc("");
          setBannerImage(null);
          setDisplayImage(null);
          navigate("/podcast")
          // bannerImageHandle(null);
          // displayImageHandle(null);
      



      //3.save this podcast edpisode states in our podcast


      }
      catch(e){
        toast.error(e.message);
        setLoading(false);

      }
     
    } else {
      toast.error("please fill all fields ");
      setLoading(false);
    }
  };
  const displayImageHandle = (file,setFileSelected) => {
    setDisplayImage(file);
    // setFileSelected("");
  };
  const bannerImageHandle = (file,setFileSelected) => {
    setBannerImage(file);
    // setFileSelected("");
  };
  return (
    <>
      <InputComponent
        type="text"
        placeholder="Podcast name"
        value={tittle}
        setState={setTittle}
        required={true}
      />

      <InputComponent
        type="text"
        placeholder="Description"
        value={desc}
        setState={setDesc}
        required={true}
      />

      {/* below is not good for ui changes so used downlow code  */}
      {/* <InputComponent
        type="file"
        // placeholder="choose a file"
        state={displayImage}
        setState={setDisplayImage}
        required={true}
      /> */}

      <FileInput
        accept={"image/*"}
        id={"display-image-input"}
        fileHandlefn={displayImageHandle}
        text="Import display Image"
      />

      <FileInput
        accept={"image/*"}
        id={"Banner-image-input"}
        fileHandlefn={bannerImageHandle}
        text="Import Banner Image"
      />

      <Button
        text={loading ? "loading..." : "Create now"}
        disabled={loading}
        onClick={handleSubmit}
      />
    </>
  );
}

export default CreateAPodcastForm;
