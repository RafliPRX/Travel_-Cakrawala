import axios from "axios";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const BannerHome = () => {
  const [banners, setBanners] = useState([]);

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
        setBanners(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getBanner();
  }, []);

  return (
    <Carousel
      className="w-1/2 mt-20 max-sm:w-3/4 max-sm:mt-0"
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        {banners.map((banner) => (
          <CarouselItem key={banner.id}>
            <Link to="/banner">
              <Card className="flex flex-col items-center w-full pt-5 bg-gray-300 border backdrop-filter backdrop-blur-md bg-opacity-10">
                <CardContent>
                  <img
                    className="w-[500px] h-[300px] object-cover rounded-xl max-sm:w-[250px] max-sm:h-[150px]"
                    src={banner.imageUrl}
                    alt={banner.title}
                  />
                </CardContent>
                <CardFooter>
                  <h2 className="text-2xl max-sm:text-xl">{banner.name}</h2>
                </CardFooter>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default BannerHome;
