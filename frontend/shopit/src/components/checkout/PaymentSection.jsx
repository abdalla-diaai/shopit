import { useState } from "react";
import api from "../../api";

function PaymentSection() {

    const cart_code = localStorage.getItem("cart_code");
    const [loading, setLoading] = useState(false)

    // function makePayment(){
    //     api.post('initiate_payment/', {cart_code})
    //     .then(response => {
    //         console.log(response)
    //     })
    //     .catch(error => {
    //         console.log(error.message)
    //     });
    // };

    function makePaypalPayment(){
        api.post('initiate_paypal_payment/', {cart_code})
        .then(response => {
            console.log(response)
            if(response.data.approval_url){
                window.location.href = response.data.approval_url
            }
        })
        .catch(error => {
            console.log(error.message)
        });
    };


    return (
        <div className="col-md-4">
            <div className="card">
                
                <div className="card-body">
                    <button className="btn btn-primary" onClick={makePaypalPayment}>PayPal</button>
                </div>
                <div className="card-body">
                    {/* <button className="btn btn-primary" onClick={makePayment}>Credit Card</button> */}
                </div>
            </div>
        </div>
    );
};
export default PaymentSection;