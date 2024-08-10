import React from "react";
import imgLogin from "../assets/img/imgLogin.png";
import FormLogin from "../components/FormLogin";
import logoSm from "../assets/img/logoHome.png";


const Login = () => {
  return (
    <div className="content-center p-4 sm:h-screen max-sm:w-3/4 max-sm:mx-auto">
      <div className="flex items-center justify-center gap-10 max-sm:flex-col max-sm:gap-2">
        <img src={imgLogin} alt="imgLogin" className="max-sm:hidden" />
        <img src={logoSm} alt="logoLogin" className="w-1/2 sm:hidden" />
        <FormLogin />
      </div>
    </div>
  );
};

export default Login;
