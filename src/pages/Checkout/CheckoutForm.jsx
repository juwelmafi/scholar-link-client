import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecurity from "../../hooks/UseAxiosSecurity";


const CheckoutForm = ({ applicationData, amount, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
 const axiosSecure = useAxiosSecurity();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  // Fetch clientSecret from backend
  useEffect(() => {
    if (amount > 0) {
      axiosSecure
        .post("/create-payment-intent", { amount })
        .then((res) => setClientSecret(res.data.clientSecret));
    }
  }, [amount, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setLoading(true);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmError) {
      toast.error(confirmError.message);
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      // ✅ Save application to MongoDB here
      const application = {
        ...applicationData,
        paymentStatus: "paid",
        paymentId: paymentIntent.id,
        applicationStatus: 'pending',
        date: new Date(),
      };

      const res = await axiosSecure.post("/applied-scholarships", application);
      if (res.data.insertedId) {
        onClose?.();
        toast.success("Application Submitted Successfully!");
        // Redirect or clear form
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": { color: "#aab7c4" },
            },
            invalid: { color: "#9e2146" },
          },
        }}
      />
      <button className="btn btn-primary text-white btn-sm mt-4" type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : `Pay ৳${amount}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
