import axios from "axios";
import { useEffect, useState } from "react";
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
import ReactPaginate from "react-paginate";

const ListBanner = () => {
  const [banner, setBanner] = useState([]);
  const { toast } = useToast();
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = banner.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(banner.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % banner.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  const getBanner = () => {
    axios
      .get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      )
      .then((res) => {
        // console.log(res.data.data);
        setBanner(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
        toast({
          title: "Error",
          description: err.response.data.message,
          variant: "destructive",
        });
      });
  };

  useEffect(() => {
    getBanner();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="grid w-10/12 grid-cols-3 gap-5 p-5 mx-auto max-sm:grid-cols-1 max-sm:w-screen max-sm:justify-center max-sm:place-items-center">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="w-[350px] border shadow-2xl rounded-3xl max-sm:w-[300px]"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-center max-sm:text-lg">
                  {item.name}
                </CardTitle>
                <CardDescription>
                  <img
                    src={item.imageUrl}
                    alt="imgPromo"
                    className="w-full rounded-tl-xl rounded-tr-xl h-[200px] object-cover"
                  />
                </CardDescription>
              </CardHeader>
              <CardContent className="max-sm:text-sm">
                <p>
                  <span className="font-bold">Created: </span>
                  {format(new Date(item.createdAt), "eee, dd MMM yyyy")}
                </p>
                <p>
                  <span className="font-bold">Updated: </span>
                  {format(new Date(item.updatedAt), "eee, dd MMM yyyy")}
                </p>
              </CardContent>
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

export default ListBanner;
