import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { API_BASE_URL } from "../../config/env";

export default function Brands() {
  async function getAllBrands() {
    const option = {
      url: `${API_BASE_URL}/brands`,
      method: "get",
    };

    return await axios.request(option);
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: getAllBrands,
    refetchOnMount: false,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <h2>Error</h2>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-8 my-10">
        {data.data.data.map((brand) => (
          <div
            className="rounded-md group relative cursor-pointer shadow-md"
            key={brand._id}
          >
            <Link to={`/brandsDetails/${brand._id}`}>
              <div>
                <img className="w-full" src={brand.image} alt={brand.name} />
                <div className="absolute inset-0 opacity-0 bg-gray-500/40 group-hover:opacity-100 transition-all"></div>
              </div>
            </Link>

            <div className="p-2">
              <h3 className="text-xl font-semibold">{brand.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
