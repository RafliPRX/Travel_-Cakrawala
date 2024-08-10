import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { RiMapPin2Fill } from "react-icons/ri";
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

const ActivityHome = () => {
  const [activity, setActivity] = useState([]);

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
        console.log(err.response);
      });
  };

  useEffect(() => {
    getActivity();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center w-3/4 p-5 mx-auto mt-10 bg-gray-300 border rounded-xl backdrop-filter backdrop-blur-md bg-opacity-10">
      <h1 className="text-3xl font-bold max-sm:text-sm max-sm:text-center">
        Create Memories with Every Activity
      </h1>
      <p className="text-gray-500 max-sm:text-[10px] max-sm:text-center">
        "Suggest that each activity will lead to lasting and cherished
        memories."
      </p>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-11/12 mt-10 max-sm:hidden"
      >
        <CarouselContent>
          {activity.map((item) => (
            <CarouselItem key={item.id} className="basis-1/3">
              <Link to={"/activity"}>
                <Card className="w-[250px] hover:scale-95 duration-300 border-none bg-slate-300 pt-5">
                  <CardContent className="flex flex-col items-center justify-center gap-2">
                    <img
                      className="object-cover rounded-lg aspect-video"
                      src={item.imageUrls}
                      alt="imgActivity"
                    />
                    <div className="flex gap-1">
                      <CardTitle className="text-lg font-bold">
                        {item.title}
                      </CardTitle>
                      <div className="flex justify-center gap-1 px-2 py-1 bg-blue-500 rounded-lg w-fit">
                        <FaStar className="text-yellow-500" />
                        <CardDescription className="text-black">
                          {item.rating}
                        </CardDescription>
                      </div>
                    </div>

                    <div className="flex gap-1">
                      <RiMapPin2Fill className="text-yellow-500" />
                      <CardDescription className="text-sm">
                        {item.city}, {item.province}
                      </CardDescription>
                    </div>
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
          {activity.map((item) => (
            <CarouselItem key={item.id}>
              <Link to={"/activity"}>
                <Card> 
                  <CardContent className="flex flex-col items-center justify-center mt-5">
                    <img
                      className="object-cover rounded-lg aspect-video"
                      src={item.imageUrls}
                      alt="imgActivity"
                    />
                    <div className="flex items-center">
                      <CardTitle className="font-bold text-[10px]">
                        {item.title}
                      </CardTitle>
                    </div>

                    <div className="flex items-center gap-1">
                      <RiMapPin2Fill className="text-yellow-500 w-[8px]" />
                      <CardDescription className="text-[8px]">
                        {item.city}
                      </CardDescription>
                      <CardDescription className="text-[8px]">
                        {item.province}
                      </CardDescription>
                    </div>
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

export default ActivityHome;
