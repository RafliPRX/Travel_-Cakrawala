import { Button } from "@/components/ui/button";
import logoHome from "../assets/img/logoHome.png";
import { Link } from "react-router-dom";
import ButtonLogout from "./ButtonLogout";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  BadgePercent,
  Car,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";

const Navbar = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return (
    <nav className="fixed z-50 flex items-center justify-between w-full h-16 bg-gray-300 border border-gray-200 backdrop-filter backdrop-blur-md bg-opacity-10 max-sm:pl-3 max-sm:w-screen">
      <img className="w-20 pl-3 max-md:hidden" src={logoHome} alt="logoHome" />
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="bg-transparent shrink-0 md:hidden">
            <Menu className="w-5 h-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              to={"/"}
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <span className="sr-only">Jelajah Cakrawala</span>
            </Link>
            <Link
              to={"/"}
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Home className="w-5 h-5" />
              Home
            </Link>
            <Link
              to={"/activity"}
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Car className="w-4 h-4" />
              Activity
            </Link>
            <Link
              to={"/promo"}
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <BadgePercent className="w-5 h-5" />
              Promo
            </Link>
            {isLoggedIn && userInfo.user.role === "admin" && (
              <Link
                to="/dashboard/user"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Users className="w-5 h-5" />
                Dashboard
              </Link>
            )}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex gap-10 max-sm:hidden">
        <Link to="/">
          <p className="font-bold duration-200 hover:scale-125">Home</p>
        </Link>
        <Link to="/activity">
          <p className="font-bold duration-200 hover:scale-125">Activity</p>
        </Link>
        <Link to="/promo">
          <p className="font-bold duration-200 hover:scale-125">Promo</p>
        </Link>
        {isLoggedIn && userInfo.user.role === "admin" && (
          <Link to="/dashboard/user">
            <p className="font-bold duration-200 hover:scale-125">Dashboard</p>
          </Link>
        )}
      </div>

      <div className="flex gap-2">
        {isLoggedIn && (
          <DropdownMenu>
            <Avatar>
              <AvatarImage src={userInfo.user.profilePictureUrl} className="object-cover" />
              <AvatarFallback className="text-xl text-primary">
                CN
              </AvatarFallback>
            </Avatar>
            <DropdownMenuTrigger className="px-3 py-1 mr-5 font-semibold text-black rounded-lg shadow-lg">
              {userInfo.user.name}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ButtonLogout />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {!isLoggedIn && (
        <div className="flex gap-2">
          <Link to="/login">
            <Button className="w-24 hover:bg-blue-700">Login</Button>
          </Link>
          <Link to="/register">
            <Button className="w-24 mr-3 hover:bg-blue-700">Register</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
