import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUpPage from "./pages/SignUpPage";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { setUser } from "./slices/userSlice";
import { useDispatch } from "react-redux";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import PrivateRoutes from "./components/Common/PrivateRoutes";
import StartAPodcastPage from "./pages/CreateAPodcastPage";
import Podcast from "./pages/Podcasts";
import PodcastDetailsPage from "./pages/PodcastDetails";
import CreateAnEpisodePage from "./pages/CreateAnEpisode";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: user.uid,
                  // profilePic:userData.profilePic,
                })
              );
            }
          },
          (error) => {
            console.log("error", error);
          }
        );
        return () => {
          unsubscribeSnapshot();
        };
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, [dispatch]);
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<SignUpPage />} />

          {/* protected routes */}
          <Route element={<PrivateRoutes/>}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-a-podcast" element={<StartAPodcastPage/>} />
          <Route path="/podcast" element={<Podcast/>} />
          <Route path="/podcast/:id" element={<PodcastDetailsPage/>} />
          <Route path="/podcast/:id/create-episode" element={<CreateAnEpisodePage/>} />
          </Route>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
