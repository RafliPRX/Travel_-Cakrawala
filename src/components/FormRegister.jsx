import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const FormRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [showpassword, setShowpassword] = useState(false);
  const [showpasswordRepeat, setShowpasswordRepeat] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [file, setFile] = useState(null);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    // console.log(event);
    setPassword(event.target.value);
  };

  const handlePasswordRepeatChange = (event) => {
    setPasswordRepeat(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleShowPassword = () => {
    setShowpassword(!showpassword);
  };

  const handleShowPasswordRepeat = () => {
    setShowpasswordRepeat(!showpasswordRepeat);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k`,
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
      },
    };

    try {
      const res = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        formData,
        config
      );
      // console.log(res);
      setFile(res.data.url);
      alert(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    const payload = {
      email: email,
      name: name,
      password: password,
      passwordRepeat: passwordRepeat,
      profilePictureUrl: file,
      phoneNumber: phoneNumber,
      role: role,
    };

    axios
      .post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/register",
        payload,
        { headers: { apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c" } }
      )
      .then((res) => {
        // console.log(res);
        // setToken(res.data.token);
        if (res.data.code === "200") {
          toast({
            title: "Success",
            description: res.data.message,
            variant: "success",
          });
        }
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        console.log(err.response);
        setError(err.response.data.error);
      });

    for (const key in payload) {
      if (!payload[key]) {
        toast({
          title: "Error",
          description: "Please fill all fields",
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        return;
      }
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }

    if (password !== passwordRepeat) {
      toast({
        title: "Error",
        description: "Password and confirm password do not match",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }

    if (!file) {
      toast({
        title: "Error",
        description: "Please upload your profile picture",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="container w-[560px] border rounded-3xl shadow-2xl p-4 max-sm:w-full">
        <h1 className="mb-5 text-3xl font-bold text-black max-sm:text-2xl max-sm:mb-0 max-sm:text-center max-sm:p-2">
          Create Your Account
        </h1>
        <section className="flex gap-5 max-sm:flex-col max-sm:gap-0">
          <div className="mb-2">
            <label htmlFor="email" className="text-gray-500 max-sm:hidden">
              Email
            </label>
            <div className="flex items-center justify-center mb-5">
              <MdEmail className="text-gray-500" />
              <input
                className="p-3 text-black transition-colors duration-300 ease-out delay-300 bg-transparent border-b focus:outline-none focus:border-blue-500 max-sm:w-60 w-60"
                onChange={handleEmailChange}
                placeholder="Email"
              />
            </div>
          </div>

          <div className="mb-2">
            <label htmlFor="email" className="text-gray-500 max-sm:hidden">
              Username
            </label>
            <div className="flex items-center justify-center mb-5">
              <FaUser className="text-gray-500" />
              <input
                className="p-3 text-black transition-colors duration-300 ease-out delay-300 bg-transparent border-b w-60 focus:outline-none focus:border-blue-500 max-sm:w-60"
                onChange={handleNameChange}
                placeholder="Your Name"
              />
            </div>
          </div>
        </section>

        <section className="flex gap-5 max-sm:flex-col max-sm:gap-0">
          <div className="mb-2">
            <label htmlFor="password" className="text-gray-500 max-sm:hidden">
              Password
            </label>
            <div className="flex items-center justify-center mb-5">
              <FaLock className="text-gray-500" />
              <input
                className="p-3 text-black transition-colors duration-300 ease-out delay-300 bg-transparent border-b w-60 focus:outline-none focus:border-blue-500 max-sm:w-60"
                onChange={handlePasswordChange}
                placeholder="Password"
                type={showpassword ? "text" : "password"}
              />
              <p
                className="absolute text-gray-500 cursor-pointer right-96 max-sm:hidden"
                onClick={handleShowPassword}
              >
                {showpassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </p>
            </div>
            <div className="flex items-center gap-1 mt-2 mb-5 sm:hidden">
              <input
                type="checkbox"
                className="w-5"
                onClick={handleShowPassword}
              />
              <label className="text-xs text-gray-500">Show Password</label>
            </div>
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="text-gray-500 max-sm:hidden">
              Confirm Password
            </label>

            <div className="flex items-center justify-center mb-5">
              <FaLock className="text-gray-500" />
              <input
                className="p-3 text-black transition-colors duration-300 ease-out delay-300 bg-transparent border-b w-60 focus:outline-none focus:border-blue-500 max-sm:w-60"
                onChange={handlePasswordRepeatChange}
                placeholder="Confirm Password"
                type={showpasswordRepeat ? "text" : "password"}
              />
              <p
                className="absolute text-gray-500 cursor-pointer right-[102px] max-sm:hidden"
                onClick={handleShowPasswordRepeat}
              >
                {showpasswordRepeat ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </p>
            </div>
            <div className="flex items-center gap-1 mt-2 mb-5 sm:hidden">
              <input
                type="checkbox"
                className="w-5"
                onClick={handleShowPasswordRepeat}
              />
              <label className="text-xs text-gray-500">Show Password</label>
            </div>
          </div>
        </section>

        <section className="flex gap-5 max-sm:flex-col max-sm:gap-0">
          <div className="mb-2">
            <label htmlFor="password" className="text-gray-500 max-sm:hidden">
              Select Role
            </label>
            <div className="flex items-center justify-center mb-5">
              <FaUserCog className="text-gray-500" />
              <select
                className="p-3 text-black transition-colors duration-300 ease-out delay-300 bg-transparent border-b w-60 focus:outline-none focus:border-blue-500"
                name="role"
                onChange={handleRoleChange}
              >
                <option value="-">-</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="text-gray-500 max-sm:hidden">
              Phone Number
            </label>
            <div className="flex items-center justify-center mb-5">
              <FaPhoneAlt className="text-gray-500" />
              <input
                className="p-3 text-black transition-colors duration-300 ease-out delay-300 bg-transparent border-b w-60 focus:outline-none focus:border-blue-500 max-sm:w-60"
                onChange={handlePhoneNumberChange}
                placeholder="Password"
              />
            </div>
          </div>
        </section>

        <div className="mb-2">
          <label htmlFor="password" className="text-gray-500 max-sm:hidden">
            Profile Picture
          </label>
        </div>

        <div className="flex gap-3 mb-5 max-sm:flex-col max-sm:gap-5">
          <input
            className="text-black transition-colors duration-300 ease-out delay-300 bg-transparent border-b w-96 focus:outline-none focus:border-blue-500 max-sm:w-60 "
            onChange={handleFileChange}
            placeholder="Your Photo Profile"
            type="file"
          />
          <button
            className="w-32 py-2 text-xl font-bold text-white duration-300 ease-out transform bg-blue-500 rounded-xl hover:rounded-sm hover:bg-blue-800 hover:shadow-2xl hover:-translate-y-1 max-sm:text-lg max-sm:w-full max-sm:self-center"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>

        <button
          className="w-full py-2 text-xl font-bold text-white duration-300 ease-out transform bg-blue-500 rounded-xl hover:rounded-sm hover:bg-blue-800 hover:shadow-2xl hover:-translate-y-1"
          onClick={handleSubmit}
        >
          Create Account
        </button>
        <p className="mt-2 text-center text-gray-500 max-sm:p-2">
          Already have an account?{" "}
          <Link to="/login" className="text-gray-500 hover:text-blue-500">
            Login
          </Link>
        </p>
        <p className="text-center text-gray-500 max-sm:p-2">
          Or go{" "}
          <Link to="/" className="text-gray-500 hover:text-blue-500">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FormRegister;
