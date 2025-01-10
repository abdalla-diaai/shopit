import React from "react";
import Header from "./Header";
import CardContainer from "./CardContainer";
import api from "../../api";
import { useEffect, useState } from "react";
import LoadingContainer from "../ui/LoadingContainer";
import Error from "../ui/Error";
import { cartCode } from "../../CartCode";

function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    useEffect(() => {
        if (localStorage.getItem('cart_code') === null) {
            localStorage.setItem('cart_code', cartCode);
        };
         
    }, []);

    useEffect(() => {
        setLoading(true);
        api.get('products')
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
                setError('')
            })
            .catch((err) => {
                console.log('Error', err);
                setError(err.message)
            });
    }, []);

    return (
        <>
            <Header />
            {/* if loading is true, display loading container otherwise display card container */}
            { loading && <LoadingContainer /> }
            {error && <Error error={error}/>}
            { loading || error != '' || <CardContainer products={products}/>}

            
        </>
    );
};

export default HomePage;