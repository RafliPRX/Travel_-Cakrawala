import logo from "../assets/img/logo.png";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-10 bg-gray-200 p-7">
      <div className="flex items-center justify-start gap-2 max-sm:flex-col">
        <img className="w-20" src={logo} alt="logo" />
        <h1 className="text-2xl font-bold max-sm:text-lg">Jelajah Cakrawala</h1>

        <div className="flex items-center justify-center gap-20 ml-5 max-sm:flex-col max-sm:gap-5">
          <p className="text-sm w-[450px] max-sm:text-xs max-sm:w-3/4">
            Founded by passionate travelers, Jelajah Cakrawala is built on the
            idea that everyone deserves their dream adventure. Our team consists
            of travel enthusiasts, tech innovators, and customer service experts
            dedicated to providing a seamless and enriching travel experience.
          </p>
          <div>
            <h1 className="mb-2 text-3xl font-bold max-sm:text-lg max-sm:text-center max-sm:mb-1">
              Contact
            </h1>
            <ul className="max-sm:text-xs">
              <li>+62 812 3456 7890</li>
              <li>qEwJi@example.com</li>
              <li>Palembang, Indonesia</li>
            </ul>
          </div>

          <div>
            <h1 className="mb-2 text-3xl font-bold max-sm:text-center max-sm:mb-1 max-sm:text-lg">
              Social Media
            </h1>
            <ul className="max-sm:text-xs">
              <li className="flex items-center gap-1">
                <FaFacebook />
                Facebook
              </li>
              <li className="flex items-center gap-1">
                <FaSquareXTwitter />
                Twitter
              </li>
              <li className="flex items-center gap-1">
                <FaInstagramSquare />
                Instagram
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p className="mt-5 text-sm text-center max-sm:text-[10px]">
        © 2023 Jelajah Cakrawala. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
