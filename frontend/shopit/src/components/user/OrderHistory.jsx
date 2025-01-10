function OrderHistory({item}) {
    return (

        <div className="card-body">
            <div>
                <div className="row">
                    <div className="col-md-2">
                        <img src="" alt="" className="img-fluid" />
                    </div>
                    <div className="col-md-6">
                        <h6>{item.product.name}</h6>
                        <p>Order Date: {item.order_date}</p>
                        <p>Order ID: {item.id}</p>
                    </div>
                    <div className="col-md-2 text-center">
                        <h6 className="text-muted">Quantity: {item.quantity}</h6>
                    </div>
                    <div className="col-md-2 text-center">
                        <h6 className="text-muted">{item.product.price}</h6>
                    </div>

                </div>
            </div>

        </div>

    );
};

export default OrderHistory;