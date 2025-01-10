import { useState } from 'react';
import api, { BASE_URL } from "../../api";
import { toast } from 'react-toastify'; 

function CartItem({item, items, setSubTotal, setItems, setNumCartItems}) {
    const [quantity, setQuantity] = useState(item.quantity);
    const itemData = {quantity: quantity, item_id: item.id};
    const itemId = {item_id: item.id};
    const [loading, setLoading] = useState(false);

    function updateCartItem() {
        api.patch('update_quantity/', itemData)
        .then(response => {
            console.log(response.data);
            toast.success('Cart item updated successfully!');
            setLoading(false);
            setSubTotal(items.map((cartItem) => cartItem.id === item.id ? response.data.data : cartItem).reduce((acc, curr) => acc + curr.total, 0));
            setNumCartItems(items.map((cartItem) => cartItem.id === item.id ? response.data.data : cartItem).reduce((acc, curr) => acc + curr.quantity, 0));
        })
        .catch(err => {
            console.log(err.message);
            setLoading(false);
        });
    };

    // for delete functions use filter
    function deleteCartItem() {
        api.post('delete_cart_item/', itemId)
        .then(response => {
            console.log(response.data);
            toast.success('Cart item deleted successfully!');
            setItems(items.filter(cartItem => cartItem.id != itemId.item_id));
            setSubTotal(items.filter((cartItem) => cartItem.id != item.id).reduce((acc, curr) => acc + curr.total, 0));
            setQuantity(items.filter((cartItem) => cartItem.id != item.id).reduce((acc, curr) => acc + curr.total, 0));
        })
        .catch(err => {
            console.log(err.message);
        });
    };

    return (
    <div className="cart-item d-flex align-items-center mb-3 p-3"
    style={{ backgroundColor: '#f8f9fa', borderRadius: '8px'}}>
        <img src={`${BASE_URL}${item.product.image}`} alt="Product Image" className="img-fluid" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px'}}/>
        <div className="ms-3 flex-grow-1">
            <h5 className="mb-1">{item.product.name}</h5>
            <p className="mb-0 text-muted">{item.product.price}</p>
        </div>
        <div className="d-flex align-items-center">
            <input type="number" min={1} className="form-control me-3" value={quantity} onChange={(e) => setQuantity(e.target.value)} style={{width: '70px'}}/>
            <button className="btn btn-info btn-sm" onClick={updateCartItem} disabled={loading}>{loading ? "Updating" : "Update"}</button>
            <button className="btn btn-danger btn-sm" onClick={deleteCartItem}>Remove</button>
        </div>
    </div>
    );
};

export default CartItem;