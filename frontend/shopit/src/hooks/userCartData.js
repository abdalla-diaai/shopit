import { useState, useEffect } from "react";
import api from "../api";

function userCartData(cart_code) {
    const [items, setItems] = useState([]);
    const [subTotal, setSubTotal] = useState(0.0);
    const [loading, setLoading] = useState("visually-hidden");

    useEffect(() => {
        setLoading("");
        if (cart_code) {
            api.get(`get_cart?cart_code=${cart_code}`)
                .then(response => {
                    console.log(response.data);
                    setLoading("visually-hidden");
                    setItems(response.data.items);
                    setSubTotal(response.data.sum_total);
                })
                .catch(err => {
                    console.log(err.message);
                });
        };
    }, [cart_code]);

    return { items, subTotal, loading, setItems, setSubTotal, setLoading };
};

export default userCartData;