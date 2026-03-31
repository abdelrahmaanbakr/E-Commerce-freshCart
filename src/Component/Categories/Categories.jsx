import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Loader from "../Loader/Loader";
import { API_BASE_URL } from "../../config/env";

export default function Categories() {
  async function getAllCategories() {
    const option = {
      url: `${API_BASE_URL}/subcategories`,
      method: "get",
    };

    return await axios.request(option);
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["categories"],
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-8 my-10">
        {data.data.data.map((cat) => (
          <div
            className="rounded-md group relative cursor-pointer shadow-md"
            key={cat._id}
          >
            <div className="p-2">
              <h3 className="text-xl font-semibold">{cat.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
