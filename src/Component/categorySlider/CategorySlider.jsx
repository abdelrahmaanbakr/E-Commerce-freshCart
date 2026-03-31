import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Loader from "../Loader/Loader";
import { API_BASE_URL } from "../../config/env";

export default function CategorySlider() {
  async function getAllCategories() {
    const option = {
      url: `${API_BASE_URL}/categories`,
      method: "get",
    };

    return await axios.request(option);
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["categorySlide"],
    queryFn: getAllCategories,
    refetchOnMount: false,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <h2>error</h2>;
  }

  return (
    <div>
      <Swiper
        className="shadow-lg"
        loop={true}
        spaceBetween={16}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
      >
        {data.data.data.map((category) => (
          <SwiperSlide key={category._id}>
            <img className="h-64 object-cover" src={category.image} alt="" />
            <h2>{category.name}</h2>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
