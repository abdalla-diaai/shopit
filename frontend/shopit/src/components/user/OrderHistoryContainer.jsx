import OrderHistory from "./OrderHistory";

function OrderHistoryContainer({ orderItems }) {
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                        <h5>Order History</h5>
                    </div>

                    {orderItems.map(item => <OrderHistory key={item.id} item={item} />
                    )}
                </div>

            </div>

        </div>
    );
};

export default OrderHistoryContainer;