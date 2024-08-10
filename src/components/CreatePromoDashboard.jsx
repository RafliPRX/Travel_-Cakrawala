import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import SideBar from "@/components/SideBar";
import ResponsiveSideBar from "@/components/ResponsiveSideBar";
import AvatarDashboard from "@/components/AvatarDashboard";
import CreateCategory from "@/pages/Category/CreateCategory";
import ListCategoryDashboard from "@/components/ListCategoryDashboard";
import LogoDashboard from "@/components/LogoDashboard";
import ListPromoDashboard from "@/components/ListPromoDashboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CreatePromoDashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [minimumPrice, setMinimumPrice] = useState("");
  const [promoDiscount, setPromoDiscount] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file.type.startsWith("image")) {
      toast({
        description: "File Format Not Supported",
        variant: "destructive",
      });
      setTimeout(() => {
        alert(null);
        e.target.value = null;
      }, 2000);
      return false;
    }
    const formData = new FormData();
    formData.append("image", file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token ?? ""}`,
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
      },
    };

    try {
      const res = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        formData,
        config
      );
      //   console.log(res);
      setImageUrl(res.data.url);
      setImagePreview(URL.createObjectURL(file));
      toast({ description: res.data.message, variant: "success" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTermsAndConditionsChange = (event) => {
    setTermsAndConditions(event.target.value);
  };

  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
  };

  const handleMinimumPriceChange = (event) => {
    setMinimumPrice(event.target.value);
  };

  const handlePromoDiscountChange = (event) => {
    setPromoDiscount(event.target.value);
  };

  const handleSubmit = () => {
    const payload = {
      title: title,
      description: description,
      terms_condition: termsAndConditions,
      promo_code: promoCode.toUpperCase(),
      minimum_claim_price: parseInt(minimumPrice),
      promo_discount_price: parseInt(promoDiscount),
      imageUrl: imageUrl,
    };

    const config = {
      headers: {
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        Authorization: `Bearer ${userInfo.token ?? ""}`,
      },
    };

    axios
      .post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-promo",
        payload,
        config
      )
      .then((res) => {
        // console.log(res);
        toast({ description: res.data.message, variant: "success" });
        navigate("/dashboard/promo");
      })
      .catch((err) => {
        console.log(err);
        toast({
          description: err.response.data.message,
          variant: "destructive",
        });
      });
  };

  return (
    <div className="w-10/12 p-5 max-sm:w-full">
      <div>
        <Card>
          <CardContent className="p-5">
            <div className="flex gap-10">
              <section className="w-1/2 max-sm:w-full">
                <div>
                  <Label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Title
                  </Label>
                  <div className="mt-2">
                    <Input
                      type="text"
                      id="title"
                      placeholder="Title"
                      onChange={handleTitleChange}
                    />
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="description"
                    className="block mt-2 text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </Label>
                  <div className="mt-2">
                    <Textarea
                      type="text"
                      id="description"
                      onChange={handleDescriptionChange}
                      placeholder="Description promo"
                    />
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="termsAndConditions"
                    className="block mt-2 text-sm font-medium leading-6 text-gray-900"
                  >
                    Terms and Conditions
                  </Label>
                  <div className="mt-2">
                    <Input
                      type="text"
                      id="termsAndConditions"
                      placeholder="Terms and Conditions"
                      onChange={handleTermsAndConditionsChange}
                    />
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="promoCode"
                    className="block mt-2 text-sm font-medium leading-6 text-gray-900"
                  >
                    Promo Code
                  </Label>
                  <div className="mt-2">
                    <Input
                      type="text"
                      id="promoCode"
                      placeholder="Promo Code"
                      onChange={handlePromoCodeChange}
                    />
                  </div>
                </div>
                <div className="mt-2 sm:hidden">
                  <Label
                    htmlFor="minimumPrice"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Minimum Price
                  </Label>
                  <div className="mt-2">
                    <Input
                      type="number"
                      id="minimumPrice"
                      placeholder="ex. 100000"
                      onChange={handleMinimumPriceChange}
                    />
                  </div>
                </div>
                <div className="sm:hidden">
                  <Label
                    htmlFor="promoDiscount"
                    className="block mt-2 text-sm font-medium leading-6 text-gray-900"
                  >
                    Promo Discount
                  </Label>
                  <div className="mt-2">
                    <Input
                      type="number"
                      id="promoDiscount"
                      placeholder="ex. 1000"
                      onChange={handlePromoDiscountChange}
                    />
                  </div>
                </div>
                <div className="sm:hidden">
                  <Label
                    htmlFor="image"
                    className="block mt-2 text-sm font-medium leading-6 text-gray-900"
                  >
                    Image
                  </Label>
                  <div className="mt-2">
                    <Input type="file" id="image" onChange={handleUpload} />
                  </div>
                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Image Preview"
                        className="col-span-3 mx-auto rounded-xl"
                        style={{ maxWidth: "50%", maxHeight: "200px" }}
                      />
                    </div>
                  )}
                </div>
              </section>
              <section className="w-1/2 max-sm:hidden">
                <div>
                  <Label
                    htmlFor="minimumPrice"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Minimum Price
                  </Label>
                  <div className="mt-2">
                    <Input
                      type="number"
                      id="minimumPrice"
                      placeholder="ex. 100000"
                      onChange={handleMinimumPriceChange}
                    />
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="promoDiscount"
                    className="block mt-2 text-sm font-medium leading-6 text-gray-900"
                  >
                    Promo Discount
                  </Label>
                  <div className="mt-2">
                    <Input
                      type="number"
                      id="promoDiscount"
                      placeholder="ex. 1000"
                      onChange={handlePromoDiscountChange}
                    />
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="image"
                    className="block mt-2 text-sm font-medium leading-6 text-gray-900"
                  >
                    Image
                  </Label>
                  <div className="mt-2">
                    <Input type="file" id="image" onChange={handleUpload} />
                  </div>
                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Image Preview"
                        className="col-span-3 mx-auto rounded-xl"
                        style={{ maxWidth: "50%", maxHeight: "200px" }}
                      />
                    </div>
                  )}
                </div>
              </section>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-5">
            <Button className="w-full" onClick={handleSubmit}>
              Create
            </Button>
            <Button
              className="w-full"
              variant="destructive"
              onClick={() => navigate("/dashboard/promo")}
            >
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CreatePromoDashboard;
