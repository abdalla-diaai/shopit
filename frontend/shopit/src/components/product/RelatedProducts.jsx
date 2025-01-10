import ProductCard from "../home/ProductCard";
import { Component } from "./test";

function RelatedProducts({ related }) {
    return (
        <>
            {related.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
            <Component />
        </>

    );
};

export default RelatedProducts;