const { tool } = require("@langchain/core/tools")
const { z } = require("zod")
const axios = require("axios")

const searchProduct = tool(async ({ query }) => {

    // console.log("searchProduct called with data:", { query,  })

    const response = await axios.get(`https://microservices-3-777q.onrender.com/api/products?q=${query}`, {
        // headers: {
        //     Authorization: `Bearer ${token}`
        // }
    })


    //  console.log(query);
    //  
    return JSON.stringify(response.data)

}, {

    name: "searchProduct",
    description: "Search for products based on a query",
    schema: z.object({
        query: z.string().describe("The search query for products")
    })
})


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