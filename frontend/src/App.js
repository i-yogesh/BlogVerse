
import { useContext } from "react";
import Navbar from "./components/Navbar/navbar";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Settings from "./pages/settings/settings";
import Singlepostpage from "./pages/singlepostpage/singlepostpage";
import Writepage from "./pages/writepage/writepage";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Context } from "./Context/Context";

function App() {
  const {user}=useContext(Context);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={user?<Home/>:<Register />} />
        <Route path="/login" element={user?<Home/>:<Login />} />
        <Route path="/settings" element={user?<Settings />:<Register/>} />
        <Route path="/write" element={user?<Writepage />:<Login/>} />
        <Route path="/post/:postid" element={<Singlepostpage />} />
      </Routes>
    </Router>
  );
}

export default App;
