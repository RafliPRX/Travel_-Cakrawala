import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Phone, UserCog } from "lucide-react";

const DetailProfile = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const isLogin = useSelector((state) => state.user.isLoggedIn);

  return (
    <section className="pt-20">
      <div className="flex flex-col items-center justify-center w-1/2 gap-5 mx-auto rounded-2xl">
        <h1 className="text-3xl font-bold max-sm:text-lg">My Profile</h1>
        {isLogin ? (
          <div>
            <div className="leading-8">
              <Card className="bg-[#EEEDE7] shadow-2xl">
                <CardHeader>
                  <CardTitle className="mb-2 text-2xl font-bold text-center border bg-[#B9B7BD] rounded-lg py-2 max-sm:text-lg">
                    {userInfo.user.name}
                  </CardTitle>
                  <CardDescription>
                    <img
                      src={userInfo.user.profilePictureUrl}
                      alt="profilePicture"
                      className="object-cover mx-auto mb-2 w-[250px] h-[200px] rounded-2xl max-sm:rounded-full max-sm:w-[100px] max-sm:h-[100px]"
                    />
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-center gap-2 border bg-[#B9B7BD] p-4">
                  <div className="flex items-center gap-2 font-semibold max-sm:text-sm">
                    <Mail className="w-6 h-6 max-sm:w-3 max-sm:h-3" />
                    <p>{userInfo.user.email}</p>
                  </div>
                  <div className="flex items-center gap-2 font-semibold max-sm:text-sm">
                    <Phone className="w-6 h-6 max-sm:w-3 max-sm:h-3" />
                    <p>{userInfo.user.phoneNumber}</p>
                  </div>
                  <div className="flex items-center gap-2 font-semibold max-sm:text-sm">
                    <UserCog className="w-6 h-6 max-sm:w-3 max-sm:h-3" />
                    <p>{userInfo.user.role}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center p-4">
                  <EditProfile />
                </CardFooter>
              </Card>
            </div>
          </div>
        ) : (
          <h1>Loading !!!</h1>
        )}
      </div>
    </section>
  );
};

export default DetailProfile;
