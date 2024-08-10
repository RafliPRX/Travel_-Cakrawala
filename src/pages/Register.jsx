import React from "react";
import imgRegister from "../assets/img/imgRegister.png";
import FormRegister from "../components/FormRegister";
import logoSm from "../assets/img/logoHome.png";

const Register = () => {
  return (
    <div>
      <div className="content-center p-5 sm:h-screen max-sm:w-3/4 max-sm:mx-auto">
        <div className="flex items-center justify-center gap-10 max-sm:flex-col max-sm:gap-2">
          <img src={imgRegister} alt="imgRegister" className="max-sm:hidden" />
          <img src={logoSm} alt="logoLogin" className="w-1/2 sm:hidden" />
          <FormRegister />
        </div>
      </div>
    </div>
  );
};
export default Register;
