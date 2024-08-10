import axios from "axios";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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

const CategoryHome = () => {
  const [categories, setCategories] = useState([]);

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

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center w-3/4 p-5 mx-auto mt-10 bg-gray-300 border backdrop-filter backdrop-blur-md bg-opacity-10">
      <h1 className="text-3xl font-bold max-sm:text-sm max-sm:text-center">
        Choose Your Dream Destination
      </h1>
      <p className="text-gray-500 max-sm:text-[10px] max-sm:text-center">
        "Highlight the opportunity for users to pick a place they've always
        wanted to visit."
      </p>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-10/12 mt-10 max-sm:hidden"
      >
        <CarouselContent>
          {categories.map((item) => (
            <CarouselItem key={item.id} className="basis-1/3">
              <Link to={"/category"}>
                <Card className="w-[200px] hover:scale-95 duration-300 border-none pt-5 bg-slate-300">
                  <CardContent className="flex flex-col items-center justify-center gap-1">
                    <img
                      className="object-cover rounded-lg aspect-video"
                      src={item.imageUrl}
                      alt="imgCategory"
                    />
                    <CardTitle className="text-sm font-bold">
                      {item.name}
                    </CardTitle>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-blue-500" />
        <CarouselNext className="bg-blue-500" />
      </Carousel>

      <Carousel
        className="w-8/12 mt-5 sm:hidden"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {categories.map((item) => (
            <CarouselItem key={item.id}>
              <Link to={"/category"}>
                <Card>
                  <CardContent className="flex flex-col items-center justify-center gap-1 mt-5">
                  <img
                      className="object-cover w-full rounded-lg"
                      src={item.imageUrl}
                      alt="imgCategory"
                    />
                    <CardTitle className="font-bold text-[10px]">
                      {item.name}
                    </CardTitle>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default CategoryHome;
