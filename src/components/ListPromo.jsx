import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatRupiah } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReactPaginate from "react-paginate";

const ListPromo = () => {
  const [promo, setPromo] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = promo.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(promo.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % promo.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const getPromo = () => {
    axios
      .get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setPromo(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPromo();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-3 gap-10 p-5 max-sm:grid-cols-1 max-sm:justify-center max-sm:place-items-center">
        {currentItems.map((item) => (
          <Link
            key={item.id}
            className="w-[340px] border shadow-2xl rounded-3xl max-sm:w-[300px]"
            to={`/promo/${item.id}`}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-center max-sm:text-lg">
                  {item.title}
                </CardTitle>
                <CardDescription>
                  <img
                    src={item.imageUrl}
                    alt="imgPromo"
                    className="w-full rounded-tl-xl rounded-tr-xl h-[200px] object-cover"
                  />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <p className="font-bold">Minimum Price: </p>
                  <p className="line-through">
                    {formatRupiah(item.minimum_claim_price)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <p className="font-bold">Discount Price: </p>
                  <p>{formatRupiah(item.promo_discount_price)}</p>
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

export default ListPromo;
