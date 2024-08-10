import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PromoAtributes from "@/components/PromoAtributes";
const DetailPromo = () => {
  return (
    <div>
      <Navbar />
      <h1 className="pt-20 text-3xl font-bold text-center">
        Discount Information
      </h1>
      <PromoAtributes />
      <Footer />
    </div>
  );
};

export default DetailPromo;
