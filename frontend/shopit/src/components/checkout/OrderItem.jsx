import api, { BASE_URL } from "../../api";
function OrderItem({ item }) {
    return (
        <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center">
                <img src={`${BASE_URL}${item.product.image}`} alt="" 
                style={{width: '60px', height: '60px', objectFit:'cover', borderRadius: '5px'}}/>
                <div className="ms-3">
                    <h6 className="mb-0">{item.product.name}</h6>
                    <small>Quantity: {item.quantity}</small>
                </div>
            </div>
            <h6>{item.product.price}</h6>
        </div>
    );
}

export default OrderItem;
