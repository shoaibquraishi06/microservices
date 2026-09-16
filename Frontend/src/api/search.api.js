import axios from "axios";

const searchProductsAPI = async (query) => {

  const response = await axios.get(
    `http://localhost:3001/api/products/search?q=${encodeURIComponent(
      query
    )}`
  );

  // console.log("🔎 SEARCH RESPONSE:", response.data);

  return response.data;
};

export default searchProductsAPI;