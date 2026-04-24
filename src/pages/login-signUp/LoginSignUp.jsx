import { Gem } from "lucide-react";
import React, { useState } from "react";

export default function LoginAndSignUp() {
  const [isLogin, setIsLogin] = useState(true);
  const [touched, setTouched] = useState({});
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleToggle = (mode) => {
    setTouched({});
    setIsLogin(mode === "login");
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const loginErrors = {
    email: !loginData.email.trim(),
    password: !loginData.password.trim(),
  };

  const signupErrors = {
    fullName: !signupData.fullName.trim(),
    email: !signupData.email.trim(),
    password: !signupData.password.trim(),
    confirmPassword: !signupData.confirmPassword.trim(),
    passwordMatch:
      signupData.confirmPassword &&
      signupData.password !== signupData.confirmPassword,
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setTouched({
      email: true,
      password: true,
    });

    if (!loginErrors.email && !loginErrors.password) {
      console.log("Login submitted:", loginData);
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (
      !signupErrors.fullName &&
      !signupErrors.email &&
      !signupErrors.password &&
      !signupErrors.confirmPassword &&
      !signupErrors.passwordMatch
    ) {
      console.log("Signup submitted:", signupData);
    }
  };
  const handleContinueWithGoogle = () => {
    const query = {
      client_id: import.meta.env.VITE_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_PUBLIC_GOOGLE_OAUTH_REDIRECT_URI,
      response_type: "code",
      scope: import.meta.env.VITE_PUBLIC_GOOGLE_OAUTH_SCOPES,
      access_type: "offline",
      prompt: "consent",
    };



    const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    url.search = new URLSearchParams(query).toString();

    window.location.href = url.toString();
  };
  const inputBaseClass =
    "w-full rounded-xl border bg-[#f7f7f8] px-4 py-3 text-[15px] text-[#1f1f1f] outline-none transition-all duration-200 placeholder:text-[#9ca3af]";
  const inputErrorClass = "border-red-400 focus:ring-2 focus:ring-red-200";
  const inputNormalClass =
    "border-[#e5e7eb] focus:border-[#6b7280] focus:ring-2 focus:ring-[#d1d5db]";

  return (
    <div className="w-full max-w-[540px] m-auto mt-20 items-center">
      <div className="rounded-[24px] border border-[#e5e7eb] bg-[#f8f8f8] shadow-[0_2px_8px_rgba(0,0,0,0.04)] px-6 sm:px-12 py-8 sm:py-10">
        <div className="flex justify-center">
          <div className="h-[58px] w-[58px] rounded-xl bg-[#2d2d2f] flex items-center justify-center shadow-sm">
            <span className="text-white text-[34px] font-bold leading-none">
              <Gem />
            </span>
          </div>
        </div>
        <div className="mt-8 text-center">
          <h1 className="text-[28px] sm:text-[32px] font-semibold text-[#565b71] tracking-[-0.02em]">
            Welcome to AI Expense
          </h1>
          <p className="mt-3 text-[15px] text-[#9a9aa0]">
            {isLogin
              ? "Unlock all features by logging in"
              : "Create your account to get started"}
          </p>
        </div>
        <div className="mt-7 flex rounded-xl bg-[#ececec] p-1">
          <button
            type="button"
            onClick={() => handleToggle("login")}
            className={`w-1/2 rounded-[10px] py-2.5 text-sm font-medium transition-all duration-300 ${
              isLogin ? "bg-white text-[#1f1f1f] shadow-sm" : "text-[#777]"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => handleToggle("signup")}
            className={`w-1/2 rounded-[10px] py-2.5 text-sm font-medium transition-all duration-300 ${
              !isLogin ? "bg-white text-[#1f1f1f] shadow-sm" : "text-[#777]"
            }`}
          >
            Sign Up
          </button>
        </div>
        <div className="mt-7">
          <button
            onClick={handleContinueWithGoogle}
            className="w-full rounded-xl bg-gradient-to-r from-[#2d313e] to-[#6b6f82] py-3.5 text-white text-[15px] font-medium shadow-sm transition hover:opacity-95"
          >
            Continue with Google
          </button>
        </div>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#dfdfdf]" />
          <span className="text-[16px] text-[#252525]">or</span>
          <div className="h-px flex-1 bg-[#dfdfdf]" />
        </div>
        <div className="transition-all duration-300 ease-in-out">
          {isLogin ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="email"
                  placeholder="Email or username"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  onBlur={() => handleBlur("email")}
                  className={`${inputBaseClass} ${
                    touched.email && loginErrors.email
                      ? inputErrorClass
                      : inputNormalClass
                  }`}
                />
                {touched.email && loginErrors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    Email or username is required
                  </p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  onBlur={() => handleBlur("password")}
                  className={`${inputBaseClass} ${
                    touched.password && loginErrors.password
                      ? inputErrorClass
                      : inputNormalClass
                  }`}
                />
                {touched.password && loginErrors.password && (
                  <p className="mt-1 text-xs text-red-500">
                    Password is required
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#ececec] py-3.5 text-[15px] font-medium text-[#1f1f1f] border border-[#e2e2e2] transition hover:bg-[#e6e6e6]"
              >
                Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full name"
                  value={signupData.fullName}
                  onChange={handleSignupChange}
                  onBlur={() => handleBlur("fullName")}
                  className={`${inputBaseClass} ${
                    touched.fullName && signupErrors.fullName
                      ? inputErrorClass
                      : inputNormalClass
                  }`}
                />
                {touched.fullName && signupErrors.fullName && (
                  <p className="mt-1 text-xs text-red-500">
                    Full name is required
                  </p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  onBlur={() => handleBlur("email")}
                  className={`${inputBaseClass} ${
                    touched.email && signupErrors.email
                      ? inputErrorClass
                      : inputNormalClass
                  }`}
                />
                {touched.email && signupErrors.email && (
                  <p className="mt-1 text-xs text-red-500">Email is required</p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  onBlur={() => handleBlur("password")}
                  className={`${inputBaseClass} ${
                    touched.password && signupErrors.password
                      ? inputErrorClass
                      : inputNormalClass
                  }`}
                />
                {touched.password && signupErrors.password && (
                  <p className="mt-1 text-xs text-red-500">
                    Password is required
                  </p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={signupData.confirmPassword}
                  onChange={handleSignupChange}
                  onBlur={() => handleBlur("confirmPassword")}
                  className={`${inputBaseClass} ${
                    (touched.confirmPassword && signupErrors.confirmPassword) ||
                    signupErrors.passwordMatch
                      ? inputErrorClass
                      : inputNormalClass
                  }`}
                />
                {touched.confirmPassword && signupErrors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    Confirm password is required
                  </p>
                )}
                {!signupErrors.confirmPassword &&
                  signupErrors.passwordMatch && (
                    <p className="mt-1 text-xs text-red-500">
                      Passwords do not match
                    </p>
                  )}
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#ececec] py-3.5 text-[15px] font-medium text-[#1f1f1f] border border-[#e2e2e2] transition hover:bg-[#e6e6e6]"
              >
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
