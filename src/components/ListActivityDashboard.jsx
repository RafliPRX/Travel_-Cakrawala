import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ListActivityDashboard = () => {
  const [activity, setActivity] = useState([]);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;
  const userInfo = useSelector((state) => state.user.userInfo);
  const [categories, setCategories] = useState([]);

  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = activity.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(activity.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % activity.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  const getActivity = () => {
    axios
      .get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      )
      .then((res) => {
        // console.log(res.data.data);
        setActivity(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error",
          description: err.response.data.message,
          variant: "destructive",
        });
      });
  };

  const handleDelete = (id) => {
    setIsLoading(true);
    axios
      .delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-activity/${id}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${userInfo.token ?? ""}`,
          },
        }
      )
      .then((res) => {
        // console.log(res)
        if (res.data.code === "200") {
          setActivity((prevItems) =>
            prevItems.filter((item) => item.id !== id)
          );
          toast({ description: res.data.message, variant: "destructive" });
        }
      })
      .catch((err) => {
        console.log(err.response);
        toast({
          description: err.response.data.message,
          variant: "destructive",
        });
      })
      .finally(() => setIsLoading(false));
  };

  const getCategories = () => {
    axios
      .get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      )
      .then((res) => {
        // console.log(res.data.data);
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleFilter = (value) => {
    if (value === "all") {
      getActivity();
      return;
    }
    axios
      .get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities-by-category/${value}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        setActivity(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getActivity();
    getCategories();
  }, []);

  return (
    <div className="flex flex-col">
      {/* filter */}
      <div className="flex justify-center mt-2">
        <Select onValueChange={handleFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              <SelectItem value="all">All Category</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* No data  */}
      {activity.length === 0 && (
        <Alert variant="destructive" className="mt-5 ">
          <AlertCircle className="w-4 h-4" />
          <AlertTitle>No Data</AlertTitle>
          <AlertDescription>No Activities Found</AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-3 gap-10 p-5 max-sm:grid-cols-1">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="w-[300px] border shadow-2xl rounded-3xl"
          >
            <Card>
              <CardHeader>
                <CardTitle className="mb-2 text-2xl font-bold text-center">
                  {item.title}
                </CardTitle>
                <CardDescription>
                  <img
                    src={item.imageUrls}
                    alt="imgActivity"
                    className="w-full rounded-tl-xl rounded-tr-xl h-[200px] object-cover"
                  />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  <span className="font-bold">Created: </span>
                  {format(new Date(item.createdAt), "eee, dd MMM yyyy")}
                </p>
                <p>
                  <span className="font-bold">Updated: </span>
                  {format(new Date(item.updatedAt), "eee, dd MMM yyyy")}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                {/* Edit */}
                <Link to={`/dashboard/activity/edit-activity/${item.id}`}>
                  <Button variant="outline" className="text-white bg-primary">
                    Update
                  </Button>
                </Link>
                {/* Delete */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      {isLoading ? "Loading..." : "Delete"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure delete this activity?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(item.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
      <ReactPaginate
        className="flex justify-center gap-5 p-3 mx-auto mt-5 w-fit"
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="Prev"
        renderOnZeroPageCount={null}
        activeClassName="text-white"
        pageClassName="text-muted-foreground"
        pageLinkClassName="bg-primary px-4 py-3 rounded-2xl text-center h-20"
        previousClassName="text-white"
        previousLinkClassName="bg-primary px-4 py-3 rounded-2xl text-center h-20"
        nextClassName="text-white"
        nextLinkClassName="bg-primary px-4 py-3 rounded-2xl text-center h-20"
        disabledClassName="text-muted-foreground"
        disabledLinkClassName="text-muted-foreground"
      />
    </div>
  );
};

export default ListActivityDashboard;
