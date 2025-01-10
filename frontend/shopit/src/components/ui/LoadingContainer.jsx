import React from "react";
import Loading from "./Loading";

function LoadingContainer() {
    const loadingCards = [...Array(12).keys()];
    return (
        <section>
            <h4 style={{ textAlign: "center " }}>Our Products</h4>
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row justify-content-center">
                    { loadingCards.map((i) => ( <Loading key={i} /> )) }
                </div>
            </div>
        </section>
    );
};

export default LoadingContainer;