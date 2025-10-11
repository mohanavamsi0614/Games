import { useAuth } from "./Auth_cont";
import { Routes,Route } from "react-router-dom";
import Profile from "./Profile";
import Home from "./Home";
import Admin from "./admin";
function App() {
  const auth = useAuth();
  
  const { user } = auth;

  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<Admin/>}/>
    </Routes>
  )
}

export default App
