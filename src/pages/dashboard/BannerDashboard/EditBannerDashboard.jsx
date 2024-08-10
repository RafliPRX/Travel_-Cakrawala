import { Link } from "react-router-dom";
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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SideBar from "@/components/SideBar";
import ResponsiveSideBar from "@/components/ResponsiveSideBar";
import AvatarDashboard from "@/components/AvatarDashboard";
import ListBanner from "@/components/ListBanner";
import ListBannerDashboard from "@/components/ListBannerDashboard";
import CreateBanner from "../../Banner/CreateBanner";
import EditBanner from "@/components/EditBanner";
import LogoDashboard from "@/components/LogoDashboard";
const EditBannerDashboard = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex flex-col h-full max-h-screen gap-2">
          <LogoDashboard />
          <SideBar />
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <ResponsiveSideBar />
          <div className="flex-1 w-full">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full pl-8 shadow-none appearance-none bg-background md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <AvatarDashboard />
        </header>
        <main className="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex justify-between">
            <h1 className="text-lg font-semibold md:text-2xl">Edit Banner</h1>
          </div>
          <div
            className="flex items-center justify-center flex-1 border border-dashed rounded-lg shadow-sm"
            x-chunk="dashboard-02-chunk-1"
          >
            <EditBanner />
          </div>
        </main>
      </div>
    </div>
  );
};
export default EditBannerDashboard;
