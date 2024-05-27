import React, { useState } from "react";
import Header from "../components/Common/Header";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import InputComponent from "../components/Common/input";
import FileInput from "../components/Common/input/FileInput";
import Button from "../components/Common/Button";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

function CreateAnEpisodePage() {
  const { id } = useParams();
  const [tittle, setTittle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioFile, setAudioFile] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const audioHandle = (file) => {
    setAudioFile(file);
};
  

  const handleSubmit = async () => {
    setLoading(true);
    if (tittle && desc && audioFile) {
      try {
        const audioRef = ref(
          storage,
          `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(audioRef, audioFile);
        const audioURL = await getDownloadURL(audioRef);
        const episodeData = {
          tittle: tittle,
          description: desc,
          audioFile: audioURL,
        };
        await addDoc(collection(db, "podcasts", id, "episodes"), episodeData);
        navigate(`/podcast/${id}`);
        setTittle("");
        setDesc("");
        setAudioFile("");
        toast.success("episode created successfully...!");
        setLoading(false);

      } catch (e) {
        console.log(e);
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      toast.error("plz fill all fields");
      setLoading(false);
    }
  };
  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>Create An Episode</h1>
        <InputComponent
          type="text"
          placeholder="Tittle"
          state={tittle}
          setState={setTittle}
          required={true}
        />

        <InputComponent
          type="text"
          placeholder="Description"
          state={desc}
          setState={setDesc}
          required={true}
        />
        <FileInput
          accept={"audio/*"}
          type={'audio'}
          id={"display-audio-input"}
          fileHandlefn={audioHandle}
          text="upload aduio file"
        />
        <Button
          text={loading ? "loading..." : "Create now"}
          disabled={loading}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

export default CreateAnEpisodePage;
