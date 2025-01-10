import OrderSummary from "./OrderSummary";
import PaymentSection from "./PaymentSection";
import userCartData from "../../hooks/userCartData";

function CheckoutPage() {
    const cart_code = localStorage.getItem("cart_code");
    const { items, subTotal, loading, setItems, setSubTotal } = userCartData(cart_code);

    return (
        <div>
            <OrderSummary items={items} subTotal={subTotal} />
            <PaymentSection />
        </div>
    );
};

export default CheckoutPage;