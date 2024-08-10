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
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EditPromo = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [valuePromo, setValuePromo] = useState({
    title: "",
    description: "",
    terms_condition: "",
    promo_code: "",
    minimum_claim_price: "",
    promo_discount_price: "",
    imageUrl: null,
  });
  const { toast } = useToast();
  const userInfo = useSelector((state) => state.user.userInfo);

  const getEditPromo = () => {
    const config = {
      headers: {
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
      },
    };
    axios
      .get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/${param.id}`,
        config
      )
      .then((res) => {
        // console.log(res.data.data);
        setValuePromo({
          ...valuePromo,
          title: res.data.data.title,
          description: res.data.data.description,
          terms_condition: res.data.data.terms_condition,
          promo_code: res.data.data.promo_code,
          minimum_claim_price: res.data.data.minimum_claim_price,
          promo_discount_price: res.data.data.promo_discount_price,
          imageUrl: res.data.data.imageUrl,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getEditPromo();
  }, []);

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
      setValuePromo({
        ...valuePromo,
        imageUrl: res.data.url,
      });
      toast({ description: res.data.message, variant: "success" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = () => {
    const config = {
      headers: {
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        Authorization: `Bearer ${userInfo.token ?? ""}`,
      },
    };
    axios
      .post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${param.id}`,
        valuePromo,
        config
      )
      .then((res) => {
        // console.log(res.data);
        toast({ description: res.data.message, variant: "success" });
        navigate("/dashboard/promo");
      })
      .catch((err) => {
        console.log(err.response);
        toast({
          description: err.response.data.message,
          variant: "destructive",
        });
      });
  };

  return (
    <div className="w-10/12 p-5">
      <div>
        <Card>
          <CardContent className="p-5">
            <div className="flex gap-10 max-sm:flex-col max-sm:gap-3">
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
                      defaultValue={valuePromo.title}
                      onChange={(e) =>
                        setValuePromo({ ...valuePromo, title: e.target.value })
                      }
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
                      placeholder="Description promo"
                      defaultValue={valuePromo.description}
                      onChange={(e) =>
                        setValuePromo({
                          ...valuePromo,
                          description: e.target.value,
                        })
                      }
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
                      defaultValue={valuePromo.terms_condition}
                      onChange={(e) =>
                        setValuePromo({
                          ...valuePromo,
                          terms_condition: e.target.value,
                        })
                      }
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
                      defaultValue={valuePromo.promo_code}
                      onChange={(e) =>
                        setValuePromo({
                          ...valuePromo,
                          promo_code: e.target.value.toUpperCase(),
                        })
                      }
                    />
                  </div>
                </div>
              </section>
              <section className="w-1/2 max-sm:w-full">
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
                      defaultValue={valuePromo.minimum_claim_price}
                      onChange={(e) =>
                        setValuePromo({
                          ...valuePromo,
                          minimum_claim_price: parseInt(e.target.value),
                        })
                      }
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
                      defaultValue={valuePromo.promo_discount_price}
                      onChange={(e) =>
                        setValuePromo({
                          ...valuePromo,
                          promo_discount_price: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="image"
                    className="block mt-2 text-sm font-medium leading-6 text-gray-900"
                  >
                    Image
                  </Label>
                  <div className="mt-2">
                    <Input
                      type="file"
                      id="image"
                      onChange={handleUpload}
                      defaultValue={valuePromo.imageUrl}
                    />
                  </div>
                  <img
                    src={valuePromo.imageUrl}
                    alt="imgUpdate"
                    className="object-cover rounded-lg aspect-video"
                  />
                </div>
              </section>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-5">
            <Button className="w-full" onClick={handleUpdate}>
              Update
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
export default EditPromo;
