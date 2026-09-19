const { tool } = require("@langchain/core/tools")
const { z } = require("zod")
const axios = require("axios")

const searchProduct = tool(async ({ query }) => {
  try {
    console.log("🔎 SEARCH PRODUCT QUERY:", query);

    const url =
      `https://microservices-3-777q.onrender.com/api/products/search?q=${(query)}`;

    console.log("🌐 SEARCH URL:", url);

    const response = await axios.get(url);

    console.log("✅ PRODUCT SERVICE STATUS:", response.status);
    console.log("✅ PRODUCT SERVICE DATA:", response.data);

    return JSON.stringify(response.data);

  } catch (error) {
    console.error("❌ SEARCH PRODUCT ERROR:", error.message);

    if (error.response) {
      console.error("❌ STATUS:", error.response.status);
      console.error("❌ DATA:", error.response.data);
    }

    throw error;
  }
}, {
  name: "searchProduct",
  description: "Search for products based on a query.",
  schema: z.object({
    query: z.string().describe("The search query for products")
  })
});


const addProductToCart = tool(async ({ productId, qty = 1 }) => {


    const response = await axios.post(`https://microservices-1-wmb0.onrender.com/api/cart/items`, {
        productId,
        qty
    }, {
        
        // headers: {
        //     Authorization: `Bearer ${token}`
        // }
    })

    return `Added product with id ${productId} (qty: ${qty}) to cart`


}, {
    name: "addProductToCart",
    description: "Add a product to the shopping cart",
    schema: z.object({
        productId: z.string().describe("The id of the product to add to the cart"),
        qty: z.number().describe("The quantity of the product to add to the cart").default(1),
      
    })
})


module.exports = { searchProduct, addProductToCart }