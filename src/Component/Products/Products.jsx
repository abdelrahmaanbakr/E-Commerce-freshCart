import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import Card from "../Card/Card";
import { API_BASE_URL } from "../../config/env";

export default function Products() {
  async function getProduct() {
    const option = {
      url: `${API_BASE_URL}/products`,
      method: "get",
    };

    return await axios.request(option);
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: getProduct,
    refetchOnMount: false,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <h2 className="text-red-500 bg-red-300 text-3xl w-full text-center">
        Error
      </h2>
    );
  }

  return (
    <div className="pt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-5 my-4">
        {data.data.data.map((pro) => (
          <Card key={pro.id} props={pro} />
        ))}
      </div>
    </div>
  );
}
