import { Link } from "react-router-dom";

function CartSummary({subTotal}) {
    const tax = subTotal * 0.01;
    const total = subTotal + tax;
    return (
        <div className="col-md-4 align-self-start">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Cart Summary</h5>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <span>Subtotal: </span>
                        <span>£{subTotal}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>Tax: </span>
                        <span>£{tax.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <span>Total: </span>
                        <strong>£{total.toFixed(2)}</strong>
                    </div>
                    <Link to='/checkout'>
                    <button className="btn btn-primary w-100"
                    style={{backgroundColor: '#6050DC', borderColor: '#6050DC'}}>Proceed to checkout</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartSummary;
