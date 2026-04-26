import React from "react";
import { Routes, Route } from "react-router";
import Home from "../pages/home/Home";
import AuthLayout from "../pages/auth/AuthLayout";
import LoginAndSignUp from "../pages/login-signUp/LoginSignUp";
import AuthSuccessPage from "../pages/login-signUp/AuthSuccess";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
export default function RoutesPages() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/chat/:chatId" element={<Home />} />
        {/* <Route path="about" element={<About />} /> */}

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginAndSignUp />} />
          <Route path="/auth/success" element={<AuthSuccessPage />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}
