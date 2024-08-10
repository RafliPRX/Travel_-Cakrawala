import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Users,
  BadgePercent,
  Car
} from "lucide-react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="flex-1">
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      <Link
          to={"/"}
          className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary "
        >
          <Home className="w-4 h-4" />
          Home
        </Link>
        <Link
          to={"/dashboard/user"}
          className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary "
        >
          <Users className="w-4 h-4" />
          User
        </Link>
        <Link
          to={"/dashboard/banner"}
          className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
        >
          <Package2 className="w-4 h-4" />
          Banner
        </Link>
        <Link
          to={"/dashboard/category"}
          className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
        >
          <Package className="w-4 h-4" />
          Category
        </Link>
        <Link
          to={"/dashboard/promo"}
          className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
        >
          <BadgePercent className="w-4 h-4" />
          Promo
        </Link>
        <Link
          to={"/dashboard/activity"}
          className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
        >
          <Car className="w-4 h-4" />
          Activity
        </Link>
      </nav>
    </div>
  );
};

export default SideBar;
