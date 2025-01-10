import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import userCartData from "../../hooks/userCartData";


function CartPage({ setNumCartItems }) {
    const cart_code = localStorage.getItem("cart_code");
    const { items, subTotal, loading, setItems, setSubTotal } = userCartData(cart_code);

    if (items.length == 0) {
        return (
            <Alert key='danger' variant='danger'>
                Cart is empty!
            </Alert>
        );
    }

    return (
        <div className="container my-3 py-3" style={{ height: "80vh", overflow: "scroll" }}>
            <h5 className="mb-4">Shopping Cart</h5>
            <div className="row">
                <Spinner animation="border" role="status" className={loading}>
                    <span className={loading}>Loading...</span>
                </Spinner>
                <div className="col-md-8">
                    {items.map((item) => (
                        <CartItem key={item.id} item={item} items={items} setSubTotal={setSubTotal} setItems={setItems} setNumCartItems={setNumCartItems} />
                    ))}
                </div>
                <div>
                    <CartSummary subTotal={subTotal} />
                </div>
            </div>
        </div>
    );

};

export default CartPage;