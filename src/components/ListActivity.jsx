import axios from "axios";
import { useEffect, useState } from "react";
import { RiMapPin2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReactPaginate from "react-paginate";
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

const ListActivity = () => {
  const [activity, setActivity] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;
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
        // console.log(res);
        setActivity(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
    <div>
      {/* filter */}
      <div className="flex justify-center w-10/12 mx-auto mt-2">
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
        <Alert variant="destructive" className="mt-5">
          <AlertCircle className="w-4 h-4" />
          <AlertTitle>No Data</AlertTitle>
          <AlertDescription>
            No Activities Found
          </AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-3 gap-5 p-5 max-sm:grid-cols-1 max-sm:justify-center max-sm:place-items-center">
        {currentItems.map((item) => (
          <Link
            key={item.id}
            className="w-[350px] border shadow-2xl rounded-3xl max-sm:w-[300px]"
            to={`/activity/${item.id}`}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-center max-sm:text-lg">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <img
                    src={item.imageUrls}
                    alt="imgPromo"
                    className="w-full rounded-tl-xl rounded-tr-xl h-[200px] object-cover"
                  />
                </CardDescription>
                <div className="flex items-center gap-1 p-3">
                  <RiMapPin2Fill className="text-yellow-500" />
                  <p className="font-semibold">
                    {item.city}, {item.province}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
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

export default ListActivity;
