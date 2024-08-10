import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useSelector } from "react-redux";

const CreateBanner = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { toast } = useToast();
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
      setImage(res.data.url);
      setImagePreview(URL.createObjectURL(file));
      toast({ description: res.data.message, variant: "success" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = () => {
    const payload = {
      name: name,
      imageUrl: image,
    };

    axios
      .post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-banner",
        payload,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${userInfo.token ?? ""}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        toast({ description: res.data.message, variant: "success" });
        window.location.href = "/dashboard/banner";
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
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="text-white bg-primary">Create New Banner</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Banner</DialogTitle>
            <DialogDescription>
              Make new banner here. Click create when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                className="col-span-3"
                onChange={handleNameChange}
                placeholder="Banner Name"
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="image" className="text-right">
                Image/Photo
              </Label>
              <Input
                id="image"
                className="col-span-3"
                type="file"
                onChange={handleUpload}
              />
            </div>
            {imagePreview && (
              <div className="">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="col-span-3 mx-auto rounded-xl"
                  style={{ maxWidth: "50%", maxHeight: "200px" }}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBanner;
