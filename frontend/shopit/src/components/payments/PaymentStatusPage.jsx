import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from '../../api'

function PaymentStatusPage({setNumCartItems}) {
    const [statusMessage, setStatusMessage] = useState('Verifying your payment.');
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const paymentId = queryParams.get('paymentId');
        const payerId = queryParams.get('PayerID');
        const ref = queryParams.get('ref');

        if (paymentId && payerId && ref) {
            api.post(`paypal_payment_callback/?paymentId=${paymentId}&PayerID=${payerId}&ref=${ref}`)
            .then(response => {
                setStatusMessage(response.data.message);
                localStorage.removeItem('cart_code');
                setNumCartItems(0);
            })
            .catch(error => {
                console.log(error.message);
            });
        };

    }), [];

    // useEffect(() => {
    //     const queryParams = new URLSearchParams(location.search);
    //     const status = queryParams.get('status');
    //     const txRef = queryParams.get('tx_ref');
    //     const transactionId = queryParams.get('transaction_id');

    //     if (status && txRef && transactionId) {
    //         api.post(`payment_callback/?status=${status}&tx_ref=${txRef}&transaction_id=${transactionId}`)
    //         .then(response => {
    //             setStatusMessage(response.data.message);
    //             localStorage.removeItem('cart_code');
    //             setNumberCartItems(0)
    //         })
    //         .catch(error => {
    //             console.log(error.message);
    //         })
    //     }


    // }), [];

    return (
        <header className="py-5" style={{ backgroundColor: "#6050DC" }}>
            <div className="container px-4 px-lg-5 my-5">
                <div className="text-center text-white">
                    <h2 className="display-5 fw-bold">Verifying Payment!</h2>
                    <p className="lead fw-normal text-white-75 mb-4">Give us a moment we are verifying your payment</p>
                    <p>{statusMessage}</p>
                    <span>
                        <Link to="/profile" className="btn btn-light-btn btn-lg px-4 py-2 mx-3">View Order Details</Link>
                        <Link to="/" className="btn btn-light-btn btn-lg px-4 py-2 mx-3">Continue Shopping</Link>
                    </span>
                </div>
            </div>
        </header>
    );
};

export default PaymentStatusPage;