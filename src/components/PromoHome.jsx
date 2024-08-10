import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatRupiah } from "@/lib/utils";
import { Link } from "react-router-dom";


const PromoHome = () => {
  const [promo, setPromo] = useState([]);
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
        // console.log(res.data.data);
        setPromo(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getPromo();
  }, []);

  return (
    <section className="w-3/4 mx-auto">
      <div className="flex flex-col items-center justify-center gap-10 p-5 bg-gray-300 border backdrop-filter backdrop-blur-md bg-opacity-10 rounded-2xl">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold max-sm:text-sm">Travel More, Save More</h1>
          <p className="text-gray-500 max-sm:text-[10px] max-sm:text-center">
            "With our exclusive discounts and offers, you can explore more of
            the world without worrying about your budget."
          </p>
        </div>

        <div className="flex w-3/4 space-x-16 overflow-hidden group">
          <div className="flex space-x-16 animate-loop-scroll group-hover:paused max-sm:animate-loop-scroll-sm">
            {promo.map((item) => (
              <Link to={"/promo"} key={item.id}>
                <Card
                  className="w-[250px] hover:scale-105 duration-300 hover:bg-blue-300 bg-slate-300 pt-5"
                  key={item.id}
                >
                  <CardContent className="flex flex-col items-center justify-center gap-2">
                    <CardTitle className="text-lg font-bold">
                      {item.title}
                    </CardTitle>
                    <img
                      src={item.imageUrl}
                      alt="promoImg"
                      className="rounded-lg"
                    />
                    <div className="flex gap-2">
                      <CardDescription className="line-through">
                        {formatRupiah(item.minimum_claim_price)}
                      </CardDescription>
                      <CardDescription>
                        {formatRupiah(item.promo_discount_price)}
                      </CardDescription>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoHome;
