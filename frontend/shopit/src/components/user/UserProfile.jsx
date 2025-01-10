import OrderHistoryContainer from "./OrderHistoryContainer";
import UserInfo from "./UserInfo";
import React, { useEffect, useState } from "react";
import api from "../../api";

function UserProfile() {

    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        setLoading(true);
        api.get('user_info/')
        .then(response => {
            console.log(response.data);
            setUserInfo(response.data);
            setOrderItems(response.data.items);
            setLoading(false);
        }
        )
        .catch(error => {
            console.log(error);
            setLoading(false);
        }
        );
    }
    , []);


    return (
        <div className="container my-5">
            <UserInfo userInfo={userInfo} />
            <OrderHistoryContainer orderItems={orderItems} />
        </div>
    );
};

export default UserProfile;