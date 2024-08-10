import path from "path";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Promo from "@/pages/Promo";
import Activity from "@/pages/Activity";
import DetailPromo from "@/pages/Promo/DetailPromo";
import DetailActivity from "@/pages/Activity/DetailActivity";
import Banner from "@/pages/Banner";
import Category from "@/pages/Category";
import Profile from "@/pages/Profile";
import { Dashboard } from "@/pages/dashboard";
import ListUser from "@/pages/dashboard/ListUser";
import BannerDashboard from "@/pages/dashboard/BannerDashboard";
import EditBannerDashboard from "@/pages/dashboard/BannerDashboard/EditBannerDashboard";
import CategryDashboard from "@/pages/dashboard/CategoryDashboard";
import UpdateCategory from "@/pages/dashboard/CategoryDashboard/UpdateCategory";
import PromoDashboard from "@/pages/dashboard/PromoDashboard";
import CreatePromo from "@/pages/dashboard/PromoDashboard/CreatePromo";
import UpdatePromo from "@/pages/dashboard/PromoDashboard/UpdatePromo";
import ActivityDashboard from "@/pages/dashboard/ActivityDashboard";
import CreateActivity from "@/pages/dashboard/ActivityDashboard/CreateActivity";
import UpdateActivity from "@/pages/dashboard/ActivityDashboard/UpdateActivity";
import ProtectedRoute from "./ProtectedRoute";

const routeList = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/promo",
    element: <Promo />,
  },
  {
    path: "/banner",
    element: <Banner />,
  },
  {
    path: "/category",
    element: <Category />,
  },
  {
    path: "/activity",
    element: <Activity />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />{" "}
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/user",
    element: (
      <ProtectedRoute>
        <ListUser />,
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/banner",
    element: (
      <ProtectedRoute>
        <BannerDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/banner/edit-banner/:id",
    element: (
      <ProtectedRoute>
        <EditBannerDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/category",
    element: (
      <ProtectedRoute>
        <CategryDashboard />,
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/category/edit-category/:id",
    element: (
      <ProtectedRoute>
        <UpdateCategory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/promo",
    element: (
      <ProtectedRoute>
        <PromoDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/promo/create-promo",
    element: (
      <ProtectedRoute>
        <CreatePromo />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/promo/edit-promo/:id",
    element: (
      <ProtectedRoute>
        <UpdatePromo />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/activity",
    element: (
      <ProtectedRoute>
        <ActivityDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/activity/create-activity",
    element: (
      <ProtectedRoute>
        <CreateActivity />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/activity/edit-activity/:id",
    element: (
      <ProtectedRoute>
        <UpdateActivity />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/promo/:id",
    element: <DetailPromo />,
  },
  {
    path: "/activity/:id",
    element: <DetailActivity />,
  },
];

export default routeList;
