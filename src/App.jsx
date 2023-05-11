
import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter,Navigate } from "react-router-dom";
import Layouts from "./Layouts";

import { useSelector } from "react-redux";
import Login from "./components/AuthScreens/login/Login";
import MainDashSection from "./components/Dashboard/MainDashSection/MainDashSection";

function App() {
  const [count, setCount] = useState(0);
  const { access_token } = useSelector((state) => state.auth);

  return (
      <BrowserRouter>
        
        <Routes>
        <Route path="/" element={<Layouts />}>
          
          </Route>
        <Route
            path="/login"
            element={access_token ? <Navigate to={"/logincam"} /> : <Login />}
          />
          <Route
            path="/dashboard"
            element={ <MainDashSection/>}
          />
        </Routes>
      </BrowserRouter>
      
  );
}

export default App;
