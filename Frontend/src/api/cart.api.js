export const addToCart = async (productId, quantity = 1) => {
  return await API.post("http://localhost:3002/api/cart/items/", { productId, quantity });
};

export const getCart = async () => {
  const { data } = await API.get("/cart");
  return data;
};
