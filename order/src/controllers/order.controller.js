const orderModel = require("../model/order.model")
const axios = require('axios')



async function createOrder(req, res) {

    try {
    const user = req.user;

    const token =
      req.cookies?.token ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    // 1️⃣ Fetch cart
    const cartResponse = await axios.get(
      "http://localhost:3002/api/cart",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const cartItems = cartResponse.data.cart.items;

    if (!cartItems.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2️⃣ Fetch products
    const products = await Promise.all(
      cartItems.map(async (item) => {
        const res = await axios.get(
          `http://localhost:3001/api/products/${item.productId}`
        );
        return res.data.data; // product
      })
    );

    let priceAmount = 0;

    // 3️⃣ Build order items
    const orderItems = cartItems.map((item) => {
      const product = products.find(
        (p) => p._id.toString() === item.productId.toString()
      );

      if (!product) {
        throw new Error("Product not found");
      }

      const itemTotal = product.price.amount * item.quantity;
      priceAmount += itemTotal;

      return {
        product: item.productId,
        quantity: item.quantity,
        price: {
          amount: itemTotal,
          currency: product.price.currency,
        },
      };
    });

    // 4️⃣ Create order
    const order = await orderModel.create({
      user: user.id,
      items: orderItems,
      status: "PENDING",
      totalPrice: {
        amount: priceAmount,
        currency: "INR",
      },
      shippingAddress: req.body.shippingAddress,
    });

    return res.status(200).json({
      message: "Order created successfully",
      data: order,
    });

  } catch (err) {
    console.error("Order error:", err.message);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }


}


async function getOrder(req, res) {

    const user = req.user;
  
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const orders =  await orderModel.find({user: user.id}).skip(skip).limit(limit).exec();
        const totalorders = await orderModel.countDocuments({user: user.id});
     
        res.status(200).json({
         orders,
         meta:{
            total:totalorders,
            page,
            limit,
         }
        });
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
}


async function getOrderById(req, res) {
    const user = req.user;
    const orderId = req.params.id;

    try {
        const order = await orderModel.findById(orderId)

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // if (order.user.toString() !== user.id) {
        //     return res.status(403).json({ message: "Forbidden: You do not have access to this order" });
        // }

        res.status(200).json({ order })
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message })
    }
}

async function cancelOrderById(req, res) {
    const user = req.user;
    const orderId = req.params.id;

    try {
        const order = await orderModel.findById(orderId)

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.user.toString() !== user.id) {
            return res.status(403).json({ message: "Forbidden: You do not have access to this order" });
        }

        // only PENDING orders can be cancelled
        if (order.status !== "PENDING") {
            return res.status(409).json({ message: "Order cannot be cancelled at this stage" });
        }

        order.status = "CANCELLED";
        await order.save();

        res.status(200).json({ order });
    } catch (err) {

        console.error(err);

        res.status(500).json({ message: "Internal server error", error: err.message });
    }
}


async function updateOrderAddress(req, res) {
    const user = req.user;
    const orderId = req.params.id;

    try {
        const order = await orderModel.findById(orderId)

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.user.toString() !== user.id) {
            return res.status(403).json({ message: "Forbidden: You do not have access to this order" });
        }

        // only PENDING orders can have address updated
        if (order.status !== "PENDING") {
            return res.status(409).json({ message: "Order address cannot be updated at this stage" });
        }

        order.shippingAddress = {
            street: req.body.shippingAddress.street,
            city: req.body.shippingAddress.city,
            state: req.body.shippingAddress.state,
            zip: req.body.shippingAddress.pincode,
            country: req.body.shippingAddress.country,
        };

        await order.save();

        res.status(200).json({ order });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

module.exports = {
     createOrder,
     getOrder,
     getOrderById,
     cancelOrderById,
     updateOrderAddress
}