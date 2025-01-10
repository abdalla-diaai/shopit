import OrderItem from "./OrderItem";

function OrderSummary({ items, subTotal }) {
    const tax = subTotal * 0.01;
    const total = subTotal + tax;

    return (
        <div className="col-md-8">
            <div className="card mb-4">
                <div className="card-header">
                    <h5>Cart Summary</h5>
                </div>
            </div>
            <div className="card-body">
                {items.map(item => (
                    <OrderItem key={item.id} item={item} />
                ))}
            </div>
            <div className="d-flex justify-content-between">
                <h6>Total (inc. VAT)</h6>
                <h6>{total.toFixed(2)}</h6>
            </div>
        </div>
    );
}

export default OrderSummary;