import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Assuming you are using react-router-dom
import { CheckCircle } from "lucide-react"; // Assuming lucide-react for icons

// Access WhatsApp number from environment variables
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

const PaymentSuccess = () => {
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    // Get the order_id from the URL query parameters
    const params = new URLSearchParams(window.location.search);
    const id = params.get("order_id");
    if (id) {
      setOrderId(id);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center border-t-4 border-emerald-500">
        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-6 animate-bounce-in" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Confirmed!</h1>
        <p className="text-gray-700 mb-6 text-lg">
          Thank you for your payment. Your order has been successfully placed and is now processing.
        </p>
        {orderId && (
          <p className="text-gray-800 text-lg font-medium mb-6">
            Your Order ID: <span className="text-emerald-600 font-bold">{orderId}</span>
          </p>
        )}
        <p className="text-gray-600 mb-8">
          You will receive further updates via WhatsApp.
        </p>
        <div className="space-y-4">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition ease-in-out duration-150"
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp Icon" className="h-5 w-5 mr-2" />
            Return to WhatsApp Chat
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
