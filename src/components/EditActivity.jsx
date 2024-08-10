import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
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

const EditActivity = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [allCategory, setAllCategory] = useState([]);
  const [valueActivity, setValueActivity] = useState({
    title: "",
    description: "",
    price: "",
    price_discount: "",
    total_reviews: "",
    facilities: "",
    address: "",
    province: "",
    city: "",
    location_maps: "",
    categoryId: "",
    imageUrls: [],
    rating: "",
  });
  const { toast } = useToast();
  const userInfo = useSelector((state) => state.user.userInfo);

  const getEditActivity = () => {
    const config = {
      headers: {
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
      },
    };

    axios
      .get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/${param.id}`,
        config
      )
      .then((res) => {
        // console.log(res.data.data);
        setValueActivity({
          ...valueActivity,
          title: res.data.data.title,
          description: res.data.data.description,
          price: res.data.data.price,
          price_discount: res.data.data.price_discount,
          total_reviews: res.data.data.total_reviews,
          facilities: res.data.data.facilities,
          address: res.data.data.address,
          province: res.data.data.province,
          city: res.data.data.city,
          location_maps: res.data.data.location_maps,
          categoryId: res.data.data.categoryId,
          imageUrls: res.data.data.imageUrls,
          rating: res.data.data.rating,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const getCategory = () => {
    axios
      .get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      )
      .then((res) => {
        setAllCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getEditActivity();
    getCategory();
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
      // setImageUrls(res.data.url);
      setImageUrls((prevUrls) => [...prevUrls, res.data.url]);
      toast({ description: res.data.message, variant: "success" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        Authorization: `Bearer ${userInfo.token ?? ""}`,
      },
    };

    axios
      .post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-activity/${param.id}`,
        valueActivity,
        config
      )
      .then((res) => {
        // console.log(res.data);
        toast({ description: res.data.message, variant: "success" });
        navigate("/dashboard/activity");
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
    <div className="w-full p-5">
      <div>
        <Card className="shadow-2xl bg-slate-200">
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
                      defaultValue={valueActivity.title}
                      onChange={(e) => {
                        setValueActivity({
                          ...valueActivity,
                          title: e.target.value,
                        });
                      }}
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
                      onChange={(e) => {
                        setValueActivity({
                          ...valueActivity,
                          description: e.target.value,
                        });
                      }}
                      defaultValue={valueActivity.description}
                      placeholder="Description promo"
                    />
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="categoryid"
                    className="block mt-2 text-sm font-medium leading-6 text-gray-900"
                  >
                    Category
                  </Label>
                  <div className="mt-2">
                    <select
                      id="rating"
                      value={valueActivity.categoryId}
                      className="w-[180px] p-2 border rounded-lg"
                      onChange={(e) => {
                        setValueActivity({
                          ...valueActivity,
                          categoryId: e.target.value,
                        });
                      }}
                    >
                      {allCategory.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="price"
                    className="block mt-2 text-sm font-medium leading-6 text-gray-900"
                  >
                    Price
                  </Label>
                  <div className="mt-2">
                    <Input
                      type="number"
                      id="price"
                      placeholder="ex. 100000"
                      onChange={(e) => {
                        setValueActivity({
                          ...valueActivity,
                          price: parseInt(e.target.value),
                        });
                      }}
                      defaultValue={valueActivity.price}
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <Label
                    htmlFor="priceDiscount"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price Discount
                  </Label>
                  <div className="mt-2">
                    <Input
                      type="number"
                      id="priceDiscount"
                      placeholder="ex. 100000"
                      onChange={(e) => {
                        setValueActivity({
                          ...valueActivity,
                          price_discount: parseInt(e.target.value),
                        });
                      }}
                      defaultValue={valueActivity.price_discount}
                    />
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="rating"
                    className="block mt-2 text-sm font-medium leading-6 text-gray-900"
                  >
                    Rating
                  </Label>
                  <div className="mt-2">
                    <select
                      id="rating"
                      value={valueActivity.rating}
                      className="w-[180px] p-2 border rounded-lg"
                      onChange={(e) => {
                        setValueActivity({
                          ...valueActivity,
                          rating: e.target.value,
                        });
                      }}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="totalReview"
                    className="block mt-2 text-sm font-medium leading-6 text-gray-900"
                  >
                    Total Review
                  </Label>
                  <div className="mt-2">
                    <Input
                      type="text"
                      id="totalReview"
                      placeholder="Total Review"
                      onChange={(e) => {
                        setValueActivity({
                          ...valueActivity,
                          total_review: e.target.value,
                        });
                      }}
                      defaultValue={valueActivity.total_reviews}
                    />
                  </div>
                </div>

                <div className="sm:hidden">
                  <Label
                    htmlFor="facilities"
                    className="block mt-2 text-sm font-medium leading-6 text-gray-900"
                  >
                    Facilities
                  </Label>
                  <div>
                    <Input
                      type="text"
                      id="facilities"
                      placeholder="Facilities"
                      onChange={(e) => {
                        setValueActivity({
                          ...valueActivity,
                          facilities: e.target.value,
                        });
                      }}
                      defaultValue={valueActivity.facilities}
                    />
                  </div>
                </div>
                <div className="sm:hidden">
                  <Label
                    htmlFor="address"
                    className="block mt-2 text-sm font-medium leading-6 text-gray-900"
                  >
                    Address
                  </Label>
                  <div className="mt-2">
                    <Textarea
                      type="text"
                      id="address"
                      placeholder="Address"
                      onChange={(e) => {
                        setValueActivity({
                          ...valueActivity,
                          address: e.target.value,
                        });
                      }}
                      defaultValue={valueActivity.address}
                    />
                  </div>
                </div>
                <div className="sm:hidden">
                  <Label
                    htmlFor="province"
                    className="block mt-2 text-sm font-medium leading-6 text-gray-900"
                  >
                    Province
                  </Label>
                  <div className="mt-2">
                    <Input
                      type="text"
                      id="province"
                      placeholder="Province"
                      onChange={(e) => {
                        setValueActivity({
                          ...valueActivity,
                          province: e.target.value,
                        });
                      }}
                      defaultValue={valueActivity.province}
                    />
                  </div>
                </div>
                <div className="sm:hidden">
                  <Label
                    htmlFor="city"
                    className="block mt-2 text-sm font-medium leading-6 text-gray-900"
                  >
                    City
                  </Label>
                  <div className="mt-2">
                    <Input
                      type="text"
                      id="city"
                      placeholder="City"
                      onChange={(e) => {
                        setValueActivity({
                          ...valueActivity,
                          city: e.target.value,
                        });
                      }}
                      defaultValue={valueActivity.city}
                    />
                  </div>
                </div>
                <div className="sm:hidden">
                  <Label
                    htmlFor="location"
                    className="block mt-2 text-sm font-medium leading-6 text-gray-900"
                  >
                    Location
                  </Label>
                  <div className="mt-2">
                    <Input
                      type="text"
                      id="location"
                      placeholder="Location"
                      onChange={(e) => {
                        setValueActivity({
                          ...valueActivity,
                          location_maps: e.target.value,
                        });
                      }}
                      defaultValue={valueActivity.location_maps}
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
                    <Input
                      type="file"
                      id="image"
                      onChange={handleUpload}
                      defaultValue={valueActivity.imageUrls}
                    />
                  </div>
                </div>
              </section>
              <section className="w-1/2 max-sm:hidden">
                <div>
                  <Label
                    htmlFor="facilities"
                    className="block mt-2 text-sm font-medium leading-6 text-gray-900"
                  >
                    Facilities
                  </Label>
                  <div>
                    <Input
                      type="text"
                      id="facilities"
                      placeholder="Facilities"
                      onChange={(e) => {
                        setValueActivity({
                          ...valueActivity,
                          facilities: e.target.value,
                        });
                      }}
                      defaultValue={valueActivity.facilities}
                    />
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="address"
                    className="block mt-2 text-sm font-medium leading-6 text-gray-900"
                  >
                    Address
                  </Label>
                  <div className="mt-2">
                    <Textarea
                      type="text"
                      id="address"
                      placeholder="Address"
                      onChange={(e) => {
                        setValueActivity({
                          ...valueActivity,
                          address: e.target.value,
                        });
                      }}
                      defaultValue={valueActivity.address}
                    />
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="province"
                    className="block mt-2 text-sm font-medium leading-6 text-gray-900"
                  >
                    Province
                  </Label>
                  <div className="mt-2">
                    <Input
                      type="text"
                      id="province"
                      placeholder="Province"
                      onChange={(e) => {
                        setValueActivity({
                          ...valueActivity,
                          province: e.target.value,
                        });
                      }}
                      defaultValue={valueActivity.province}
                    />
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="city"
                    className="block mt-2 text-sm font-medium leading-6 text-gray-900"
                  >
                    City
                  </Label>
                  <div className="mt-2">
                    <Input
                      type="text"
                      id="city"
                      placeholder="City"
                      onChange={(e) => {
                        setValueActivity({
                          ...valueActivity,
                          city: e.target.value,
                        });
                      }}
                      defaultValue={valueActivity.city}
                    />
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="location"
                    className="block mt-2 text-sm font-medium leading-6 text-gray-900"
                  >
                    Location
                  </Label>
                  <div className="mt-2">
                    <Input
                      type="text"
                      id="location"
                      placeholder="Location"
                      onChange={(e) => {
                        setValueActivity({
                          ...valueActivity,
                          location_maps: e.target.value,
                        });
                      }}
                      defaultValue={valueActivity.location_maps}
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
                    <Input
                      type="file"
                      id="image"
                      onChange={handleUpload}
                      defaultValue={valueActivity.imageUrls}
                    />
                  </div>
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
              onClick={() => navigate("/dashboard/activity")}
            >
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default EditActivity;
