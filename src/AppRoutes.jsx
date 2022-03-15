import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Home from "./views/Home";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
