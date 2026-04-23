import React from "react";
import { Routes, Route } from "react-router";
import Home from "../pages/home/Home";
import AuthLayout from "../pages/auth/AuthLayout";
import LoginAndSignUp from "../pages/login-signUp/LoginSignUp";
export default function RoutesPages() {
  return (
    <Routes>
      <Route index element={<Home />} />
      {/* <Route path="about" element={<About />} /> */}

      <Route element={<AuthLayout/>}>
      <Route path = "/login" element = {<LoginAndSignUp/>} />
      </Route>
    </Routes>
  );
}
