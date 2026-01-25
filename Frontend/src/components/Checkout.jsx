import { useDispatch, useSelector } from "react-redux";
import { createOrder, verifyPayment } from "../feature/paymentThunk"

export default function Checkout({ totalAmount }) {
  const dispatch = useDispatch();
  const { order, loading } = useSelector((state) => state.payment);

  const handleCheckout = async () => {
    const res = await dispatch(createOrder(totalAmount));
    if (!res.payload) return;

    const options = {
      key: "rzp_test_xxxxx",
      amount: res.payload.amount,
      currency: res.payload.currency,
      order_id: res.payload.id,
      name: "My E-Commerce",
      description: "Order Payment",

      handler: async (response) => {
        dispatch(verifyPayment(response));
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button onClick={handleCheckout} disabled={loading}>
      {loading ? "Processing..." : `Pay ₹${totalAmount}`}
    </button>
  );
}
