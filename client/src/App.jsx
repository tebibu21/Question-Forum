import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AskQuestion from './pages/AskQuestion'
import QuestionDetails from "./pages/QuestionDetails";
import EditQuestion from "./pages/EditQuestion";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { useEffect,useState,createContext } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from './axiosConfig'
import Header from "./components/Header";
import Footer from "./components/Footer";


export const AppState = createContext()

function App() {
  const [user, setUser] = useState(null);

  const token = localStorage.getItem('token')
  const navigate = useNavigate();
  async function checkUser(){
    try{
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setUser({
        username: data.username,
        userid: data.userid,
      });


    }catch(error){
      console.log(error.response);
      navigate('/login');
    }
  }

  useEffect(() => {
    if (token) checkUser();
  }, [token]);


  return (
    <AppState.Provider value={{ user, setUser }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ask" element={<AskQuestion />} />
        <Route path="/question/:id" element={<QuestionDetails />} />
        <Route path="/edit-question/:id" element={<EditQuestion />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </AppState.Provider>
  );
}

export default App
