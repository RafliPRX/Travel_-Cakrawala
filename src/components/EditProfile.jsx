import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { DialogClose } from "@radix-ui/react-dialog";
import { useDispatch } from "react-redux";
import { login } from "../redux/slice/userSlice";

const EditProfile = () => {
  const [valueProfile, setValueProfile] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    profilePictureUrl: null,
  });
  const { toast } = useToast();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  const getProfile = () => {
    axios
      .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user", {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${userInfo.token ?? ""}`,
        },
      })
      .then((res) => {
        setValueProfile({
          name: res.data.data.name,
          email: res.data.data.email,
          phoneNumber: res.data.data.phoneNumber,
          profilePictureUrl: res.data.data.profilePictureUrl,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProfile();
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
      setValueProfile({
        ...valueProfile,
        profilePictureUrl: res.data.url,
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
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile",
        valueProfile,
        config
      )
      .then((res) => {
        // console.log(res.data);
        toast({ description: res.data.message, variant: "success" });
        console.log('here', userInfo.user, valueProfile);
        dispatch(
          login({
            user: {
              ...userInfo.user,
              ...valueProfile
            },
            token: userInfo.token,
          })
        );
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full bg-[#B9B7BD] max-sm:w-fit max-sm:text-sm">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-center gap-5">
            <img
              src={valueProfile.profilePictureUrl}
              alt=""
              className="object-cover w-40 h-28"
            />
            <Input type="file" onChange={handleUpload} />
          </div>

          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue={valueProfile.name}
              className="col-span-3"
              onChange={(e) =>
                setValueProfile({ ...valueProfile, name: e.target.value })
              }
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              defaultValue={valueProfile.email}
              className="col-span-3"
              onChange={(e) =>
                setValueProfile({ ...valueProfile, email: e.target.value })
              }
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone Number
            </Label>
            <Input
              id="phone"
              defaultValue={valueProfile.phoneNumber}
              className="col-span-3"
              onChange={(e) =>
                setValueProfile({
                  ...valueProfile,
                  phoneNumber: e.target.value,
                })
              }
            />
          </div>
        </div>
        <DialogClose>
          <Button onClick={handleUpdate}>Save changes</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
