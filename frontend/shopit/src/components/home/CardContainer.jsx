import React from "react";
import ProductCard from "./ProductCard";

function CardContainer ( { products}) {
    return (
        <section className="py-5" id="shop">
            <h4 style={{textAlign: "center"}}>ShopIT Products</h4>
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row justify-content-center">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CardContainer;