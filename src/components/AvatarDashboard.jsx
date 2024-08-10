import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ButtonLogout from "./ButtonLogout";
import { Link } from "react-router-dom";

const AvatarDashboard = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const isLogin = useSelector((state) => state.user.isLoggedIn);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage className="object-cover" src={isLogin ? userInfo.user.profilePictureUrl : ""} />
            <AvatarFallback className="text-xl text-primary">CN</AvatarFallback>
          </Avatar>
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {isLogin ? userInfo.user.name : "Guest"}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ButtonLogout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDashboard;
