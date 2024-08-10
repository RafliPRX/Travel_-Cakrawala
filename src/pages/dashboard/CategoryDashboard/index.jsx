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
import { Input } from "@/components/ui/input";
import SideBar from "@/components/SideBar";
import ResponsiveSideBar from "@/components/ResponsiveSideBar";
import AvatarDashboard from "@/components/AvatarDashboard";
import CreateCategory from "@/pages/Category/CreateCategory";
import ListCategoryDashboard from "@/components/ListCategoryDashboard";
import LogoDashboard from "@/components/LogoDashboard";

const CategryDashboard = () => {
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
          <div className="flex-1 w-full"></div>
          <AvatarDashboard />
        </header>
        <main className="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex justify-between">
            <h1 className="text-lg font-semibold md:text-2xl">List Category</h1>
            <CreateCategory />
          </div>
          <div
            className="flex items-center justify-center flex-1 border border-dashed rounded-lg shadow-sm"
            x-chunk="dashboard-02-chunk-1"
          >
            <ListCategoryDashboard />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CategryDashboard;
