import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
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
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
const ResponsiveSideBar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="w-5 h-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="#"
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
            to={"/dashboard/user"}
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <Users className="w-5 h-5" />
            Users
          </Link>
          <Link
            to={"/dashboard/banner"}
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <Package2 className="w-5 h-5" />
            Banner
          </Link>
          <Link
            to={"/dashboard/category"}
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <Package className="w-5 h-5" />
            Category
          </Link>
          <Link
            to={"/dashboard/promo"}
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <BadgePercent className="w-5 h-5" />
            Promo
          </Link>
          <Link
            to={"/dashboard/activity"}
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <Car className="w-4 h-4" />
            Activity
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default ResponsiveSideBar;
