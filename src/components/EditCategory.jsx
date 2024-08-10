import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useSelector } from "react-redux";

const EditCategory = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [valueCategory, setValueCategory] = useState({
    name: "",
    imageUrl: null,
  });
  const { toast } = useToast();
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    const config = {
      headers: {
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
      },
    };
    axios
      .get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/category/${param.id}`,
        config
      )
      .then((res) => {
        // console.log(res.data.data);
        setValueCategory({
          ...valueCategory,
          name: res.data.data.name,
          imageUrl: res.data.data.imageUrl,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
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
      setValueCategory({
        ...valueCategory,
        imageUrl: res.data.url,
      });
      toast({ description: res.data.message, variant: "success" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-category/${param.id}`,
        valueCategory,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${userInfo.token ?? ""}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setValueCategory(res.data.data);
        toast({ description: res.data.message, variant: "success" });
        navigate("/dashboard/category");
      })
      .catch((err) => {
        console.log(err);
        toast({
          description: err.response.data.message,
          variant: "destructive",
        });
      });
  };

  const handleCancel = () => {
    navigate("/dashboard/category");
  };

  return (
    <form onSubmit={handleUpdate}>
      <div className="flex items-center justify-center p-5 mt-5">
        <Card className="w-1/2 p-3 bg-gray-300 border shadow-2xl backdrop-filter backdrop-blur-md bg-opacity-10 max-sm:w-3/4">
          <CardHeader className="text-3xl font-bold">
            <CardContent>
              <img
                src={valueCategory.imageUrl}
                alt="imgUpdate"
                className="object-cover aspect-video"
              />
              <Label htmlFor="name" className="text-left">
                Name
              </Label>
              <Input
                id="name"
                className="col-span-3"
                onChange={(e) =>
                  setValueCategory({ ...valueCategory, name: e.target.value })
                }
                placeholder="Banner Name"
                defaultValue={valueCategory.name}
              />

              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <Input
                id="image"
                type="file"
                className="col-span-3 mb-3"
                onChange={handleUpload}
                placeholder="Banner Image"
                defaultValue={valueCategory.imageUrl}
              />
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  className="text-white bg-primary"
                  type="submit"
                >
                  Update
                </Button>
                <Button
                  variant="outline"
                  className="text-white bg-destructive"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </form>
  );
};

export default EditCategory;
