import Footer from "@/components/Footer";
import ListBanner from "@/components/ListBanner";
import Navbar from "@/components/Navbar";
import { MdOutlinePictureInPicture } from "react-icons/md";
import CreateBanner from "./CreateBanner";


const Banner = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-10/12 gap-3 p-2 pt-20 mx-auto">
        <MdOutlinePictureInPicture className="w-12 h-12 max-sm:w-6 max-sm:h-6" />
        <h1 className="text-3xl font-bold max-sm:text-lg">List Banner</h1>
      </div>
      <ListBanner />
      <Footer />
    </div>
  );
};

export default Banner;
