import axios from "axios";

const searchProductsAPI = async (query) => {

  const response = await axios.get(
    `https://microservices-3-777q.onrender.com/api/products/search?q=${encodeURIComponent(
      query
    )}`
  );

  // console.log("🔎 SEARCH RESPONSE:", response.data);

  return response.data;
};

export default searchProductsAPI;